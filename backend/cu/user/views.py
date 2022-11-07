from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.http.response import HttpResponseNotAllowed
from django.views.decorators.csrf import ensure_csrf_cookie

import json
from json.decoder import JSONDecodeError

from .models import User

def index(request):
    return HttpResponse('Hello, world!\n')


@ensure_csrf_cookie
def user_info(request, username, password): # login 
    if request.method == 'PUT':
        user = User.objects.get(username = username)
        if user is None:
            return JsonResponse(None)

        else: 
            # password is wrong, not logged in. 
            if user.password == password : 
                user.loginState = True
                user.save()
                return JsonResponse({"id": user.id, 
        "username": user.username, "password": user.password,
        # "age": user.age, "gender": user.gender, "taste": user.taste, "question": user.question,
        "loginState": user.loginState
         })
            else : JsonResponse(None)  
    else:
        return HttpResponseNotAllowed(['PUT'])


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

        user = User(id = id, 
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
        return HttpResponseNotAllowed(['GET', 'POST'])