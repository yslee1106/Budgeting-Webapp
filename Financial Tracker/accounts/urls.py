from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_menu, name='menu'),
    path('accounts/add/', views.add_account, name='add-new-account'),
    path('transactions/add/', views.add_transaction, name='add-new-transaction'),
    path('accounts/', views.get_all_accounts, name='view-all-accounts'),
    path('transactions/', views.get_all_transactions, name='view-all-transactions')
]