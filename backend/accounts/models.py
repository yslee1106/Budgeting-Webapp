from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

from budget.models import Bucket, Income

User = get_user_model()

class Transaction(models.Model):
    class TransactionType(models.TextChoices):
         DEBIT = 'debit', 'Debit'
         CREDIT = 'credit', 'Credit'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transaction')
    title = models.CharField(max_length=50, null=False)
    type = models.CharField(max_length=10, choices=TransactionType.choices)
    location = models.CharField(max_length=100, blank=True)
    date = models.DateField(null=False, blank=False)
    description = models.CharField(max_length=100, blank=True)
    amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)

    # Make both fields nullable (debit uses income, credit uses bucket)
    income = models.ForeignKey(Income, on_delete=models.CASCADE, null=True, blank=True)
    bucket = models.ForeignKey(Bucket, on_delete=models.CASCADE, null=True, blank=True)

class DebitTransaction(Transaction):
    class Meta:
        proxy = True

    def clean(self):
        if not self.income:
            raise ValidationError("Debit transactions require an income.")
        if self.bucket:
            raise ValidationError("Debit transactions cannot have a bucket.")

    def save(self, *args, **kwargs):
        self.type = Transaction.TransactionType.DEBIT
        self.clean()
        super().save(*args, **kwargs)

    def __repr__(self):
        return (
            f"<Transaction(id={self.id}, "
            f"user={self.user}, "
            f'title={self.title}'
            f"amount={self.amount}, "
            f"date='{self.date}', "
            f"income='{self.income}', "
            f"description='{self.description}')>"
            )

    def __str__(self):
        return (
            f"Transaction #{self.id} {self.title}: "
            f"Debit {self.amount} on {self.date} "
            f"({self.description or 'No description'})"
        )

class CreditTransaction(Transaction):
    class Meta:
        proxy = True

    def clean(self):
        if not self.bucket:
            raise ValidationError("Credit transactions require a bucket.")
        if self.income:
            raise ValidationError("Credit transactions cannot have an income.")

    def save(self, *args, **kwargs):
        self.type = Transaction.TransactionType.CREDIT
        self.clean()
        super().save(*args, **kwargs)

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
            f"Credit {self.amount} on {self.date} "
            f"({self.description or 'No description'})"
        )