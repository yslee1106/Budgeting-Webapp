from django.core.exceptions import ValidationError
from decimal import Decimal
from datetime import datetime

from .models import Transaction, DebitTransaction, CreditTransaction
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
        session = Session.objects.filter(user=user).latest('period')
        
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
            bucket.current_amount -= transaction.amount
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

        if instance.type == Transaction.TransactionType.DEBIT:
            # Reverse debit logic
            session.total_funds -= instance.amount
            session.available_funds -= instance.amount
            session.save()

            future_sessions = Session.objects.filter(user=instance.user, period__gt=period_date)
            for sess in future_sessions:
                sess.total_funds -= instance.amount
                sess.available_funds -= instance.amount
                sess.save()

        else:
            # Reverse credit logic            
            bucket = instance.bucket
            bucket.current_amount += instance.amount

            session.total_expense += instance.amount
            session.available_funds -= instance.amount
            session.save()
            
            future_sessions = Session.objects.filter(user=instance.user, period__gt=period_date)
            for sess in future_sessions:
                sess.total_funds -= instance.amount
                sess.available_funds -= instance.amount
                sess.save()
            
            bucket.save()
        
        instance.delete()
