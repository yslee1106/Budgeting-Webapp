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
    expense_name = serializers.SerializerMethodField()
    percentage = serializers.SerializerMethodField()

    class Meta:
        model = Bucket
        fields = ['id', 'expense', 'expense_name', 'session', 'next_due', 'target_amount', 'amount', 'percentage', 'fulfilled']
        read_only_fields = ['id']

    def get_percentage(self, obj):
        return round(obj.amount / obj.target_amount * 100)
    
    def get_expense_name(self, obj):
        return obj.expense.name

class GoalsSerializer(serializers.ModelSerializer):
    percentage = serializers.SerializerMethodField()

    class Meta:
        model = Goals
        fields = ['id', 'name', 'category', 'target_amount', 'current_amount', 'percentage', 'fulfilled']
        read_only_fields = ['id']

    def get_percentage(self, obj):
        return round(obj.current_amount / obj.target_amount * 100)

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'
        read_only_fields = ['id']