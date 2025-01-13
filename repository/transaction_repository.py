import sys
from datetime import date
from sqlalchemy import and_

sys.path.append('../AI Ledger')
from models.transaction import Transaction
from .base_repository import BaseRepository

class TransactionRepository(BaseRepository):
    def insert_transaction(self, transaction):
        self.session.add(transaction)
        self.session.commit()
        return transaction

    def query_by_id(self, transaction_id: int):
        return self.session.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()

    def query_by_account(self, account_id: int, start_period: date, end_period: date):
        return self.session.query(Transaction).filter(and_(Transaction.account_id == account_id, Transaction.transaction_date.between(start_period, end_period))).all()

    def query_all_transactions(self):
        return self.session.query(Transaction).all()

    def update_by_id(self, transaction_id, data):
        self.session.query(Transaction).filter(Transaction.transaction_id == transaction_id).update({
            'account_id': data[0],
            'contra_transaction_id': data[1],
            'transaction_date': data[2],
            'description': data[3],
            'type': data[4],
            'amount': data[5]})
        
        self.session.commit()

    def commit(self):
        self.session.commit()
