from langchain_core.tools import tool
from typing import Optional
from langchain_core.runnables import RunnableConfig
from datetime import date
from decimal import Decimal
from budget.services import insert_account, insert_transaction, get_account, get_transactions

@tool
def search_account(config: RunnableConfig) -> list[dict]:
    """Fetch all budget accounts for the user.

    Returns:
        A list of dictionaries where each dictionary contains the budget account details
    """

    results = list(get_account().values()) 
    for account in results: account["balance"] = str(account["balance"])
    return results


@tool
def search_transactions(
    account_id: Optional[int] = None,
    transaction_date: Optional[date] = None,
    description: Optional[str] = None,
    type: Optional[str] = None,
    amount: Optional[Decimal] = None,
) -> list[dict]:
    """
    Search for transactions based on the account, transaction date, description, type and amount
    
    Args:
        account_id (Optional[int]): The account ID of the transaction. Defaults to None.
        transaction_date (Optional[date]): The date of the transaction. Defaults to None.
        description (Optional[str]): The description of the transaction. Defaults to None.
        type (Optional[str]): The transaction type of the transaction. Can be either credit or debit. Defaults to None.
        amount (Optional[Decimal]): The amount of the transaction. Defaults to None.

    Returns:
        A list of dictionaries where each dictionary contains the budget transaction details
    """

    results = list(get_transactions(
        account_id=account_id, 
        transaction_date=transaction_date,
        description=description,
        type=type,
        amount=amount
    ).values())
    for transaction in results: transaction["amount"] = str(transaction["amount"])
    return results


@tool
def create_new_account(
    name: str,
    type: str,
    balance: Decimal
) -> list[dict]:
    """
    Creates a new account
    
    Args:
        name (str): The name of the account.
        type (str): The type of the account. Can only be Assets, Liability, Equity, Expense and Income.
        balance (Decimal): The balance of the account.

    Returns:
        str: A message indicating whether the account was successfully created    
    """
    
    try:
        insert_account(name, type, balance)
        return f"Account {name} created succesfully."
    except:
        return f"Account creation failed."
    

@tool
def create_new_transaction(
    account_id: int,
    contra_account_id: int,
    transaction_date: date,  # date object from datetime
    description: str,
    contra_description: str,
    type: str,
    contra_type: str,
    amount: float
) -> str:
    """
    Create a new double entry transaction and update the respective account balances.
    
    Args:
        account_id (int): The account ID of the transaction.
        contra_account_id (int): The account ID of the contra-transaction.
        transaction_date (date): The transaction date of the transaction and the contra transaction.
        description (str): The description of the transaction.
        contra_description (str): The description of the contra-transaction.
        type (str): The type of the transaction. Can be either debit or credit.
        contra_type (str): The type of the contra-transaction. Can be either debit or credit.
        amount (float): The amount of the transaction and contra-transaction.

    Returns:
        str: A message indicating whether the double entry transaction was successfully created
    """
    
    try:
        insert_transaction(account_id, contra_account_id, transaction_date, description, contra_description, type, contra_type, amount)
        return "Transaction created successfully."
    except:
        return "Transaction creation failed"