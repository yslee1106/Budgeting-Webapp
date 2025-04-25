from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound

from .permissions import IsOwner
from .models import CreditTransaction, DebitTransaction, Transaction
from .serializers import CreditTransactionSerializer, DebitTransactionSerializer, TransactionSerializer
from .services import TransactionService
from .pagination import TransactionPagination


class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    pagination_class = TransactionPagination

    # Default serializer if no type is given – returns all transactions.
    serializer_class = DebitTransactionSerializer

    def get_queryset(self):
        tfilter = self.request.query_params.get('type')
        if tfilter:
            t = tfilter.lower()
            if t == 'debit':
                qs = DebitTransaction.objects.filter(user=self.request.user, type=t)
            elif t == 'credit':
                qs = CreditTransaction.objects.filter(user=self.request.user, type=t)
            else:
                qs = Transaction.objects.none()
        else:
            qs = CreditTransaction.objects.filter(user=self.request.user).union(
                DebitTransaction.objects.filter(user=self.request.user)
            )
        return qs.order_by('-date')
    
    def get_serializer_class(self):
        # For write operations, determine serializer based on request data "type"
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            t = self.request.data.get('type')
            if t == Transaction.TransactionType.DEBIT:
                return DebitTransactionSerializer
            elif t == Transaction.TransactionType.CREDIT:
                return CreditTransactionSerializer
        # For read operations, if a query parameter "type" exists then use that serializer; otherwise, default.
        tfilter = self.request.query_params.get('type')
        if tfilter == Transaction.TransactionType.DEBIT:
            return DebitTransactionSerializer
        elif tfilter == Transaction.TransactionType.CREDIT:
            return CreditTransactionSerializer
        return TransactionSerializer

    def get_object(self):
        lookup_value = self.kwargs.get(self.lookup_field or 'pk')
        try:
            return Transaction.objects.get(user=self.request.user, pk=lookup_value)
        except Transaction.DoesNotExist:
            raise NotFound("Transaction not found.")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        TransactionService.delete_transaction(instance)
        return Response(status=204)

    # Optional extra actions – if you still want dedicated endpoints:

    @action(detail=False, methods=['get'], url_path='debit')
    def list_debits(self, request):
        qs = DebitTransaction.objects.filter(user=request.user).order_by('-date')
        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = DebitTransactionSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = DebitTransactionSerializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='credit')
    def list_credits(self, request):
        qs = CreditTransaction.objects.filter(user=request.user).order_by('-date')
        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = CreditTransactionSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = CreditTransactionSerializer(qs, many=True)
        return Response(serializer.data)