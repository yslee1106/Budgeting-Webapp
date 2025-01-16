import sys
from tkinter import messagebox

sys.path.append('../AI Ledger')
from services.ledger_service import LedgerService
from templates.start_page import StartPage
from templates.account_form import AccountForm
from templates.transaction_form import TransactionForm

class MainController:
    def __init__(self, root, session):
        self.root = root
        self.session = session
        self.view = StartPage(self)
        self.ledger_service = LedgerService(self.session)

    def open_new_account(self):
        for widget in self.root.winfo_children():
            widget.destroy()
        self.view = AccountForm(self)

    def submit_new_account(self, data: list):
        print(self.ledger_service.create_account(data))
        self.open_start_page()

    def open_new_transaction(self):
        for widget in self.root.winfo_children():
            widget.destroy()
        accounts = self.ledger_service.get_all_accounts()
        self.view = TransactionForm(self, accounts)

    def submit_new_transaction(self, data1: list, data2: list):
        print(self.ledger_service.create_transaction(data1, data2))
        self.open_start_page()

    def open_view_transaction(self):
        for widget in self.root.winfo_children():
            widget.destroy()
        transactions = self.ledger_service.get_all_transactions()
        accounts = self.ledger_service.get_all_accounts()
        self.view = TransactionForm(self, accounts, transactions)

    def submit_update_transaction(self, data1: list, data2: list):
        pass

    def view_account_balances(self):
        for widget in self.root.winfo_children():
            widget.destroy()
        accounts = self.ledger_service.get_all_accounts()
        self.view = AccountForm(self, accounts)

    def open_start_page(self):
        for widget in self.root.winfo_children():
            widget.destroy()
        self.view = StartPage(self)

