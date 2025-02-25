from .models import Account, Transaction
from decimal import Decimal
from datetime import date

def get_account(**kwargs):
    filters = {key: value for key, value in kwargs.items() if value is not None}
    accounts = Account.objects.filter(**filters)
    return accounts

def insert_account(
        name: str,
        type: str,
        balance: Decimal
):
    try:
        account = Account.objects.create(
            name = name, 
            type = type, 
            balance = balance
        )
        account.save()
    except Exception as e:
        print(f'Failed to insert account: {e}')
        raise

def update_account_balance(
        account: Account | int | str,
        amount: Decimal, 
        type: str
):
    try:
        if not isinstance(account, Account):
            account = Account.objects.get(id=account)

        if type.upper == 'CREDIT':
            account.balance -= Decimal(amount)
        else:
            account.balance += Decimal(amount)
        account.save

    except Account.DoesNotExist:
        print(f'Account does not exist')

def get_transactions(**kwargs):
    filters = {key: value for key, value in kwargs.items() if value is not None}
    transactions = Transaction.objects.filter(**filters)
    return transactions

def insert_transaction(
        account: Account | str | int,
        contra_account: Account | str | int,
        transaction_date: date,
        description: str,
        contra_description: str,
        type: str,
        contra_type: str,
        amount: Decimal
):
    try:

        if not isinstance(account, Account):
            account = Account.objects.get(id=account)
        if not isinstance(contra_account, Account):
            contra_account = Account.objects.get(id=contra_account)

        transaction = Transaction.objects.create(
            account = account,
            transaction_date = transaction_date,
            description = description,
            type = type,
            amount = amount
        )
        transaction.save()

        contra_transaction = Transaction.objects.create(
            account = contra_account,
            transaction_date = transaction_date,
            description = contra_description,
            type = contra_type,
            amount = amount
        )
        contra_transaction.save()

        update_account_balance(account, amount, type)
        update_account_balance(contra_account, amount, contra_type)

    except Exception as e:
        print(f'Failed to insert transaction: {e}')
        raise
