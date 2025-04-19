import decimal
from rest_framework import serializers
from .models import Session, Income, Expense, Bucket, Goals
from .services import ExpenseService, GoalService

# Main Data Serializers
class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'
        read_only_fields = ['id', 'user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'
        read_only_fields = ['id', 'user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return ExpenseService.create_expense(validated_data)

class BucketSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    percentage = serializers.SerializerMethodField()

    class Meta:
        model = Bucket
        fields = ['id', 'expense', 'name', 'session', 'next_payment', 'spending_limit', 'current_amount', 'percentage', 'fulfilled']
        read_only_fields = ['id', 'user', 'percentage', 'fulfilled']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return Bucket.objects.create(**validated_data)

    def get_percentage(self, obj):
        if obj.spending_limit == 0:
            return 0
        return round(decimal.Decimal(obj.current_amount) / decimal.Decimal(obj.spending_limit) * 100)
    
    def get_name(self, obj):
        return obj.expense.name

class GoalsSerializer(serializers.ModelSerializer):
    percentage = serializers.SerializerMethodField()

    class Meta:
        model = Goals
        fields = ['id', 'name', 'category', 'target_amount', 'current_amount', 'percentage', 'fulfilled', 'target_date']
        read_only_fields = ['id', 'user', 'percentage', 'fulfilled']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return Goals.objects.create(**validated_data)

    def update(self, instance, validated_data):
        return GoalService.patch_goal(instance, validated_data)

    def get_percentage(self, obj):
        if obj.target_amount == 0:  # Prevent division by zero
            return 0
        return round(decimal.Decimal(obj.current_amount) / decimal.Decimal(obj.target_amount) * 100)

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'
        read_only_fields = ['id', 'user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    

# CRUD Helper Data Serializers 
class ModelChoicesSerializer(serializers.Serializer):
    income_categories = serializers.DictField()
    income_frequency = serializers.DictField()
    expense_categories = serializers.DictField()
    goal_categories = serializers.DictField()