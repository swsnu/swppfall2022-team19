from django.urls import path

from . import views

urlpatterns = [
    path('<string: mainCategory>/all/', views.getProductByMainCategory, name='product_by_main_category'),
    path('<int: id>/', views.product, name = "product"),
    #path('rate/<int:id>/')
]
