from django.db import models
from django.contrib.auth import get_user_model

from budget.models import Bucket

User = get_user_model()

class Transaction(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transaction')
    # account_id = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='account')
    title = models.CharField(max_length=50, null=False)
    bucket = models.ForeignKey(Bucket, on_delete=models.CASCADE, related_name='transaction')
    location = models.CharField(max_length=100, blank=True)
    date = models.DateField(null=False, blank=False)
    description = models.CharField(max_length=100, blank=True)
    amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)


    def __repr__(self):
        return (
            f"<Transaction(id={self.id}, "
            f"user={self.user}, "
            f'title={self.title}'
            f"amount={self.amount}, "
            f"date='{self.date}', "
            f"bucket='{self.bucket}', "
            f"description='{self.description}')>"
        )

    def __str__(self):
        return (
            f"Transaction #{self.id} {self.title}: "
            f"{self.amount} on {self.date} "
            f"({self.description or 'No description'})"
        )
