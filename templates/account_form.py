import sys
import tkinter as tk
from tkinter import ttk

sys.path.append('../AI Ledger')
from utils.database import AccountType

class AccountForm:
    def __init__(self, controller):
            self.controller = controller
            self.root = controller.root
            self.create_form()

    def create_form(self):
        # Form Title
        title_label = tk.Label(self.root, text="Open New Account", font=("Arial", 16, "bold"))
        title_label.grid(row=0, column=0, columnspan=2, pady=10)

        # Name Field
        name_label = tk.Label(self.root, text="Account Name:", font=("Arial", 12))
        name_label.grid(row=1, column=0, padx=10, pady=5, sticky=tk.W)
        self.name_entry = tk.Entry(self.root, font=("Arial", 12))
        self.name_entry.grid(row=1, column=1, padx=10, pady=5, sticky=tk.W)

        # Type Field
        type_label = tk.Label(self.root, text="Type :", font=("Arial", 12))
        type_label.grid(row=2, column=0, padx=10, pady=5, sticky=tk.W)
        types=[]
        for type in AccountType:
            types.append(type.name)
        self.type_combobox = ttk.Combobox(self.root, font=("Arial", 12), values=types)
        self.type_combobox.grid(row=2, column=1, padx=10, pady=5, sticky=tk.W)

        # Initial Balance Field
        balance_label = tk.Label(self.root, text="Initial Deposit:", font=("Arial", 12))
        balance_label.grid(row=3, column=0, padx=10, pady=5, sticky=tk.W)
        self.balance_entry = tk.Entry(self.root, font=("Arial", 12))
        self.balance_entry.grid(row=3, column=1, padx=10, pady=5, sticky=tk.W)

        # Submit Button
        submit_button = tk.Button(self.root, text="Submit", font=("Arial", 12),
                                   command=self.on_submit)
        submit_button.grid(row=4, column=0, columnspan=2, pady=20)

    def on_submit(self):
        try:
            name = self.name_entry.get().strip()
            type = AccountType[self.type_combobox.get().strip()]
            balance = float(self.balance_entry.get().strip())
            self.controller.submit_new_account([name, type, balance])
        except:
            print("Submission Failed")

    def clear_form(self):
        self.name_entry.delete(0, tk.END)
        self.type_combobox.delete(0, tk.END)
        self.balance_entry.delete(0, tk.END)