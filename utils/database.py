import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from enum import Enum

new_directory = "data"
new_filename = "ledger.db"
new_path = os.path.join(new_directory, new_filename)

os.makedirs(new_directory, exist_ok=True)

engine = create_engine(f"sqlite:///{new_path}", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

class TransactionType(Enum):
    DEBIT = 'Debit'
    CREDIT = 'Credit'

    def operation(self, a, b):
        if self == TransactionType.DEBIT:
            return a + b
        elif self == TransactionType.CREDIT:
            return a - b

class AccountType(Enum):
    ASSET = 'Asset'
    LIABILITY = 'Liability'
    EQUITY = 'Equity'
    REVENUE = 'Revenue'
    EXPENSE = 'Expense'