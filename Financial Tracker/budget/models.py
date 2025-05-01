from django.db import models
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from decimal import Decimal
from datetime import timedelta

# Create your models here.

class Session(models.Model):
    class Meta:
        unique_together = (('period'),)
    
    period = models.DateField(null=False, blank=False)
    budget = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    available_funds = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    total_expense = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    total_goals = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    carry_forward = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    
    @staticmethod
    def get_sessions(**kwargs):
        filters = {key: value for key, value in kwargs.items() if value is not None}
        periods = Session.objects.filter(**filters)
        return periods

    @staticmethod
    def insert_session(
            period: str,  # Date in 'YYYY-MM-DD' format
            available_funds: Decimal,
            total_expense: Decimal,
            total_goals: Decimal,
            carry_forward: Decimal
    ):
        try:
            session_obj = Session.objects.create(
                period=period,
                available_funds=available_funds,
                total_expense=total_expense,
                total_goals=total_goals,
                carry_forward=carry_forward
            )
            session_obj.save()
            print(f"Session for {period} inserted successfully!")
        except ValidationError as e:
            print(f'Validation error while inserting session: {e}')
            raise
        except Exception as e:
            print(f'Failed to insert session: {e}')
            raise

    @staticmethod
    def update_session(
            session_id: int,
            period: str = None,  # Date in 'YYYY-MM-DD' format
            available_funds: Decimal = None,
            total_expense: Decimal = None,
            total_goals: Decimal = None,
            carry_forward: Decimal = None
    ):
        try:
            session_obj = Session.objects.get(id=session_id)

            if period is not None:
                session_obj.period = period
            if available_funds is not None:
                session_obj.available_funds = available_funds
            if total_expense is not None:
                session_obj.total_expense = total_expense
            if total_goals is not None:
                session_obj.total_goals = total_goals
            if carry_forward is not None:
                session_obj.carry_forward = carry_forward

            session_obj.save()
            print(f"Session with ID {session_id} updated successfully!")
        except ObjectDoesNotExist:
            print(f"Session with ID {session_id} does not exist.")
            raise
        except ValidationError as e:
            print(f'Validation error while updating session: {e}')
            raise
        except Exception as e:
            print(f'Failed to update session: {e}')
            raise

    def __repr__(self):
        return (
            f"Session(id={self.id}, period='{self.period}', available_funds={self.available_funds}, "
            f"total_expense={self.total_expense}, total_goals={self.total_goals}, "
            f"carry_forward={self.carry_forward})"
        )

    def __str__(self):
        return (
            f"Session on {self.period} - "
            f"Income: ${self.available_funds}, Expenses: ${self.total_expense}, "
            f"Goals: ${self.total_goals}, Carry Forward: ${self.carry_forward}"
        )


class Income(models.Model):
    class Meta:
        unique_together = (('name'),)

    INCOME_CATEGORIES = [
    ('SALARY', 'Salary'),
    ('FREELANCE INCOME', 'Freelance Income'), 
    ('INVESTMENT INCOME', 'Investment Income'), 
    ('RENTAL INCOME', 'Rental Income'), 
    ('SIDE HUSTLE', 'Side Hustle'), 
    ('GIFTS', 'Gifts'), 
    ('REavailable_funds/REIMBURSEMENTS', 'Reavailable_funds/Reimbursements'), 
    ('OTHER INCOME', 'Other Income')
]
  
    FREQUENCY = [
        ('WEEKLY', 'Weekly'), 
        ('BI-WEEKLY', 'Bi-weekly'), 
        ('SEMI-MONTHLYMONTHLY', 'Semi-monthlyMonthly'), 
        ('BI-MONTHLY', 'Bi-monthly'), 
        ('ANNUALLY', 'Annually')
    ]

    name = models.CharField(max_length=60, null=False)
    category = models.CharField(max_length=32, choices=INCOME_CATEGORIES, null=False)
    pay_frequency = models.DurationField(choices=FREQUENCY)
    next_payday = models.DateField(null=False, blank=True)
    amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)

    @staticmethod
    def get_income(**kwargs):
        filters = {key: value for key, value in kwargs.items() if value is not None}
        incomes = Income.objects.filter(**filters)
        return incomes

    @staticmethod
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

    @staticmethod
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

    @staticmethod
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

    def __repr__(self):
        return (
            f"Income(id={self.id}, name='{self.name}', category='{self.category}', "
            f"pay_frequency={self.pay_frequency}, next_payday='{self.next_payday}', "
            f"amount={self.amount})"
        )

    def __str__(self):
        return (
            f"{self.name} ({self.category}) - "
            f"Amount: ${self.amount}, Next Payday: {self.next_payday}, "
            f"Frequency: Every {self.pay_frequency.days} days"
        )


class Expense(models.Model):
    class Meta:
        unique_together = (('name'), ('category'))

    EXPENSE_CATEGORIES = [
        ('HOUSING', 'Housing'), 
        ('RENT/MORTGAGE', 'Rent/Mortgage'), 
        ('UTILITIES', 'Utilities'), 
        ('ELECTRICITY', 'Electricity'), 
        ('WATER', 'Water'), 
        ('GAS', 'Gas'), 
        ('INTERNET', 'Internet'), 
        ('HOME MAINTENANCE', 'Home Maintenance'), 
        ('HOME INSURANCE', 'Home Insurance'), 
        ('PROPERTY TAXES', 'Property Taxes'), 
        ('OTHER HOUSING EXPENSES', 'Other Housing Expenses'), 
        ('TRANSPORTATION', 'Transportation'), 
        ('CAR PAYMENT', 'Car Payment'), 
        ('GAS/FUEL', 'Gas/Fuel'), 
        ('PUBLIC TRANSIT', 'Public Transit'), 
        ('RIDE SHARING', 'Ride Sharing'), 
        ('CAR INSURANCE', 'Car Insurance'), 
        ('CAR MAINTENANCE', 'Car Maintenance'), 
        ('PARKING/TOLLS', 'Parking/Tolls'), 
        ('OTHER TRANSPORTATION EXPENSES', 'Other Transportation Expenses'), 
        ('FOOD', 'Food'), 
        ('GROCERIES', 'Groceries'), 
        ('DINING OUT', 'Dining Out'), 
        ('COFFEE SHOPS', 'Coffee Shops'), 
        ('ALCOHOL/BARS', 'Alcohol/Bars'), 
        ('OTHER FOOD EXPENSES', 'Other Food Expenses'), 
        ('HEALTH', 'Health'), 
        ('HEALTH INSURANCE', 'Health Insurance'), 
        ('DOCTOR VISITS', 'Doctor Visits'), 
        ('MEDICATIONS', 'Medications'), 
        ('GYM MEMBERSHIP', 'Gym Membership'), 
        ('WELLNESS/SUPPLEMENTS', 'Wellness/Supplements'), 
        ('OTHER HEALTH EXPENSES', 'Other Health Expenses'), 
        ('ENTERTAINMENT', 'Entertainment'), 
        ('STREAMING SERVICES', 'Streaming Services'), 
        ('MOVIES/THEATER', 'Movies/Theater'), 
        ('CONCERTS/EVENTS', 'Concerts/Events'), 
        ('HOBBIES', 'Hobbies'), 
        ('GAMES', 'Games'), 
        ('SUBSCRIPTIONS', 'Subscriptions'), 
        ('OTHER ENTERTAINMENT EXPENSES', 'Other Entertainment Expenses'), 
        ('SHOPPING', 'Shopping'), 
        ('CLOTHING', 'Clothing'), 
        ('ELECTRONICS', 'Electronics'), 
        ('HOME GOODS', 'Home Goods'), 
        ('BEAUTY/PERSONAL CARE', 'Beauty/Personal Care'), 
        ('GIFTS', 'Gifts'), 
        ('OTHER SHOPPING EXPENSES', 'Other Shopping Expenses'), 
        ('TRAVEL', 'Travel'), 
        ('FLIGHTS', 'Flights'), 
        ('ACCOMMODATION', 'Accommodation'), 
        ('TRANSPORTATION', 'Transportation'), 
        ('FOOD/DRINK', 'Food/Drink'), 
        ('ACTIVITIES', 'Activities'), 
        ('TRAVEL INSURANCE', 'Travel Insurance'), 
        ('OTHER TRAVEL EXPENSES', 'Other Travel Expenses'), 
        ('DEBT PAYMENTS', 'Debt Payments'), 
        ('CREDIT CARD PAYMENTS', 'Credit Card Payments'), 
        ('STUDENT LOANS', 'Student Loans'), 
        ('PERSONAL LOANS', 'Personal Loans'), 
        ('OTHER DEBT PAYMENTS', 'Other Debt Payments'), 
        ('SAVINGS', 'Savings'), 
        ('EMERGENCY FUND', 'Emergency Fund'), 
        ('RETIREMENT SAVINGS', 'Retirement Savings'), 
        ('INVESTMENT CONTRIBUTIONS', 'Investment Contributions'), 
        ('OTHER SAVINGS', 'Other Savings'), 
        ('EDUCATION', 'Education'), 
        ('TUITION', 'Tuition'), 
        ('BOOKS/SUPPLIES', 'Books/Supplies'), 
        ('COURSES/WORKSHOPS', 'Courses/Workshops'), 
        ('OTHER EDUCATION EXPENSES', 'Other Education Expenses'), 
        ('CHILDCARE', 'Childcare'), 
        ('BABYSITTING', 'Babysitting'), 
        ('SCHOOL FEES', 'School Fees'), 
        ('CHILD ACTIVITIES', 'Child Activities'), 
        ('OTHER CHILDCARE EXPENSES', 'Other Childcare Expenses'), 
        ('PETS', 'Pets'), 
        ('PET FOOD', 'Pet Food'), 
        ('VETERINARY CARE', 'Veterinary Care'), 
        ('PET SUPPLIES', 'Pet Supplies'), 
        ('PET INSURANCE', 'Pet Insurance'), 
        ('OTHER PET EXPENSES', 'Other Pet Expenses'), 
        ('GIFTS/DONATIONS', 'Gifts/Donations'), 
        ('CHARITABLE DONATIONS', 'Charitable Donations'), 
        ('GIFTS FOR OTHERS', 'Gifts for Others'), 
        ('OTHER GIFTS/DONATIONS', 'Other Gifts/Donations'), 
        ('BUSINESS EXPENSES', 'Business Expenses'), 
        ('OFFICE SUPPLIES', 'Office Supplies'), 
        ('TRAVEL EXPENSES', 'Travel Expenses'), 
        ('MARKETING/ADVERTISING', 'Marketing/Advertising'), 
        ('OTHER BUSINESS EXPENSES', 'Other Business Expenses'), 
        ('MISCELLANEOUS', 'Miscellaneous'), 
        ('OTHER EXPENSES', 'Other Expenses')
    ]

    name = models.CharField(max_length=60, null=False)
    category = models.CharField(max_length=30, choices=EXPENSE_CATEGORIES, null=False)
    percentage_of_income = models.IntegerField(null=True, blank=True)
    due_frequency = models.DurationField()
    next_due = models.DateField(null=False, blank=True)
    target_amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    current_amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    fulfilled = models.BooleanField(null=False)

    @staticmethod
    def get_expenses(**kwargs):
        filters = {key: value for key, value in kwargs.items() if value is not None}
        expenses = Expense.objects.filter(**filters)
        return expenses

    @staticmethod
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

    @staticmethod
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

    @staticmethod
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

    def __repr__(self):
        return (
            f"Expense(id={self.id}, name='{self.name}', category='{self.category}', "
            f"percentage_of_income={self.percentage_of_income}, "
            f"due_frequency={self.due_frequency}, next_due='{self.next_due}', "
            f"target_amount={self.target_amount}, current_amount={self.current_amount})"
        )

    def __str__(self):
        return (
            f"{self.name} ({self.category}) - "
            f"Target: ${self.target_amount}, Current: ${self.current_amount}, "
            f"Next Due: {self.next_due}, Frequency: Every {self.due_frequency.days} days"
        )


class Bucket(models.Model):
    class Meta:
        unique_together = (('expense'), ('session'))

    expense = models.ForeignKey(Expense, on_delete=models.SET_DEFAULT, related_name='bucket', null=False, blank=True, default='')
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='session')
    next_due = models.DateField(null=False, blank=True)
    target_amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    fullfilled = models.BooleanField(null=False)

    @staticmethod
    def get_buckets(**kwargs):
        filters = {key: value for key, value in kwargs.items() if value is not None}
        buckets = Bucket.objects.filter(**filters)
        return buckets

    @staticmethod
    def insert_bucket(
            expense_id: int,
            session_id: int,
            next_due: str,  # Date in 'YYYY-MM-DD' format
            target_amount: Decimal,
            amount: Decimal,
            fulfilled: bool
    ):
        try:
            bucket = Bucket.objects.create(
                expense_id=expense_id,
                session_id=session_id,
                next_due=next_due,
                target_amount=target_amount,
                amount=amount,
                fulfilled=fulfilled
            )
            bucket.save()
            print(f"Bucket for expense ID {expense_id} and session ID {session_id} inserted successfully!")
        except ValidationError as e:
            print(f'Validation error while inserting bucket: {e}')
            raise
        except Exception as e:
            print(f'Failed to insert bucket: {e}')
            raise

    @staticmethod
    def update_bucket(
            bucket_id: int,
            expense_id: int = None,
            session_id: int = None,
            next_due: str = None,  # Date in 'YYYY-MM-DD' format
            target_amount: Decimal = None,
            amount: Decimal = None,
            fulfilled: bool = None
    ):
        try:
            bucket = Bucket.objects.get(id=bucket_id)

            if expense_id is not None:
                bucket.expense_id = expense_id
            if session_id is not None:
                bucket.session_id = session_id
            if next_due is not None:
                bucket.next_due = next_due
            if target_amount is not None:
                bucket.target_amount = target_amount
            if amount is not None:
                bucket.amount = amount
            if fulfilled is not None:
                bucket.fulfilled = fulfilled

            bucket.save()
            print(f"Bucket with ID {bucket_id} updated successfully!")
        except ObjectDoesNotExist:
            print(f"Bucket with ID {bucket_id} does not exist.")
            raise
        except ValidationError as e:
            print(f'Validation error while updating bucket: {e}')
            raise
        except Exception as e:
            print(f'Failed to update bucket: {e}')
            raise

    @staticmethod
    def delete_bucket(bucket_id: int):
        try:
            bucket = Bucket.objects.get(id=bucket_id)
            bucket.delete()
            print(f"Bucket with ID {bucket_id} deleted successfully!")
        except ObjectDoesNotExist:
            print(f"Bucket with ID {bucket_id} does not exist.")
            raise
        except Exception as e:
            print(f'Failed to delete bucket: {e}')
            raise

    def __repr__(self):
            return (
                f"Bucket(id={self.id}, expense_id={self.expense.id}, session_id={self.session.id}, "
                f"next_due='{self.next_due}', target_amount={self.target_amount}, "
                f"amount={self.amount}, fulfilled={self.fullfilled})"
            )

    def __str__(self):
        return (
            f"Bucket for Expense {self.expense.id} in Session {self.session.id} - "
            f"Target: ${self.target_amount}, Amount: ${self.amount}, "
            f"Next Due: {self.next_due}, Fulfilled: {self.fullfilled}"
        )


class Goals(models.Model):
    class Meta:
        unique_together = (('name'), ('category'))

    GOAL_CATEGORIES = [
        ('SAVINGS', 'Savings'),
        ('INVESTMENT', 'Investment'),
        ('DEBT_REPAYMENT', 'Debt Repayment'),
        ('EMERGENCY_FUND', 'Emergency Fund'),
        ('RETIREMENT', 'Retirement'),
        ('EDUCATION', 'Education'),
        ('VACATION', 'Vacation'),
        ('HOME', 'Home'),
        ('CAR', 'Car'),
        ('OTHER', 'Other'),
    ]

    name = models.CharField(max_length=60, null=False)
    category = models.CharField(max_length=30, choices=GOAL_CATEGORIES, null=False)
    target_amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    current_amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    fulfilled = models.BooleanField(null=False)

    @staticmethod
    def get_goals(**kwargs):
        filters = {key: value for key, value in kwargs.items() if value is not None}
        goals = Goals.objects.filter(**filters)
        return goals

    @staticmethod
    def insert_goal(
            name: str,
            category: str,
            target_amount: Decimal,
            current_amount: Decimal,
            fulfilled: bool
    ):
        try:
            goal = Goals.objects.create(
                name=name,
                category=category,
                target_amount=target_amount,
                current_amount=current_amount,
                fulfilled=fulfilled
            )
            goal.save()
            print(f"Goal '{name}' inserted successfully!")
        except ValidationError as e:
            print(f'Validation error while inserting goal: {e}')
            raise
        except Exception as e:
            print(f'Failed to insert goal: {e}')
            raise

    @staticmethod
    def update_goal(
            goal_id: int,
            name: str = None,
            category: str = None,
            target_amount: Decimal = None,
            current_amount: Decimal = None,
            fulfilled: bool = None
    ):
        try:
            goal = Goals.objects.get(id=goal_id)

            if name is not None:
                goal.name = name
            if category is not None:
                goal.category = category
            if target_amount is not None:
                goal.target_amount = target_amount
            if current_amount is not None:
                goal.current_amount = current_amount
            if fulfilled is not None:
                goal.fulfilled = fulfilled

            goal.save()
            print(f"Goal with ID {goal_id} updated successfully!")
        except ObjectDoesNotExist:
            print(f"Goal with ID {goal_id} does not exist.")
            raise
        except ValidationError as e:
            print(f'Validation error while updating goal: {e}')
            raise
        except Exception as e:
            print(f'Failed to update goal: {e}')
            raise

    @staticmethod
    def delete_goal(goal_id: int):
        try:
            goal = Goals.objects.get(id=goal_id)
            goal.delete()
            print(f"Goal with ID {goal_id} deleted successfully!")
        except ObjectDoesNotExist:
            print(f"Goal with ID {goal_id} does not exist.")
            raise
        except Exception as e:
            print(f'Failed to delete goal: {e}')
            raise

    def __repr__(self):
        return (
            f"Goals(id={self.id}, name='{self.name}', category='{self.category}', "
            f"target_amount={self.target_amount}, current_amount={self.current_amount}, "
            f"fulfilled={self.fulfilled})"
        )

    def __str__(self):
        return (
            f"{self.name} ({self.category}) - "
            f"Target: ${self.target_amount}, Current: ${self.current_amount}, "
            f"Fulfilled: {self.fulfilled}"
        )