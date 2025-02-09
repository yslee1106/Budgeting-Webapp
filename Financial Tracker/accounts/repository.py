from .models import Account, Transaction

def insert_account(details: dict):
    Account.objects.create(
        name = details['name'], 
        type = details['type'], 
        balance = details['balance']
    )

def insert_transaction(details: dict):
    Transaction.objects.create(
        account = details['selected_account'],
        transaction_date = details['transaction_date'],
        description = details['description'],
        type = details['type'],
        amount = details['amount']
    )