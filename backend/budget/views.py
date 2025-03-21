# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Session, Income, Expense, Bucket, Goals
from .serializers import SessionSerializer, IncomeSerializer, ExpenseSerializer, BucketSerializer, GoalsSerializer

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all().order_by('-period').values()
    serializer_class = SessionSerializer

class IncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class BucketViewSet(viewsets.ModelViewSet):
    serializer_class = BucketSerializer

    def get_queryset(self):
        queryset = Bucket.objects.all()
        session = self.request.query_params.get('session', None)

        if session is not None:
            queryset = queryset.filter(session=session)
        
        return queryset

class GoalsViewSet(viewsets.ModelViewSet):
    queryset = Goals.objects.all()
    serializer_class = GoalsSerializer