from django.shortcuts import render
from django.db import IntegrityError
from .repository import insert_transaction, insert_account
from .models import Account, Transaction

def get_menu(request):
    template = 'menu.html'
    return render(request, template)

def get_all_accounts(request):
    template = 'account_list.html'
    context = dict()
    context['accounts_list'] = Account.objects.all()
    return render(request, template, context)

def add_account(request):
    template = 'add_account.html'
    context = dict()
    message = ''
    message_color = 'ignore'

    if request.method == 'POST':
        try:
            details = {
                'name': request.POST['name'],
                'type': request.POST['type'],
                'balance': request.POST['balance']
            }

            insert_account(details)

            message = 'Account has been added succesfully'
            message_color = 'green'

        except IntegrityError as ie:
            print(f'failed to add account {ie}')
            message = 'Failed to add account'
            message_color = 'red'
        except Exception as e:
            print(f'failed to add account {e}')
            message = 'Failed to add account'
            message_color = 'red'
    
    context['message'] = message
    context['message_color'] = message_color
    return render(request, template, context)

def get_all_transactions(request):
    template = 'transaction_list.html'
    context = dict()
    context['transactions_list'] = Transaction.objects.all()
    return render(request, template, context)

def add_transaction(request):
    template = 'add_transaction.html'
    context = dict()
    message = ''
    message_color = 'ignore'

    if request.method == 'POST':
        try:
            details = {
                'account': Account.objects.get(id=request.POST['account']),
                'transaction_date': request.POST['transaction_date'], 
                'description': request.POST['description'], 
                'type': request.POST['type'], 
                'amount': request.POST['amount']
            }

            contra_details = {
                'account': Account.objects.get(id=request.POST['contra_account']),
                'transaction_date': request.POST['transaction_date'], 
                'description': request.POST['contra_description'], 
                'type': request.POST['contra_type'], 
                'amount': request.POST['amount']
            }

            insert_transaction(details)
            update_account_balance(details['account'], details['amount'], details['type'])
            insert_transaction(contra_details)
            update_account_balance(contra_details['account'], contra_details['amount'], contra_details['type'])

            message = 'Transaction has been added succesfully'
            message_color = 'green'
            
        except IntegrityError as ie:
            print(f'failed to add transaction {ie}')
            message = 'Failed to add transaction'
            message_color = 'red'
        except Exception as e:
            print(f'failed to add transaction {e}')
            message = 'Failed to add transaction'
            message_color = 'red'
    
    context['message'] = message
    context['message_color'] = message_color
    return render(request, template, context)

def update_account_balance(account: Account, amount: float, type):
    try:
        if type == 'Credit':
            account.balance -= float(amount)
        else:
            account.balance += float(amount)
        account.save()
    except Account.DoesNotExist:
        print(f'No account with id {id} to update balance')