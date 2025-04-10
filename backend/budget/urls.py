from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SessionViewSet, IncomeViewSet, ExpenseViewSet, BucketViewSet, GoalsViewSet, ChoiceCategoriesView

router = DefaultRouter()
router.register(r'session', SessionViewSet)
router.register(r'income', IncomeViewSet)
router.register(r'expense', ExpenseViewSet)
router.register(r'bucket', BucketViewSet, basename='bucket')
router.register(r'goals', GoalsViewSet)

urlpatterns = [
   path('', include(router.urls)),
   path('choices/', ChoiceCategoriesView.as_view(), name='choices'),
]