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
    """Search for transactions based on the account, transaction date, description, type and amount"""

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
    """Create a new account"""
    
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
    """Create a new double entry transaction and update the respective account balances."""
    
    try:
        insert_transaction(account_id, contra_account_id, transaction_date, description, contra_description, type, contra_type, amount)
        return "Transaction created successfully."
    except:
        return "Transaction creation failed"