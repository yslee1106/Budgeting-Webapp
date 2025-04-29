from django.contrib import admin
from .models import Session, Income, Expense, Bucket, Goals

# Register your models here.
class SessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'period', 'total_funds')
    list_filter = ('user',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

class IncomeAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'category')
    list_filter = ('user',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'category')
    list_filter = ('user',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

class BucketAdmin(admin.ModelAdmin):
    list_display = ('user', 'expense', 'get_sessions')
    list_filter = ('user',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)
    
    def get_sessions(self, obj):
        return ", ".join(str(session) for session in obj.session.all())
    get_sessions.short_description = 'Sessions'

class GoalsAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'category')
    list_filter = ('user',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

admin.site.register(Session, SessionAdmin)
admin.site.register(Income, IncomeAdmin)
admin.site.register(Expense, ExpenseAdmin)
admin.site.register(Bucket, BucketAdmin)
admin.site.register(Goals, GoalsAdmin)