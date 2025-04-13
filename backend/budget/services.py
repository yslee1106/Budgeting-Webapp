from django.core.exceptions import ValidationError

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
            next_due=newExpense.next_payment,
            target_amount=newExpense.target_amount,
        )
        return newExpense