from rest_framework.exceptions import ValidationError
from decimal import Decimal
from datetime import datetime

from .models import Transaction, DebitTransaction, CreditTransaction
from budget.services import BucketService
from budget.models import Bucket, Session

class TransactionService:
    @staticmethod
    def validate_amount(value):
        if value < 0:
            raise ValidationError('Amount cannot be negative.')
        return value
    
    @staticmethod
    def create_transaction(validated_data):
        user = validated_data['user']
        transaction_type = validated_data.get('type')
        bucket = Bucket.objects.get(id = validated_data.get('bucket').id)
        session = Session.objects.filter(user=user).latest('period')
        
        if bucket.expense.deleted_at:
            raise ValidationError('Expense has already been deleted')


        # Create the correct transaction type
        if transaction_type == Transaction.TransactionType.DEBIT:
            validated_data['amount'] = abs(validated_data['amount'])
            transaction = DebitTransaction.objects.create(**validated_data)

            session.total_funds += transaction.amount
            session.available_funds += transaction.amount
        else:
            validated_data['amount'] = -abs(validated_data['amount'])
            transaction = CreditTransaction.objects.create(**validated_data)

            # Handle credit logic (original bucket/session updates)
            bucket = transaction.bucket
            expense = bucket.expense
            bucket.current_amount -= transaction.amount

            if bucket.current_amount >= bucket.spending_limit:
                bucket.fulfilled = True

            if bucket.next_payment and bucket.current_amount >= bucket.spending_limit and Bucket.objects.filter(expense=expense).latest('next_payment') == bucket:
                expense.next_payment = expense.calculate_next_payment(revert=False)
                expense.save()
                BucketService.create_bucket(expense)

            bucket.save()
            
        
            session.total_expense -= transaction.amount
            session.available_funds += transaction.amount

        session.save()

        return transaction

    @staticmethod
    def delete_transaction(instance):
        period_str = instance.date.strftime('%Y-%m-01')
        period_date = datetime.strptime(period_str, "%Y-%m-%d").date()
        session = Session.objects.get(user=instance.user, period=period_date)
        currentSession = Session.objects.filter(user=instance.user).latest('period')
        
        if session != currentSession or instance.bucket.expense.deleted_at:
            raise ValidationError('Unable to delete transactions from previous sessions')

        if instance.type == Transaction.TransactionType.DEBIT:
            # Reverse debit logic
            session.total_funds -= instance.amount
            session.available_funds -= instance.amount
            session.save()

        else:
            # Reverse credit logic            
            bucket = instance.bucket
            bucket.current_amount += instance.amount

            session.total_expense += instance.amount
            session.available_funds -= instance.amount
            
            session.save()
            bucket.save()
        
        instance.delete()
