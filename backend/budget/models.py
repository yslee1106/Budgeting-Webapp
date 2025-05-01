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
        # Housing
        ('HOUSING', 'Housing'),  # Main category
        ('RENT_MORTGAGE', 'Rent/Mortgage'),
        ('UTILITIES', 'Utilities'),  # Combine electricity/water/gas/internet here
        ('HOME_MAINTENANCE', 'Home Maintenance'),
        ('HOME_INSURANCE_TAXES', 'Home Insurance/Taxes'),  # Combined
        
        # Transportation
        ('TRANSPORTATION', 'Transportation'),  # Main category
        ('VEHICLE_PAYMENT', 'Vehicle Payment'),  # Combines car payment
        ('VEHICLE_EXPENSES', 'Vehicle Expenses'),  # Combines gas/fuel, maintenance, insurance
        ('PUBLIC_TRANSPORT', 'Public Transport'),  # Combines public transit/ride sharing
        ('PARKING_TOLLS', 'Parking/Tolls'),
        
        # Food
        ('FOOD', 'Food'),  # Main category
        ('GROCERIES', 'Groceries'),
        ('DINING_OUT', 'Dining Out'),  # Combine coffee shops/alcohol here
        
        # Health
        ('HEALTHCARE', 'Healthcare'),  # Main category
        ('HEALTH_INSURANCE', 'Health Insurance'),
        ('MEDICAL_EXPENSES', 'Medical Expenses'),  # Combines doctor visits/medications
        ('FITNESS', 'Fitness'),  # Gym/wellness
        
        # Entertainment
        ('ENTERTAINMENT', 'Entertainment'),  # Main category
        ('STREAMING_SUBSCRIPTIONS', 'Streaming/Subscriptions'),
        ('RECREATION', 'Recreation'),  # Combines movies, concerts, hobbies, games
        
        # Shopping
        ('SHOPPING', 'Shopping'),  # Main category
        ('CLOTHING', 'Clothing'),
        ('ELECTRONICS', 'Electronics'),
        ('PERSONAL_CARE', 'Personal Care'),  # Beauty/home goods
        
        # Travel
        ('TRAVEL', 'Travel'),  # Main category
        ('ACCOMMODATION', 'Accommodation'),
        ('TRAVEL_TRANSPORT', 'Travel Transport'),  # Flights/local transport
        ('TRAVEL_ACTIVITIES', 'Travel Activities'),
        
        # Financial
        ('DEBT', 'Debt'),  # Main category - combines all debt types
        ('SAVINGS_INVESTMENTS', 'Savings/Investments'),  # Combined
        
        # Other Life Expenses
        ('EDUCATION', 'Education'),  # Combine all education expenses
        ('CHILDCARE', 'Childcare'),  # Combine all childcare
        ('PETS', 'Pets'),  # Combine all pet expenses
        ('GIFTS_DONATIONS', 'Gifts/Donations'),  # Combined
        ('BUSINESS', 'Business Expenses'),  # Combine all business
        
        # Catch-all
        ('MISCELLANEOUS', 'Miscellaneous')
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

    def calculate_next_payment(self, revert):
        """Calculate the next payment based on frequency"""
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