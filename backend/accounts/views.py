# views.py
from rest_framework import viewsets, permissions
from .permissions import IsOwner
from .models import Transaction
from .serializers import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = Transaction.objects.filter(user=self.request.user)
        bucket = self.request.query_params.get('bucket', None)

        if bucket is not None:
            queryset = queryset.filter(bucket=bucket)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)