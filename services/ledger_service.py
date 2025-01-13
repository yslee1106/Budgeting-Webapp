import sys
from datetime import date

sys.path.append('../AI Ledger')
from utils.database import TransactionType, AccountType
from models.transaction import Transaction
from repository.account_repository import AccountRepository
from repository.transaction_repository import TransactionRepository

class LedgerService:
    def __init__(self, session):
        self.account_repository = AccountRepository(session)
        self.transaction_repository = TransactionRepository(session)

    """
    Create a new Account

    Args:
        data (list): List of the data of new Transaction [Name, Type, Balance]
    
    Returns:
        ReturnType: Function status (success / error) in string
    """
    def create_account(self, data: list):
        error = verify_account_data(data)

        if(not error):
            data[2] = round(data[2], 2)
            return self.account_repository.insert_account(data)
        
        return error

    """
    Update an Account

    Args:
        data (list): List of the data of new Transaction [Name, Type]
    
    Returns:
        ReturnType: Function status (success / error) in string
    """
    def update_account(self, account_id: int, data: list):
        account = self.account_repository.query_by_id(account_id)
        error = verify_account_data(data)

        if(not account):
            return "Account not found"

        if(not error):
            account.name = data[0]
            account.type = data[1]

            self.account_repository.commit()
            return account

        return error

    """
    Creates 2 new linked Transactions between 2 accounts

    Args:
        data1 (list): List of the data of first transaction [AccountID, Date, Description, Type, Ammount]
        data2 (list): List of the data of second transaction [AccountID, Date, Description, Type, Ammount]
    
    Returns:
        ReturnType: Function status (success / error) in string
    """
    def create_transaction(self, data1: list, data2: list):
        #TODO Account for Overdraft

        error1 = verify_transaction_data(data1)
        error2 = verify_transaction_data(data2)

        if(not error1 and not error2):
            if(data1[4] != data2[4]):
                return "Invalid Ammount entered"
            if(data1[3] == data2[3]):
                return "Invalid Type entered"
            
            data1[4] = round(data1[4], 2)
            data2[4] = round(data2[4], 2)

            transaction1 = Transaction(
                account_id = data1[0],
                contra_transaction_id = None,
                transaction_date = data1[1],
                description = data1[2],
                type = data1[3],
                amount = data1[4]
                )
            
            transaction2 = Transaction(
            account_id = data2[0],
            contra_transaction_id = None,
            transaction_date = data2[1],
            description = data2[2],
            type = data2[3],
            amount = data2[4]
            )

            transaction1 = self.transaction_repository.insert_transaction(transaction1)
            transaction2 = self.transaction_repository.insert_transaction(transaction2)
            transaction1.contra_transaction_id = transaction2.transaction_id
            self.transaction_repository.commit()

            account1 = self.account_repository.query_by_id(data1[0])
            account2 = self.account_repository.query_by_id(data2[0])
            account1.balance = transaction1.type.operation(account1.balance, data1[4])
            account2.balance = transaction2.type.operation(account2.balance, data2[4])
            self.account_repository.commit()

            return transaction1, transaction2

        return error1, error2
            

    """
    Update a Transaction

    Args:
        transaction_id (int): ID of transaction to be updated
        data (list): List of the data of new Transaction [AccountID, Date, Description, Type, Ammount]
    
    Returns:
        ReturnType: Function status (success / error) in string
    """
    def update_transaction(self, transaction_id: int, data1: list, data2: list):
        transaction = self.transaction_repository.query_by_id(transaction_id)
        linked_transaction = transaction.contra_transaction
        error1 = verify_transaction_data(data1)
        error2 = verify_transaction_data(data2)

        if(not transaction):
            return "Transaction not found"

        if(not error1 and not error2):
            if(data1[4] != data2[4]):
                return "Invalid Amount entered"
            if(data1[3] == data2[3]):
                return "Invalid Type entered"

            account1 = self.account_repository.query_by_id(data1[0])
            account2 = self.account_repository.query_by_id(data2[0])
            account1.balance = linked_transaction.type.operation(account1.balance, abs(data1[4] - transaction.amount))
            account2.balance = transaction.type.operation(account2.balance, abs(data2[4] - transaction.amount))
            self.account_repository.commit()

            transaction.account_id = data1[0]
            transaction.transaction_date = data1[1]
            transaction.description = data1[2]
            transaction.type = data1[3]
            transaction.amount = data1[4]

            linked_transaction.account_id = data2[0]
            linked_transaction.transaction_date = data2[1]
            linked_transaction.description = data2[2]
            linked_transaction.type = data2[3]
            linked_transaction.amount = data2[4]

            self.transaction_repository.commit()

        return transaction

        


#Helper Functions

def verify_account_data(data):
    if(not isinstance(data[0], str) and AccountRepository.query_by_name(data[0])):
        return "Invalid Name entered"
    elif(not isinstance(data[1], AccountType)):
        return "Invalid Account Type entered"
    elif(not isinstance(data[2], float) and data[2]> 0):
        return "Invalid Balance entered"

def verify_transaction_data(data):
    if(not isinstance(data[0], int) and not AccountRepository.query_by_id(data[0])):
        return "Invalid Account ID entered"
    elif(not isinstance(data[1], date) and data[1] > date.today()):
        return "Invalid Date entered"
    elif(not isinstance(data[2], str)):
        return "Invalid Description entered"
    elif(not isinstance(data[3], TransactionType)):
        return "Invalid Transaction Type entered"
    elif(not isinstance(data[4], float) and data[4] < 0):
        return "Invalid Amount entered"

    return None