from celery import shared_task
from datetime import date, timedelta
from .models import User, Session, Income, Expense, Bucket

@shared_task(name='create_new_session')
def create_new_session():
    today = date.today()
    if today.day == 1:
        for user in User.objects.all():
            prev_session = Session.objects.filter(user=user).last()
            if prev_session.period == today:
                continue
            else:
                new_session = Session.objects.create(
                    user=user,
                    period=today,
                    total_funds=prev_session.available_funds,  # Adjust as needed
                    available_funds=prev_session.available_funds,
                    total_expense=0,
                    total_goals=0,
                )
            
            # Create buckets for each expense related to the user
            for expense in user.expense.all():
                Bucket.objects.create(
                    user=user,
                    expense=expense,
                    session=new_session,
                    next_payment=expense.next_payment,
                    spending_limit=expense.spending_limit,
                    current_amount=0
                )

