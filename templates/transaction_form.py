import sys
import tkinter as tk
from tkinter import ttk
from tkcalendar import DateEntry

sys.path.append('../AI Ledger')
from utils.database import TransactionType

class TransactionForm:
    def __init__(self, controller, accounts):
            self.controller = controller
            self.root = controller.root
            self.accounts = accounts
            self.create_form()

    def create_form(self):
        # Form Title
        title_label = tk.Label(self.root, text="New Transaction", font=("Arial", 16, "bold"))
        title_label.grid(row=0, column=0, columnspan=2, pady=10)

        # Account Field
        self.value_to_account_map = {str(acc): acc for acc in self.accounts}
        debit_account_label = tk.Label(self.root, text="Account to Debit:", font=("Arial", 12))
        debit_account_label.grid(row=1, column=0, padx=10, pady=5, sticky=tk.W)
        self.debit_account_combobox = ttk.Combobox(self.root, font=("Arial", 12), values=list(self.value_to_account_map.keys()))
        self.debit_account_combobox.grid(row=1, column=1, padx=10, pady=5, sticky=tk.W)
        credit_account_label = tk.Label(self.root, text="Account to Credit:", font=("Arial", 12))
        credit_account_label.grid(row=1, column=2, padx=10, pady=5, sticky=tk.W)
        self.credit_account_combobox = ttk.Combobox(self.root, font=("Arial", 12), values=list(self.value_to_account_map.keys()))
        self.credit_account_combobox.grid(row=1, column=3, padx=10, pady=5, sticky=tk.W)

        # Date Field
        date_label = tk.Label(self.root, text="Date: ", font=("Arial", 12))
        date_label.grid(row=2, column=0, padx=10, pady=5, sticky=tk.W)
        self.date_calendar = DateEntry(self.root, date_pattern="dd-mm-yyyy", font=("Arial", 12))
        self.date_calendar.grid(row=2, column=1, padx=10, pady=5, sticky=tk.W)

        # Description Field
        debit_description_label = tk.Label(self.root, text="Debit Description: ", font=("Arial", 12))
        debit_description_label.grid(row=3, column=0, padx=10, pady=5, sticky=tk.W)
        self.debit_description_entry = tk.Entry(self.root, font=("Arial", 12))
        self.debit_description_entry.grid(row=3, column=1, padx=10, pady=5, sticky=tk.W)
        credit_description_label = tk.Label(self.root, text="Credit Description: ", font=("Arial", 12))
        credit_description_label.grid(row=3, column=2, padx=10, pady=5, sticky=tk.W)
        self.credit_description_entry = tk.Entry(self.root, font=("Arial", 12))
        self.credit_description_entry.grid(row=3, column=3, padx=10, pady=5, sticky=tk.W)

        # Amount Field
        amount_label = tk.Label(self.root, text="Amount : ", font=("Arial", 12))
        amount_label.grid(row=4, column=0, padx=10, pady=5, sticky=tk.W)
        self.amount_entry = tk.Entry(self.root, font=("Arial", 12))
        self.amount_entry.grid(row=4, column=1, padx=10, pady=5, sticky=tk.W)

        # Submit Button
        submit_button = tk.Button(self.root, text="Submit", font=("Arial", 12),
                                   command=self.on_submit)
        submit_button.grid(row=5, column=0, columnspan=2, pady=20)

    def on_submit(self):
        try:
            debit_account = self.value_to_account_map.get(self.debit_account_combobox.get())
            credit_account = self.value_to_account_map.get(self.credit_account_combobox.get())
            date = self.date_calendar.get_date()
            debit_description = self.debit_description_entry.get().strip()
            credit_description = self.credit_description_entry.get().strip()
            amount = float(self.amount_entry.get().strip())
            self.controller.submit_new_transaction([debit_account, date, debit_description, TransactionType.DEBIT, amount],
                                                [credit_account, date, credit_description, TransactionType.CREDIT, amount])
        except:
             print("Submission Failed")

    def clear_form(self):
        self.debit_account_combobox.delete(0, tk.END)
        self.credit_account_combobox.delete(0, tk.END)
        self.date_calendar.delete(0, tk.END)
        self.debit_description_entry.delete(0, tk.END)
        self.credit_description_entry.delete(0, tk.END)
        self.amount_entry.delete(0, tk.END)
        