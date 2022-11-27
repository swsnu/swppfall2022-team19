from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.http.response import HttpResponseNotAllowed
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
import json
from json.decoder import JSONDecodeError

from .models import User
# import jwt

# pip install djangorestframework djangorestframework-jwt
# SECRET_KEY = "3317532339f80334c99fff3da3394177af76b44ee337cfa8f69f8c00742915b04c6c95b8b42d0706934b1da2f509a4e209dcdf7622ed45093c11d742176d3b8c"


@ensure_csrf_cookie
def token(request):
    # 테스트 각주 if request.method == 'GET':
    return HttpResponse(status=204)
    # else:
    #    return HttpResponse(status=403)
    # Check: CSRF-EXEMPT가 아니므로, 403 Forbidden Error가 뜸
    # return HttpResponseNotAllowed(['GET'])

# 1. 회원가입 # register


@csrf_exempt
def signup(request):
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

        # access_token = jwt.encode(
        #    {'id': nowUser.id}, SECRET_KEY, algorithm="HS256")
        # access_token = access_token.decode('utf-8')
        res = {
            "id": nowUser.pk,
            "username": nowUser.username,
            "gender": nowUser.gender,
            "age": nowUser.age,
            "taste": nowUser.taste,
            "question": nowUser.question,
            # "access_token": access_token
        }

        return JsonResponse(data=res, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

# 2. signin login


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']

        tempUser = authenticate(request, username=username, password=password)

        if tempUser is not None:
            if request.user.is_anonymous:
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
                return JsonResponse(res, status=200, safe=False)
                # HttpResponse(status=204)
            else:
                # User is already logged-in -> error
                print("request.user is already logged in")
                print(request.user)
                print(tempUser)
                return HttpResponse(status=401)  # check 401
        else:
            print("tempUser is None. 등록되지 않은 유저 정보")
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

# 3. signout 로그아웃


@csrf_exempt
def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            # print("signout_GET이 요청되었고, request.user은 로그아웃 상태입니다")
            return HttpResponse(status=401)
    else:
        return HttpResponse(status=405)

# 4. userlist : 현재 등록된 userlist를 백엔드에서 프론트로 전달


# @csrf_exempt
def userlist(request):
    # 테스트 각주 if (request.method) == "GET":
    user_list = []
    for user in User.objects.all():
        user_dict = {"id": user.pk, "username": user.username, "password": "tempPassword", "gender": user.gender,
                     "age": user.age, "taste": user.taste, "question": user.question, "loginState": user.is_authenticated}
        user_list.append(user_dict)
    return JsonResponse(user_list, safe=False, status=200)
    # 테스트 각주 else:
    # 테스트 각주    return HttpResponseNotAllowed(["GET"])

# 5. requestUser : 현재 request.user의 정보를 userType에 맞추어 전달


# @csrf_exempt
def requestUser(request):
    # 테스트 각주 if (request.method) == "GET":
    if (request.user.is_authenticated):
        print("request.user is authenticated: username is " + request.user.username)
        print(request.user.username)
        nowUser = request.user
        print(nowUser.username)
        res = {
            "id": nowUser.pk,
            "username": nowUser.username,
            "password": "tempPassword",
            "gender": nowUser.gender,
            "age": nowUser.age,
            "taste": nowUser.taste,
            "question": nowUser.question,
        }
        print(res)
        return JsonResponse(res, status=200)
    else:
        print("request.user is logged out")
        return HttpResponse({}, status=401)
    # 테스트 각주 else:
    # 테스트 각주    return HttpResponseNotAllowed(["GET"])


@csrf_exempt
def changeSurvey(request, user_id):
    if (not request.user.is_authenticated):
        print("로그인되지 않은 사용자입니다")
        return HttpResponse(status=401)

    nowUser = request.user

    req_data = json.loads(request.body.decode())
    numberId = req_data['id']
    age = req_data['age']
    gender = req_data['gender']
    taste = req_data['taste']
    question = req_data['question']

    selectedUser = get_object_or_404(User, id=user_id)  # user_id
    if (request.user.id != selectedUser.id):
        return HttpResponse(status=403)

    selectedUser.age = age
    selectedUser.gender = gender
    selectedUser.taste = taste
    selectedUser.question = question
    selectedUser.save()

    res = {
        "gender": nowUser.gender,
        "age": nowUser.age,
        "taste": nowUser.taste,
        "question": nowUser.question,
    }

    return JsonResponse(res, status=200)
