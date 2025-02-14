from .models import Account, Transaction

def insert_account(details: dict):
    try:
        account = Account.objects.create(
            name = details['name'], 
            type = details['type'], 
            balance = details['balance']
        )
        account.save()
    except Exception as e:
        print(f'Failed to insert account: {e}')
        raise

def insert_transaction(details: dict):
    try:
        transaction = Transaction.objects.create(
            account = details['account'],
            transaction_date = details['transaction_date'],
            description = details['description'],
            type = details['type'],
            amount = details['amount']
        )
        transaction.save()
    except Exception as e:
        print(f'Failed to insert transaction: {e}')
        raise