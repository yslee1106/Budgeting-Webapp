from django.contrib import admin
from .models import Transaction

# Register your models here.
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'date')
    list_filter = ('user',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

admin.site.register(Transaction, TransactionAdmin)
