from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from enum import Enum

DATABASE_URL = "sqlite:///ledger.db"  # Change this URL to your database

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
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