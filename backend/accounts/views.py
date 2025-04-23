from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .permissions import IsOwner
from .models import Transaction
from .serializers import TransactionSerializer
from .services import TransactionService
from .pagination import TransactionPagination


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    pagination_class = TransactionPagination

    def get_queryset(self):
        queryset = Transaction.objects.filter(user=self.request.user)
        bucket = self.request.query_params.get('bucket', None)

        if bucket is not None:
            queryset = queryset.filter(bucket=bucket)
        
        return queryset.order_by('-date')
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        TransactionService.delete_transaction(instance)
        return Response(status=204)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)