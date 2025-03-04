from django.core.exceptions import ValidationError, ObjectDoesNotExist
from decimal import Decimal
from datetime import timedelta

from .models import Income, Expense

def get_income(**kwargs):
    filters = {key: value for key, value in kwargs.items() if value is not None}
    incomes = Income.objects.filter(**filters)
    return incomes


def insert_income(
        name: str,
        category: str,
        pay_frequency: int,  # Number of days for frequency (e.g., 7 for weekly)
        next_payday: str,     # Date in 'YYYY-MM-DD' format
        amount: Decimal
):
    try:
        income = Income.objects.create(
            name=name,
            category=category,
            pay_frequency=timedelta(days=pay_frequency),  # Convert days to timedelta
            next_payday=next_payday,
            amount=amount
        )
        income.save()
        print(f"Income '{name}' inserted successfully!")
    except ValidationError as e:
        print(f'Validation error while inserting income: {e}')
        raise
    except Exception as e:
        print(f'Failed to insert income: {e}')
        raise


def update_income(
        income_id: int,
        name: str = None,
        category: str = None,
        pay_frequency: int = None,  # Number of days for frequency (e.g., 7 for weekly)
        next_payday: str = None,   # Date in 'YYYY-MM-DD' format
        amount: Decimal = None
):
    try:
        # Fetch the Income object by ID
        income = Income.objects.get(id=income_id)

        # Update fields if provided
        if name is not None:
            income.name = name
        if category is not None:
            income.category = category
        if pay_frequency is not None:
            income.pay_frequency = timedelta(days=pay_frequency)  # Convert days to timedelta
        if next_payday is not None:
            income.next_payday = next_payday
        if amount is not None:
            income.amount = amount

        # Save the updated object
        income.save()
        print(f"Income with ID {income_id} updated successfully!")
    except ObjectDoesNotExist:
        print(f"Income with ID {income_id} does not exist.")
        raise
    except ValidationError as e:
        print(f'Validation error while updating income: {e}')
        raise
    except Exception as e:
        print(f'Failed to update income: {e}')
        raise


def delete_income(income_id: int):
    try:
        # Fetch the Income object by ID
        income = Income.objects.get(id=income_id)

        # Delete the object
        income.delete()
        print(f"Income with ID {income_id} deleted successfully!")
    except ObjectDoesNotExist:
        print(f"Income with ID {income_id} does not exist.")
        raise
    except Exception as e:
        print(f'Failed to delete income: {e}')
        raise


def get_expenses(**kwargs):
    filters = {key: value for key, value in kwargs.items() if value is not None}
    expenses = Expense.objects.filter(**filters)
    return expenses


def insert_expense(
        name: str,
        category: str,
        percentage_of_income: int,  # Optional, can be None
        due_frequency: int,         # Number of days for frequency (e.g., 30 for monthly)
        next_due: str,              # Date in 'YYYY-MM-DD' format
        target_amount: Decimal,
        current_amount: Decimal,
        fulfilled: bool
):
    try:
        expense = Expense.objects.create(
            name=name,
            category=category,
            percentage_of_income=percentage_of_income,
            due_frequency=timedelta(days=due_frequency),  # Convert days to timedelta
            next_due=next_due,
            target_amount=target_amount,
            current_amount=current_amount,
            fulfilled=fulfilled
        )
        expense.save()
        print(f"Expense '{name}' inserted successfully!")
    except ValidationError as e:
        print(f'Validation error while inserting expense: {e}')
        raise
    except Exception as e:
        print(f'Failed to insert expense: {e}')
        raise


def update_expense(
        expense_id: int,
        name: str = None,
        category: str = None,
        percentage_of_income: int = None,  # Optional, can be None
        due_frequency: int = None,        # Number of days for frequency (e.g., 30 for monthly)
        next_due: str = None,             # Date in 'YYYY-MM-DD' format
        target_amount: Decimal = None,
        current_amount: Decimal = None,
        fulfilled: bool = None
):
    try:
        # Fetch the Expense object by ID
        expense = Expense.objects.get(id=expense_id)

        # Update fields if provided
        if name is not None:
            expense.name = name
        if category is not None:
            expense.category = category
        if percentage_of_income is not None:
            expense.percentage_of_income = percentage_of_income
        if due_frequency is not None:
            expense.due_frequency = timedelta(days=due_frequency)  # Convert days to timedelta
        if next_due is not None:
            expense.next_due = next_due
        if target_amount is not None:
            expense.target_amount = target_amount
        if current_amount is not None:
            expense.current_amount = current_amount
        if fulfilled is not None:
            expense.fulfilled = fulfilled

        # Save the updated object
        expense.save()
        print(f"Expense with ID {expense_id} updated successfully!")
    except ObjectDoesNotExist:
        print(f"Expense with ID {expense_id} does not exist.")
        raise
    except ValidationError as e:
        print(f'Validation error while updating expense: {e}')
        raise
    except Exception as e:
        print(f'Failed to update expense: {e}')
        raise


def delete_expense(expense_id: int):
    try:
        # Fetch the Expense object by ID
        expense = Expense.objects.get(id=expense_id)

        # Delete the object
        expense.delete()
        print(f"Expense with ID {expense_id} deleted successfully!")
    except ObjectDoesNotExist:
        print(f"Expense with ID {expense_id} does not exist.")
        raise
    except Exception as e:
        print(f'Failed to delete expense: {e}')
        raise