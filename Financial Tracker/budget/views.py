from django.shortcuts import render
from django.db import IntegrityError
from .services import insert_transaction, insert_account, get_account, get_transactions

def get_menu(request):
    template = 'menu.html'
    return render(request, template)

def get_all_accounts(request):
    template = 'account_list.html'
    context = dict()
    context['accounts_list'] = get_account()
    return render(request, template, context)

def add_account(request):
    template = 'add_account.html'
    context = dict()
    message = ''
    message_color = 'ignore'

    if request.method == 'POST':
        try:
            name = request.POST['name']
            type = request.POST['type']
            balance = request.POST['balance']

            insert_account(name, type, balance)

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
    context['transactions_list'] = get_transactions()
    return render(request, template, context)

def add_transaction(request):
    template = 'add_transaction.html'
    context = dict()
    message = ''
    message_color = 'ignore'
    accounts = get_account()

    if request.method == 'POST':
        try:
            account = request.POST['account']
            contra_account = request.POST['contra_account']
            transaction_date = request.POST['transaction_date']
            description = request.POST['description']
            contra_description = request.POST['contra_description']
            type = request.POST['type']
            contra_type = request.POST['contra_type']
            amount = request.POST['amount']
            
            insert_transaction(account, contra_account, transaction_date, description, contra_description, type, contra_type, amount) 
            
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
    context['accounts'] = accounts
    return render(request, template, context)
