# serializers.py
from rest_framework import serializers
from .models import Session, Income, Expense, Bucket, Goals


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'
        read_only_fields = ['id']

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'
        read_only_fields = ['id']

class BucketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bucket
        fields = '__all__'
        read_only_fields = ['id']

class GoalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goals
        fields = '__all__'
        read_only_fields = ['id']

class SessionSerializer(serializers.ModelSerializer):
    buckets = BucketSerializer(many=True, read_only=True)

    class Meta:
        model = Session
        fields = ['period', 'total_funds', 'available_funds', 'total_expense', 'total_goals', 'carry_forward', 'buckets', ]
        read_only_fields = ['id', 'buckets']