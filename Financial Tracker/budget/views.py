from django.shortcuts import render
from django.db import IntegrityError
from django.db.models import Sum
from datetime import datetime

from .models import Income, Expense, Session, Bucket, Goals

def get_menu(request):
    template = 'budget.html'
    context = dict()
    
    # date_today = datetime.today()
    # sessions = Session.get_sessions()
    # current_session = sessions.filter(period = datetime(date_today.year, date_today.month, 1))

    # buckets = Bucket.get_buckets(session = current_session)

    # goals = Goals.get_goals()

    # budget = current_session.values('budget').first()
    # spent = buckets.aggregate(Sum('amount'))
    # available = budget - spent

    # context['sessions'] = sessions
    # context['buckets'] = buckets
    # context['goals'] = goals
    # context['budget'] = budget
    # context['spent'] = spent
    # context['available'] = available

    return render(request, template, context)


    # def add_income(request):
    #     template = 'add_income.html'
    #     context = dict()
    #     income_categories = Income.INCOME_CATEGORIES
    #     frequency = Income.FREQUENCY
    #     message = ''
    #     message_color = 'ignore'

    #     if request.method == 'POST':
    #         try:
    #             name = request.POST['name']
    #             category = request.POST['categroy']
    #             pay_frequency = request.POST['pay_frequency']
    #             next_payday = request.POST['next_payday']
    #             amount = request.POST['amount']

    #             insert_income(name, category, pay_frequency, next_payday, amount)

    #             message = 'Income added succesfully'
    #             message_color = 'green'

    #         except IntegrityError as ie:
    #             print(f'failed to add income {ie}')
    #             message = 'Failed to add income'
    #             message_color = 'red'
    #         except Exception as e:
    #             print(f'failed to add income {e}')
    #             message = 'Failed to add income'
    #             message_color = 'red'
        
    #     context['message'] = message
    #     context['message_color'] = message_color
    #     context['income_categories'] = income_categories
    #     context['frequency'] = frequency
    #     return render(request, template, context)


    # def add_expense(request):
    #     template = 'add_expense.html'
    #     context = dict()
    #     expense_categories = EXPENSE_CATEGORIES
    #     message = ''
    #     message_color = 'ignore'
        
    #     if request.method == 'POST':
    #         try:
    #             name = request.POST['name']
    #             category = request.POST['category']
    #             percentage_of_income = request.POST['percentage_of_income']
    #             due_frequency = request.POST['due_frequency']
    #             next_due = request.POST['next_due']
    #             target_amount = request.POST['target_amount']
    #             current_amount = request.POST['current_amount']
    #             fulfilled = request.POST['fulfilled']
                
    #             insert_expense(name, category, percentage_of_income, due_frequency, next_due, target_amount, current_amount, fulfilled)

    #             message = 'Expense added succesfully'
    #             message_color = 'green'
                
    #         except IntegrityError as ie:
    #             print(f'failed to add expense {ie}')
    #             message = 'Failed to add expense'
    #             message_color = 'red'
    #         except Exception as e:
    #             print(f'failed to add expense {e}')
    #             message = 'Failed to add expense'
    #             message_color = 'red'
        
    #     context['message'] = message
    #     context['message_color'] = message_color
    #     context['expense_categories'] = expense_categories
    #     return render(request, template, context)
