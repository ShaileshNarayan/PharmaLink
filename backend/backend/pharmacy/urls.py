from django.urls import path
from .views import pharmacy_list

urlpatterns = [
    path('pharmacies/', pharmacy_list),
]
