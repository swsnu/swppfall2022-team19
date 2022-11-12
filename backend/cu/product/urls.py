from django.urls import path

from . import views

urlpatterns = [
    path('<str:mainCategory>/all/', views.getProductByMainCategory, name='product_by_main_category'),
    path('<int:id>/', views.product, name = "product"),
    path('<int:id>/rate/' ,views.rateCreate, name='rateCreate'),
    path('<int:id>/rates/', views.rateFetch, name='rateFetch'),
    path('rate/<int:id>/', views.rateUpdateDelete, name='rateUpdateDelete'),
]
