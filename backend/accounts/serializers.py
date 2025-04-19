from rest_framework import serializers
from .models import Transaction
from .services import TransactionService


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['id', 'user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return TransactionService.create_transaction(validated_data)
