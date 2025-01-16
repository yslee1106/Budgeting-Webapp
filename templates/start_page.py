import tkinter as tk

class StartPage:
    def __init__(self, controller):
        self.controller = controller
        self.root = controller.root
        self.root.geometry('1020x520')
        self.root.title("Financial Tracker")
        self.create_widgets()

    def create_widgets(self):
        header_label = tk.Label(self.root, text="Welcome to Financial Tracker", font=("Arial", 16, "bold"))
        header_label.pack(pady=20)

        new_account_button = tk.Button(self.root, text="Open New Account", font=("Arial", 12),
                                        command=self.controller.open_new_account)
        new_account_button.pack(pady=10, fill=tk.X, padx=50)

        new_transaction_button = tk.Button(self.root, text="Open New Transaction", font=("Arial", 12),
                                            command=self.controller.open_new_transaction)
        new_transaction_button.pack(pady=10, fill=tk.X, padx=50)

        view_transactions_button = tk.Button(self.root, text="View Transactions", font=("Arial", 12),
                                               command=self.controller.open_view_transaction)
        view_transactions_button.pack(pady=10, fill=tk.X, padx=50)

        view_balances_button = tk.Button(self.root, text="View Account Balances", font=("Arial", 12),
                                          command=self.controller.view_account_balances)
        view_balances_button.pack(pady=10, fill=tk.X, padx=50)
