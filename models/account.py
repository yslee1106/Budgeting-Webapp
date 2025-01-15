import sys
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base

sys.path.append('../AI Ledger')
from utils.database import AccountType

class Account(Base):
    __tablename__ = 'Account'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    type: Mapped[AccountType]
    balance: Mapped[float]

    def __repr__(self) -> str:
        return f"<Account(id={self.id}, name={self.name}, type={self.type}, balance={self.balance})> \n"
    
    def __str__(self):
        return self.name
