from django.db import models

# Create your models here.
INCOME_CATEGORIES = [
    ('SALARY', 'Salary'),
    ('FREELANCE INCOME', 'Freelance Income'), 
     ('INVESTMENT INCOME', 'Investment Income'), 
     ('RENTAL INCOME', 'Rental Income'), 
     ('SIDE HUSTLE', 'Side Hustle'), 
     ('GIFTS', 'Gifts'), 
     ('REFUNDS/REIMBURSEMENTS', 'Refunds/Reimbursements'), 
     ('OTHER INCOME', 'Other Income')
]
    
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

FREQUENCY = [
    ('WEEKLY', 'Weekly'), 
    ('BI-WEEKLY', 'Bi-weekly'), 
    ('SEMI-MONTHLYMONTHLY', 'Semi-monthlyMonthly'), 
    ('BI-MONTHLY', 'Bi-monthly'), 
    ('ANNUALLY', 'Annually')
]

class Income(models.Model):
    class Meta:
        unique_together = (('name'),)

    name = models.CharField(max_length=60, null=False)
    category = models.CharField(max_length=30, choices=INCOME_CATEGORIES, null=False)
    pay_frequency = models.DurationField()
    next_payday = models.DateField(null=False, blank=True)
    amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)

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

    name = models.CharField(max_length=60, null=False)
    category = models.CharField(max_length=30, choices=EXPENSE_CATEGORIES, null=False)
    percentage_of_income = models.IntegerField(null=True, blank=True)
    due_frequency = models.DurationField()
    next_due = models.DateField(null=False, blank=True)
    target_amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    current_amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    fulfilled = models.BooleanField(null=False)

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
