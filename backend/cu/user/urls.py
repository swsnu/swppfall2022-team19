from django.urls import path

from . import views

urlpatterns = [
    path('signin/', views.signin, name='login'),
    path('signout/', views.signout, name='signout'),
    path('signup/', views.signup, name='signup'),
    path('token/', views.token, name='token'),
    path('requestUser/', views.requestUser, name="requestUser"),
    path('userlist/', views.userlist, name="userlist"),
]

# path('newSurvey/', views.changeSurvey, name="changeSurvey")
# 추후 MyPage에서 Survey 정보 수정할 때 활용할 예정
