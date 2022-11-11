from django.urls import path

from . import views

urlpatterns = [
    path('<int:productID>/rate/', views.rate , name='rate'), 
    path('<int:productID>/review/', views.review, name='review')
]
