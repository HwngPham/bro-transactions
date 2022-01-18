from django.urls import path
from . import views


urlpatterns = [
    path('', view=views.list, name='transactions'),
    path('create/', views.create, name='create_tran'),
    path('delete/<int:tran_id>', views.delete, name='delete'),
    path('update/<int:tran_id>', views.update_transaction, name='update'),
    path('pending/', views.list_pending, name='list_pending'),
    path('update_status', views.update_status, name='update_status'),
]
