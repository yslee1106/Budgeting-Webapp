from django.db import models
from django.contrib.auth import get_user_model
from dateutil.relativedelta import relativedelta
from datetime import timedelta

# Create your models here.
User = get_user_model()

class Session(models.Model):
    class Meta:
        unique_together = (('user'), ('period'))
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions')
    period = models.DateField(null=False, blank=False)
    total_funds = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    available_funds = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    total_expense = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    total_goals = models.DecimalField(max_digits=20, decimal_places=2, null=False)

    def __repr__(self):
        return (
            f"Session(id={self.id}, period='{self.period}',  total_funds={self.total_funds}"
            f"total_expense={self.total_expense}, total_goals={self.total_goals}, available_funds={self.available_funds},"
        )

    def __str__(self):
        return (
            f"Session on {self.period} - "
            f"Total Funds: ${self.total_funds}, Expenses: ${self.total_expense}, "
            f"Goals: ${self.total_goals}, Available Funds: ${self.available_funds}"
        )


class Income(models.Model):
    class Meta:
        unique_together = (('user'), ('name'),)

    INCOME_CATEGORIES = [
        ('SALARY', 'Salary'),
        ('FREELANCE INCOME', 'Freelance Income'), 
        ('INVESTMENT INCOME', 'Investment Income'), 
        ('RENTAL INCOME', 'Rental Income'), 
        ('SIDE HUSTLE', 'Side Hustle'), 
        ('GIFTS', 'Gifts'), 
        ('REIMBURSEMENTS', 'Reimbursements'), 
        ('OTHER INCOME', 'Other Income')
    ]
  
    FREQUENCY_CHOICES = [
        ('DAILY', 'Daily'),
        ('WEEKLY', 'Weekly'),
        ('BIWEEKLY', 'Bi-weekly'),
        ('SEMIMONTHLY', 'Semi-monthly (1st and 15th)'),
        ('MONTHLY', 'Monthly'),
        ('BIMONTHLY', 'Bi-monthly (Every 2 months)'),
        ('QUARTERLY', 'Quarterly'),
        ('SEMIANNUALLY', 'Semi-annually'),
        ('ANNUALLY', 'Annually'),
        ('ONETIME', 'One-time'),
        ('EVERY_3_DAYS', 'Every 3 days'),
        ('EVERY_10_DAYS', 'Every 10 days'),
        ('EVERY_3_WEEKS', 'Every 3 weeks'),
        ('EVERY_4_WEEKS', 'Every 4 weeks'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='income')
    name = models.CharField(max_length=60, null=False)
    category = models.CharField(max_length=32, choices=INCOME_CATEGORIES, null=False)
    pay_frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES, null=False)  # Changed to CharField
    next_payday = models.DateField(null=False, blank=True)
    amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)

    def calculate_payday(self, revert):
        """Calculate the next payday based on frequency"""
        if not self.next_payday:
            return None
            
        freq_map = {
            'DAILY': timedelta(days=1),
            'WEEKLY': timedelta(weeks=1),
            'BIWEEKLY': timedelta(weeks=2),
            'SEMIMONTHLY': self._get_semimonthly_delta,
            'MONTHLY': relativedelta(months=1),
            'BIMONTHLY': relativedelta(months=2),
            'QUARTERLY': relativedelta(months=3),
            'SEMIANNUALLY': relativedelta(months=6),
            'ANNUALLY': relativedelta(years=1),
            'EVERY_3_DAYS': timedelta(days=3),
            'EVERY_10_DAYS': timedelta(days=10),
            'EVERY_3_WEEKS': timedelta(weeks=3),
            'EVERY_4_WEEKS': timedelta(weeks=4),
        }
        
        delta = freq_map.get(self.pay_frequency)
        if callable(delta):
            return delta()
        
        if not revert:
            return self.next_payday + delta
        else:
            return self.next_payday - delta

    def _get_semimonthly_delta(self):
        """Special handling for semi-monthly (1st and 15th)"""
        if self.next_payday.day == 1:
            return self.next_payday.replace(day=15)
        else:
            return (self.next_payday + relativedelta(months=1)).replace(day=1)

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
            f"Frequency: Every {self.get_pay_frequency_display()} days"
        )


class Expense(models.Model):
    class Meta:
        unique_together = (('user'), ('name'))

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

    FREQUENCY_CHOICES = [
        ('DAILY', 'Daily'),
        ('WEEKLY', 'Weekly'),
        ('BIWEEKLY', 'Bi-weekly'),
        ('SEMIMONTHLY', 'Semi-monthly (1st and 15th)'),
        ('MONTHLY', 'Monthly'),
        ('BIMONTHLY', 'Bi-monthly (Every 2 months)'),
        ('QUARTERLY', 'Quarterly'),
        ('SEMIANNUALLY', 'Semi-annually'),
        ('ANNUALLY', 'Annually'),
        ('ONETIME', 'One-time'),
        ('EVERY_3_DAYS', 'Every 3 days'),
        ('EVERY_10_DAYS', 'Every 10 days'),
        ('EVERY_3_WEEKS', 'Every 3 weeks'),
        ('EVERY_4_WEEKS', 'Every 4 weeks'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expense')
    name = models.CharField(max_length=60, null=False)
    category = models.CharField(max_length=30, choices=EXPENSE_CATEGORIES, null=False)
    recurring = models.BooleanField(default=False, null=False)
    payment_frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES, null=True)  # Changed to CharField
    next_payment = models.DateField(null=True)
    spending_limit = models.DecimalField(max_digits=20, decimal_places=2, null=False)

    date_created = models.DateField(auto_now_add=True)
    deleted_at = models.DateField(null=True, blank=True)

    def calculate_payday(self, revert):
        """Calculate the next payday based on frequency"""
        if not self.recurring:
            return None
            
        freq_map = {
            'DAILY': timedelta(days=1),
            'WEEKLY': timedelta(weeks=1),
            'BIWEEKLY': timedelta(weeks=2),
            'SEMIMONTHLY': self._get_semimonthly_delta,
            'MONTHLY': relativedelta(months=1),
            'BIMONTHLY': relativedelta(months=2),
            'QUARTERLY': relativedelta(months=3),
            'SEMIANNUALLY': relativedelta(months=6),
            'ANNUALLY': relativedelta(years=1),
            'EVERY_3_DAYS': timedelta(days=3),
            'EVERY_10_DAYS': timedelta(days=10),
            'EVERY_3_WEEKS': timedelta(weeks=3),
            'EVERY_4_WEEKS': timedelta(weeks=4),
        }
        
        delta = freq_map.get(self.payment_frequency)
        if callable(delta):
            return delta()
        
        if not revert:
            return self.next_payment + delta
        else:
            return self.next_payment - delta

    def _get_semimonthly_delta(self):
        """Special handling for semi-monthly (1st and 15th)"""
        if self.next_payment.day == 1:
            return self.next_payment.replace(day=15)
        else:
            return (self.next_payment + relativedelta(months=1)).replace(day=1)

    def __repr__(self):
        return (
            f"Expense(id={self.id}, name='{self.name}', category='{self.category}', "
            f"payment_frequency={self.payment_frequency}, next_payment='{self.next_payment}', "
            f"spending_limit={self.spending_limit})"
            f"date_created='{self.date_created}', deleted_at={self.deleted_at})"
        )

    def __str__(self):
        return (
            f"{self.name} ({self.category}) - "
            f"Limit: ${self.spending_limit}"
            f"Next Due: {self.next_payment}, Frequency: Every {self.payment_frequency.days} days"
        )


class Bucket(models.Model):
    class Meta:
        unique_together = (('user'), ('expense'), ('session'), ('next_payment'))

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bucket')
    expense = models.ForeignKey(Expense, on_delete=models.SET_DEFAULT, related_name='expense', null=False, blank=True, default='')
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='bucket')
    next_payment = models.DateField(null=True, blank=True)
    spending_limit = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    current_amount = models.DecimalField(default=0.00, max_digits=20, decimal_places=2, null=False)
    fulfilled = models.BooleanField(default=False, null=False)

    def __repr__(self):
            return (
                f"Bucket(id={self.id}, expense_id={self.expense.id}, session_id={self.session.id}, "
                f"next_payment='{self.next_payment}', spending_limit={self.spending_limit}, "
                f"current_amount={self.current_amount}, fulfilled={self.fulfilled})"
            )

    def __str__(self):
        return (
            f"Bucket for Expense {self.expense.id} in Session {self.session.id} - "
            f"Limit: ${self.spending_limit}, Amount: ${self.current_amount}, "
            f"Next Due: {self.next_payment}, Fulfilled: {self.fulfilled}"
        )


class Goals(models.Model):
    class Meta:
        unique_together = (('user'), ('name'))

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

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='goals')
    name = models.CharField(max_length=60, null=False)
    category = models.CharField(max_length=30, choices=GOAL_CATEGORIES, null=False)
    target_amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    current_amount = models.DecimalField(max_digits=20, decimal_places=2, default=0.00, null=False)
    fulfilled = models.BooleanField(default=False, null=False)
    target_date = models.DateField(null=True)

    date_created = models.DateField(auto_now_add=True)
    deleted_at = models.DateField(null=True, blank=True)

    def __repr__(self):
        return (
            f"Goals(id={self.id}, name='{self.name}', category='{self.category}', "
            f"target_amount={self.target_amount}, current_amount={self.current_amount}, "
            f"fulfilled={self.fulfilled})"
            f"target_date={self.target_date}"
            f"date_created='{self.date_created}', deleted_at={self.deleted_at})"
        )

    def __str__(self):
        return (
            f"{self.name} ({self.category}) - "
            f"Target: ${self.target_amount}, Current: ${self.current_amount}, "
            f"Fulfilled: {self.fulfilled}"
            f"Target Date: {self.target_date}"
        )