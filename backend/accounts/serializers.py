from rest_framework import serializers
from .models import DebitTransaction, CreditTransaction, Transaction
from .services import TransactionService

class TransactionSerializer(serializers.Serializer):
    """
    A dynamic serializer which routes each transaction instance to the
    correct serializer based on its type.
    """
    def to_representation(self, instance):
        from .models import Transaction  # Local import to avoid circular dependency
        if instance.type == Transaction.TransactionType.DEBIT:
            return DebitTransactionSerializer(instance, context=self.context).to_representation(instance)
        elif instance.type == Transaction.TransactionType.CREDIT:
            return CreditTransactionSerializer(instance, context=self.context).to_representation(instance)
        return super().to_representation(instance)

class BaseTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        read_only_fields = ['id', 'user', 'type']

    def validate(self, data):
        # Merge validated data with request data to capture the type
        request_data = self.context['request'].data
        ttype = data.get('type') or request_data.get('type')
        if ttype == Transaction.TransactionType.DEBIT:
            if not data.get('income'):
                raise serializers.ValidationError("Debit transactions require an income.")
            if data.get('bucket'):
                raise serializers.ValidationError("Debit transactions cannot have a bucket.")
        elif ttype == Transaction.TransactionType.CREDIT:
            if not data.get('bucket'):
                raise serializers.ValidationError("Credit transactions require a bucket.")
            if data.get('income'):
                raise serializers.ValidationError("Credit transactions cannot have an income.")
        return data
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        # Force the transaction type based on the serializer in use.
        if self.__class__.__name__ == 'DebitTransactionSerializer':
            validated_data['type'] = Transaction.TransactionType.DEBIT
        elif self.__class__.__name__ == 'CreditTransactionSerializer':
            validated_data['type'] = Transaction.TransactionType.CREDIT
        return TransactionService.create_transaction(validated_data)
    
class DebitTransactionSerializer(BaseTransactionSerializer):
    class Meta(BaseTransactionSerializer.Meta):
        model = DebitTransaction
        # Only include fields you want; exclude the bucket field since debits don't use it.
        fields = ['id', 'user', 'title', 'type', 'location', 'date', 'description', 'amount', 'income']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Remove the 'income' key if it exists
        representation.pop('bucket', None)
        return representation
    
class CreditTransactionSerializer(BaseTransactionSerializer):
    class Meta(BaseTransactionSerializer.Meta):
        model = CreditTransaction
        # Only include fields you want; exclude the income field since credits don't use it.
        fields = ['id', 'user', 'title', 'type', 'location', 'date', 'description', 'amount', 'bucket']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Remove the 'income' key if it exists
        representation.pop('income', None)
        return representation