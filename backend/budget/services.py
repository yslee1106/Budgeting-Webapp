from django.core.exceptions import ValidationError
from decimal import Decimal

from .models import Session, Expense, Bucket

class ExpenseService:
    @staticmethod
    def create_expense(validated_data):
        user = validated_data['user']
        currentSession = Session.objects.filter(user=user).latest('period')
        newExpense = Expense.objects.create(**validated_data)

        # Create Bucket for new expense in current session
        Bucket.objects.create(
            user=user,
            expense=newExpense,
            session=currentSession,
            next_payment=newExpense.next_payment,
            spending_limit=newExpense.spending_limit,
        )
        return newExpense
    
class GoalService:
    @staticmethod
    def validate_current_amount(value, target_amount):
        if value < 0:
            raise ValidationError("Current amount cannot be negative.")
        if value > target_amount:
            raise ValidationError("Current amount cannot exceed target amount.")
        return value
    
    @staticmethod
    def validate_target_amount(value, current_amount):
        if value < 0:
            raise ValidationError("Target amount cannot be negative.")
        if value < current_amount:
            raise ValidationError("Target amount cannot be less than the current amount.")
        return value

    @staticmethod
    def patch_goal(instance, validated_data):
        # TODO validate target amount
        
        target_amount = validated_data.get('target_amount', instance.target_amount)
        
        if 'current_amount' in validated_data:
            user = instance.user
            current_session = Session.objects.filter(user=user).latest('period')
            current_amount = Decimal(validated_data['current_amount'])
            difference = current_amount - Decimal(instance.current_amount)

            GoalService.validate_current_amount(current_amount, target_amount)
            if difference > 0 and current_session.available_funds < difference: 
                raise ValidationError("Insufficient available funds in the current session.")

            instance.current_amount = current_amount
            instance.fulfilled = (current_amount >= target_amount)
            current_session.available_funds = current_session.available_funds - difference
            current_session.total_funds = current_session.total_funds - difference
            current_session.save()

        for attr, value in validated_data.items():
            if attr not in ['current_amount', 'fulfilled']:
                setattr(instance, attr, value)

        instance.save()
        return instance