from datetime import date
import tkinter as tk

from controller.main_controller import MainController
from utils.database import engine, SessionLocal
from models.base import Base
from services.ledger_service import LedgerService
from utils.database import TransactionType, AccountType
from repository.transaction_repository import TransactionRepository
from repository.account_repository import AccountRepository

def main():
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    ledger_service = LedgerService(session)
    transaction_repository = TransactionRepository(session)
    account_repository = AccountRepository(session)

    print("Adding Accounts")
    print(ledger_service.create_account(['Bank', AccountType.ASSET, 0.00]))
    print(ledger_service.create_account(['Cash', AccountType.ASSET, 0.00]))
    print(ledger_service.create_account(['Food', AccountType.EXPENSE, 0.00]))

    print("Query Accounts: ")
    print(account_repository.query_all_accounts())

    print("Adding Transactions")
    data1 = [1, date(2021, 3, 20), 'Food', TransactionType.CREDIT, 20.00]
    data2 = [3, date(2021, 3, 20), 'Bank', TransactionType.DEBIT, 20.00]
    print(ledger_service.create_transaction(data1, data2))
    # print(transaction_controller.insert_transaction(3, 1, datetime.date(2021, 3, 20), 'Bank', 'Debit', 20.00))
    # print(transaction_controller.insert_transaction(2, 3, datetime.date(2021, 3, 21), 'Food', 'Credit', 15.00))
    # print(transaction_controller.insert_transaction(3, 2, datetime.date(2021, 3, 21), 'Cash', 'Debit', 15.00))
    # print(transaction_controller.insert_transaction(2, 3, datetime.date(2021, 3, 23), 'Food', 'Credit', 12.00))
    # print(transaction_controller.insert_transaction(3, 2, datetime.date(2021, 3, 23), 'Cash', 'Debit', 12.00))

    print("Query Transactions: ")
    print(transaction_repository.query_all_transactions())

    print("Query Accounts: ")
    print(account_repository.query_all_accounts())

    print("Update Transactions: ")
    data1[4] = 15.00
    data2[4] = 15.00
    print(ledger_service.update_transaction(1, data1, data2))

    print("Query Transactions: ")
    print(transaction_repository.query_all_transactions())

    print("Query Accounts: ")
    print(account_repository.query_all_accounts())

    # print("Finding transaction with ID 2")
    # print(transaction_controller.query_transaction_id(2))

    # print("Finding transactions in account ID 2 from 23/3/2021 to 24/3/2021")
    # print(transaction_controller.query_account_transactions(2, datetime.date(2021, 3, 23), datetime.date(2021, 3, 24)))
    # print("Finding transactions in account ID 2 from 19/3/2021 to 24/3/2021")
    # print(transaction_controller.query_account_transactions(2, datetime.date(2021, 3, 19), datetime.date(2021, 3, 24)))

if __name__ == "__main__":
    root = tk.Tk()
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    app = MainController(root, session)
    root.mainloop()