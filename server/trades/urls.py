from django.urls import path
from . import views


urlpatterns = [
    path('', view=views.list, name='transactions'),
    path('create/', views.create, name='create'),
    path('delete/<int:tran_id>', views.delete, name='delete'),
    path('update/<int:tran_id>', views.update_transaction, name='update'),
]
