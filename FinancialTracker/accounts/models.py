from django.db import models

# Create your models here.
ACCOUNT_TYPE = [
    ('ASSET', 'Asset'),
    ('LIABILITY', 'Liability'),
    ('EQUITY', 'Equity'),
    ('INCOME', 'Income'),
    ('EXPENSE', 'Expense')
]
    
TRANSACTION_TYPE = [
    ('DEBIT', 'Debit'),
    ('CREDIT', 'Credit')
]

class Account(models.Model):
    class Meta:
        unique_together = (('name'),)

    name = models.CharField(max_length=60, null=False)
    type = models.CharField( max_length=10, choices=ACCOUNT_TYPE, null=False)
    balance = models.DecimalField(max_digits=20, decimal_places=2, null=False)

    def __repr__(self) -> str:
        return f"<Account(id={self.id}, name={self.name}, type={self.type}, balance={self.balance})> \n"
    
    def __str__(self):
        return f"{self.name} {self.type} {self.balance}"
    
class Transaction(models.Model):
    account = models.ForeignKey('Account', on_delete=models.CASCADE)
    transaction_date = models.DateField(null=False, blank=False)
    description = models.CharField(max_length=80, null=True, blank=True)
    type = models.CharField(max_length=6, choices=TRANSACTION_TYPE, null=False)
    amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)

    def __repr__(self) -> str:
        return f"<Transaction(transaction_id={self.id}, account_id={self.account.id}, date={self.transaction_date}, description={self.description}, type={self.type}, amount={self.amount})> \n"
    
    def __str__(self) -> str:
        return f"{self.transaction_date} {self.account} {self.description} {self.type} {self.amount}"
