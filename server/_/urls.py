from django.urls import path, include


urlpatterns = [
    path('', include('accounts.urls')),
    path('transactions/', include('trades.urls'), name='transactions'),
]
