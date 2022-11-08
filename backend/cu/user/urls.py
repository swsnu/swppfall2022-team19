from django.urls import path

from . import views

urlpatterns = [
    # start login
    # path('login/', views.user_info, name='login'),
    # path('signup/', views.user_list, name='signup')
    path('login/', views.signin, name='login'),
    path('logout/', views.signout, name='signout'),
    path('signup/', views.signup, name='signup')
]
