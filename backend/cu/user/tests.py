from django.test import TestCase, Client
import json
from .models import User
# Create your tests here.


class UserTestCase(TestCase):
    def setUp(self) -> None:
        newUser1 = User.objects.create_user(
            username="newUser1", password="12345",
            gender=1, age=1, taste="A", question=1
            # 남성, ~10대, "간편식사", "맛"
        )

        newUser2 = User.objects.create_user(
            username="newUser2", password="12345",
            gender=1, age=2, taste="AB", question=2
            # 남성, 20대, "간편식사/과자류", "가성비"
        )

    def tearDown(self):
        User.objects.all().delete()

    # 1. token을 잘 받고 있는지 확인
    def test_token(self):
        # 1.1 token을 잘 받음
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['XSRF-TOKEN'].value
        self.assertEqual(response.status_code, 204)

        # 1.2 GET 이외의 요청
        # Check: CSRF-EXEMPT가 아니므로, 403 Forbidden Error가 뜸
        response = client.delete('/api/user/token/')
        self.assertEqual(response.status_code, 403)

    # 2. 회원가입

    def test_signup(self):
        # 2.1. CSRF 토큰 없이 리퀘스트를 보냄 -> 403 에러
        # CSRF_EXEMPT를 사용하므로, 각주처리
        client = Client(enforce_csrf_checks=True)
        """
        response = client.post('/api/user/signup/', json.dumps({'username': 'testUser1', 'password': '12345',
                                                               'gender': '1', 'age': '1', 'taste': 'ABC', 'question': '1'}),
                           content_type='application/json')
        self.assertEqual(response.status_code, 403)"""

        # 2.2. CSRF 토큰 있고 + 정상 회원가입 -> 201
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['XSRF-TOKEN'].value
        response = client.post('/api/user/signup/', json.dumps({'username': 'testUser1', 'password': '12345',
                                                                'gender': '1', 'age': '1', 'taste': 'ABC', 'question': '1'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

        # 2.3. POST 이외의 요청이 들어옴 -> 405 에러
        response = client.put('/api/user/signup/', json.dumps({'username': 'testUser1', 'password': '12345',
                                                               'gender': '1', 'age': '1', 'taste': 'ABC', 'question': '1'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete(
            '/api/user/signup/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.get(
            '/api/user/signup/')
        self.assertEqual(response.status_code, 405)

    # 3. 로그인 함수
    def test_signin(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['XSRF-TOKEN'].value

        # 2.1.1 POST일 때, 로그인 등록되어 있음 + 현재 로그아웃 상태임(204) - 정상 작동
        response = client.post('/api/user/signin/', json.dumps(
            {'username': 'newUser1', 'password': '12345'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)  # , HTTP_X_CSRFTOKEN=csrftoken
        self.assertEqual(response.status_code, 204)

        # 2.1.2 POST일 때, 로그인 등록되어 있음 + 현재 로그인 상태임(401) - 비정상 접근
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['XSRF-TOKEN'].value
        response = client.post('/api/user/signin/', json.dumps(
            {'username': 'newUser1', 'password': '12345'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)  # , HTTP_X_CSRFTOKEN=csrftoken
        self.assertEqual(response.status_code, 401)

        # 2.2. POST일 때, 로그인 등록 안 됨(401) # authenticate 함수 None
        response = client.post('/api/user/signin/', json.dumps(
            {'username': 'wrong', 'password': 'wrong'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)  # , HTTP_X_CSRFTOKEN=csrftoken
        self.assertEqual(response.status_code, 401)

        # 2.3 POST 외의 요청이 들어옴
        response = client.get('/api/user/signin/')
        self.assertEqual(response.status_code, 405)
        response = client.put('/api/user/signin/', json.dumps({'username': 'chris', 'password': 'chris'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)  # , HTTP_X_CSRFTOKEN=csrftoken
        self.assertEqual(response.status_code, 405)
        response = client.delete(
            '/api/user/signin/', HTTP_X_CSRFTOKEN=csrftoken)  # , HTTP_X_CSRFTOKEN=csrftoken
        self.assertEqual(response.status_code, 405)

    def test_signout(self):
        # 3.1.1 GET + 로그아웃된 상태(401)
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['XSRF-TOKEN'].value

        # , HTTP_X_CSRFTOKEN=csrftoken
        response = client.get('/api/user/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # 3.1.2 GET + 로그인된 상태에서 로그아웃 하기(204)
        client.login(username="newUser1", password="12345")
        # , HTTP_X_CSRFTOKEN=csrftoken
        response = client.get('/api/user/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        # 3.2. GET이 아닌 경우(405)
        response = client.put('/api/user/signout/', json.dumps({}),
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete(
            '/api/user/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.post('/api/user/signout/',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_requestUser(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['XSRF-TOKEN'].value

        # .1 로그아웃된 상태는 아무것도 반환 않음(204)
        response = client.get('/api/user/requestUser/')
        self.assertEqual(response.status_code, 204)
        # .2 로그인된 상태 + requestUser 정상적(204)
        client.login(username="newUser1", password="12345")
        response = client.get('/api/user/requestUser/')
        self.assertEqual(response.status_code, 204)

        # 3.2 GET이 아닌 경우
        # Check: CSRF-EXEMPT가 아니므로, 403 Forbidden Error가 뜸
        response = client.delete(
            '/api/user/requestUser/', HTTP_X_CSRFTOKEN=csrftoken)  # , HTTP_X_CSRFTOKEN=csrftoken
        self.assertEqual(response.status_code, 403)  # 405

    def test_userlist(self):
        # 3.1.1. userList를 정상적으로 반환함(user 없는 경우 []) (200)
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['XSRF-TOKEN'].value

        response = client.get('/api/user/userlist/')
        self.assertEqual(response.status_code, 200)

        # 3.2 GET이 아닌 경우
        # HTTP_X_CSRFTOKEN=csrftoken
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['XSRF-TOKEN'].value
        response = client.delete(
            '/api/user/userlist/', HTTP_X_CSRFTOKEN=csrftoken)  # , HTTP_X_CSRFTOKEN=csrftoken
        self.assertEqual(response.status_code, 403)  # 405
