from django.core.exceptions import ValidationError
from decimal import Decimal

from .models import Transaction
from budget.models import Bucket, Expense, Session

class TransactionService:
    @staticmethod
    def validate_amount(value):
        if value < 0:
            raise ValidationError('Amount cannot be negative.')
        return value

    @staticmethod
    def create_transaction(validated_data):
        amount = Decimal(validated_data['amount'])
        TransactionService.validate_amount(amount)

        transaction = Transaction.objects.create(**validated_data)

        user = validated_data['user']
        bucket = Bucket.objects.get(id=transaction.bucket.id, user=user)
        session = Session.objects.filter(user=user).latest('period')
        new_current_amount = bucket.current_amount + transaction.amount

        # Update Bucket current_amount
        if new_current_amount >= bucket.spending_limit:
            bucket.fulfilled = True
        bucket.current_amount = new_current_amount

        # Update Session total_expense and available_funds
        session.total_expense += transaction.amount
        session.available_funds -= transaction.amount
        
        # TODO Update Bucket next_payment
        # if bucket.next_payment and bucket.fulfilled:
        #     bucket.next_payment += expense.payment_frequency
        #     bucket.current_amount = 0.00

        #     expense.next_payment += expense.payment_frequency
        
        bucket.save()
        session.save()
        return transaction
        