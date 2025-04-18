# views.py
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from .permissions import IsOwner
from .models import Session, Income, Expense, Bucket, Goals
from .serializers import SessionSerializer, IncomeSerializer, ExpenseSerializer, BucketSerializer, GoalsSerializer

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

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

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
        return Goals.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# CRUD Helper Data API Views
@method_decorator(cache_page(60*60*24), name='get')
class ChoiceCategoriesView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        data = {
            'income_categories': dict(Income.INCOME_CATEGORIES),
            'income_frequency': dict(Income.FREQUENCY),
            'expense_categories': dict(Expense.EXPENSE_CATEGORIES),
            'goal_categories': dict(Goals.GOAL_CATEGORIES)
        }
        return Response(data)
    
