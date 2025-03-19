from decimal import Decimal
from datetime import datetime

from .models import Income, Expense, Budget, Session, Goals

def update_available_funds(
        session: Session, 
        incomes: list[Income]
):
    total = session.available_funds 

    for income in incomes:
        if income.next_payday < datetime.today():
            total += income.amount

            next_payday = income.next_payday + income.pay_frequency
            income.update_income(income_id=income.id, next_payday=next_payday)
    
    session.update_session(session_id=session.id, available_funds=total)
    return total


