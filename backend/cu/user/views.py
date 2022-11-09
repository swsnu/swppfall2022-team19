from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.http.response import HttpResponseNotAllowed
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt


#
from django.contrib.auth import authenticate, login, logout

import json
from json.decoder import JSONDecodeError

from .models import User


def index(request):
    return HttpResponse('Hello, world!\n')


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

# 1. 회원가입 # register

@csrf_exempt
# @ensure_csrf_cookie
def signup(request):
    if request.method == "GET":
        user_list = [user for user in User.objects.all().values()]
        return JsonResponse(user_list, safe=False)
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        age = req_data['age']
        gender = req_data['gender']
        taste = req_data['taste']
        question = req_data['question']

        # age 등
        nowUser = User.objects.create_user(username=username, password=password,
                                           age=age, gender=gender, taste=taste, question=question)
        res = {
            "id": nowUser.pk,
            "username": nowUser.username,
            "password": password,
            "gender": nowUser.gender,
            "age": nowUser.age,
            "taste": nowUser.taste,
            "question": nowUser.question,
        }
        print("signup")
        print(nowUser.is_anonymous)
        

        return JsonResponse(res, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

# 2. signin login
@csrf_exempt
# @ensure_csrf_cookie
def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']

        tempUser = authenticate(request, username=username, password=password)
        
        if tempUser is not None:
            # print("tempUser is not None")
            # print(tempUser.is_authenticated)
            if request.user.is_anonymous :
                # User is logged-out
                login(request, tempUser)


                nowUser = User.objects.get(username=username)


                res = {
                    "id": nowUser.pk,
                    "username": nowUser.username,
                    "gender": nowUser.gender,
                    "age": nowUser.age,
                    "taste": nowUser.taste,
                    "question": nowUser.question,
                }

                return JsonResponse(res, status=201, safe=False)
                # HttpResponse(status=204)
            else:
                # User is already logged-in -> error
                return HttpResponse(status=401)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


def signout(request):
    
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponse(status=405)

"""
@csrf_exempt
def user_info(request): # login 
    if request.method == 'PUT':

        body = request.body.decode()
        username = json.loads(body)['username']
        password = json.loads(body)['password']

        user = [user for user in User.objects.filter(username = username)]

        if len(user) == 0 :
            return JsonResponse(None, safe = False) 

        else: 
            user = user[0]
            # password is wrong, not logged in. 
            if user.password == password : 
                user.loginState = True
                user.save()
                return JsonResponse({
        "username": user.username, "password": user.password,
        # "age": user.age, "gender": user.gender, "taste": user.taste, "question": user.question,
        "loginState": user.loginState
         })
            else : JsonResponse(None, safe = False)  
    else:
        return HttpResponseNotAllowed(['PUT'])

@csrf_exempt
def user_list(request): # register
    if request.method == "GET":
        user_list = [user for user in User.objects.all().values()]
        return JsonResponse(user_list, safe=False)

    elif request.method == "POST":
        try:
            body = request.body.decode()
            username = json.loads(body)['username']
            password = json.loads(body)['password']
            # age = json.loads(body)['age']
            # gender = json.loads(body)['gender']
            # taste = json.loads(body)['taste']
            # question = json.loads(body)['question']
            # loginState = json.loads(body)['loginState']

        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        user = [user for user in User.objects.filter(username = username)]
        if len(user) == 0 :
            user = User(
            username=username, password=password,
            # age=age, gender=gender, taste=taste, question=question,
            loginState=False
            )

            user.save()
            response_dict = {"id": user.id, 
            "username": user.username, "password": user.password,
            # "age": user.age, "gender": user.gender, "taste": user.taste, "question": user.question,
            "loginState": user.loginState
            }

            return JsonResponse(response_dict, status=201)      
        else: 
            return JsonResponse(None, safe = False)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
        
"""
