# views.py
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from datetime import date

from .permissions import IsOwner
from .models import Session, Income, Expense, Bucket, Goals
from .serializers import SessionSerializer, IncomeSerializer, ExpenseSerializer, BucketSerializer, GoalsSerializer
from .services import ExpenseService, GoalService, BucketService, SessionService

# Main Data API Views
class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all().order_by('-period').values()
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user)
        period = self.request.query_params.get('period', None)

        if period is not None:
            queryset = queryset.filter(period=period)
        else:
            latest = queryset.latest('period')
            queryset = queryset.filter(pk=latest.pk)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class IncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Income.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def inject(self, request, pk=None):
        try:
            income = self.get_object()
        except Income.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        if income.next_payday <= date.today():
            SessionService.inject_income(income)
            income.next_payday = income.calculate_next_payday()
            income.save()

            return Response({'status': 'injected'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'Payday has not passed'}, status=status.HTTP_400_BAD_REQUEST)


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user, deleted_at__isnull=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        ExpenseService.soft_delete_expense(instance)
        return Response(status=204)
    
    @action(detail=True, methods=['post'])
    def restore(self, request, pk=None):
        try:
            expense = Expense.objects.get(pk=pk, user=request.user)
        except:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        if expense.deleted_at is not None:
            expense.deleted_at = None
            expense.save()
            BucketService.create_bucket(expense)

            return Response({'status': 'restored'})
        else:
            return Response({'status': 'Expense is not deleted'}, status=400)

class BucketViewSet(viewsets.ModelViewSet):
    serializer_class = BucketSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = Bucket.objects.filter(user=self.request.user)
        period = self.request.query_params.get('period', None)

        if period is not None:
            queryset = queryset.filter(session__period=period)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GoalsViewSet(viewsets.ModelViewSet):
    queryset = Goals.objects.all()
    serializer_class = GoalsSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Goals.objects.filter(user=self.request.user, deleted_at__isnull=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        GoalService.soft_delete_goal(instance)
        return Response(status=204)
    
    @action(detail=True, methods=['post'])
    def restore(self, request, pk=None):
        try:
            # Bypass the default queryset to include soft-deleted goals
            goal = Goals.objects.get(pk=pk, user=request.user)
        except Goals.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        if goal.deleted_at is not None:  # Fix: Use "is not None" instead of "__isnull"
            goal.deleted_at = None
            goal.save()
            return Response({'status': 'restored'})
        else:
            return Response({'status': 'Goal is not deleted'}, status=400)


# CRUD Helper Data API Views
@method_decorator(cache_page(60*60*24), name='get')
class ChoiceCategoriesView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        data = {
            'income_categories': dict(Income.INCOME_CATEGORIES),
            'income_frequency': dict(Income.FREQUENCY_CHOICES),
            'expense_categories': dict(Expense.EXPENSE_CATEGORIES),
            'goal_categories': dict(Goals.GOAL_CATEGORIES)
        }
        return Response(data)
    
