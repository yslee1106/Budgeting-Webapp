import sys

sys.path.append('../AI Ledger')
from models.account import Account
from .base_repository import BaseRepository

class AccountRepository(BaseRepository):
    def insert_account(self, data):
        account = Account(
            name = data[0],
            type = data[1],
            balance = data[2]
        )
        self.session.add(account)
        self.session.commit()
        return f"'{data[0]}' acccount created successfully!"

    def query_by_id(self, id: int):
        return self.session.query(Account).filter(Account.id == id).first()

    def query_by_name(self, name: str):
        return self.session.query(Account).filter(Account.name == name).first()

    def query_all_accounts(self):
        return self.session.query(Account).all()
    
    def updata_by_id(self, id: int, data: list):
        self.session.query(Account).filter(Account.id == id).update({
            'name': data[0],
            'type': data[1],
            'balance': data[2]
        })

        self.session.commit()

    def commit(self):
        self.session.commit()
    
    