
import sys
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date
from .base import Base

sys.path.append('../AI Ledger')
from models.account import Account
from utils.database import TransactionType

class Transaction(Base):
    __tablename__ = 'Transaction'
    transaction_id: Mapped[int] = mapped_column(primary_key=True)
    account_id: Mapped[int] = mapped_column(ForeignKey("Account.id"))
    contra_transaction_id: Mapped[int | None] = mapped_column(ForeignKey("Transaction.transaction_id"))
    transaction_date: Mapped[date]
    description: Mapped[str]
    type: Mapped[TransactionType]
    amount: Mapped[float]

    account: Mapped["Account"] = relationship()
    contra_transaction: Mapped["Transaction"] = relationship("Transaction", remote_side="Transaction.transaction_id", back_populates="linked_transaction")
    linked_transaction: Mapped["Transaction"] = relationship("Transaction", remote_side="Transaction.contra_transaction_id", back_populates="contra_transaction")

    def __repr__(self) -> str:
        return f"<Transaction(transaction_id={self.transaction_id}, account_id={self.account_id}, contra_transaction_id={self.contra_transaction_id}, date={self.transaction_date}, description={self.description}, type={self.type}, amount={self.amount})> \n"
    
    def __str__(self) -> str:
        return f"{self.transaction_date} {self.account} {self.description} {self.type.value} {self.amount}"