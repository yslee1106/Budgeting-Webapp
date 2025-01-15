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

    def show_new_account_view(self):
        for widget in self.root.winfo_children():
            widget.destroy()
        self.view = AccountForm(self)

    def submit_new_account(self, data: list):
        print(self.ledger_service.create_account(data))
        print(self.ledger_service.get_all_accounts())
        for widget in self.root.winfo_children():
            widget.destroy()
        self.view = StartPage(self)

    def open_new_transaction(self):
        for widget in self.root.winfo_children():
            widget.destroy()
        accounts = self.ledger_service.get_all_accounts()
        self.view = TransactionForm(self, accounts)

    def submit_new_transaction(self, data1: list, data2: list):
        print(self.ledger_service.create_transaction(data1, data2))
        print(self.ledger_service.get_all_transactions())
        for widget in self.root.winfo_children():
            widget.destroy()
        self.view = StartPage(self)

    def update_transaction(self):
        messagebox.showinfo("Update Transaction", "Update a transaction functionality goes here.")

    def view_account_balances(self):
        messagebox.showinfo("Account Balances", "View account balances functionality goes here.")
