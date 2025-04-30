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

            new_session = Session.objects.create(
                user=user,
                period=today,
                total_funds=prev_session.available_funds,  # Adjust as needed
                available_funds=prev_session.available_funds,
                total_expense=0,
                total_goals=0,
            )
            
            # Process every expense for the user
            for expense in user.expense.all():
                # For non‐recurring expenses, always create a new bucket
                # if not expense.recurring:
                    Bucket.objects.create(
                        user=user,
                        expense=expense,
                        session=new_session,
                        next_payment=expense.next_payment,
                        spending_limit=expense.spending_limit,
                        current_amount=0
                    )
                # else:
                #     # For recurring expenses, get the latest bucket for that expense
                #     latest_bucket = Bucket.objects.filter(user=user, expense=expense).order_by('-id').first()
                #     if latest_bucket:
                #         if not latest_bucket.fulfilled:
                #             if latest_bucket.current_amount != 0:
                #                 # Create a new bucket and copy the current_amount from latest_bucket
                #                 Bucket.objects.create(
                #                     user=user,
                #                     expense=expense,
                #                     session=new_session,
                #                     next_payment=expense.next_payment,
                #                     spending_limit=expense.spending_limit,
                #                     current_amount=latest_bucket.current_amount
                #                 )
                #             else:
                #                 # Latest bucket is not fulfilled, current_amount is zero; update its session to new_session
                #                 latest_bucket.session = new_session
                #                 latest_bucket.save()