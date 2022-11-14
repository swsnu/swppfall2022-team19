from django.test import TestCase, Client
import json
from .models import User
# Create your tests here.


class UserTestCase(TestCase):
    def setUp(self) -> None:
        newUser1 = User.objects.create(
            username="newUser1", password="12345",
            gender=1, age=1, taste="A", question=1
            # 남성, ~10대, "간편식사", "맛"
        )

        newUser2 = User.objects.create(
            username="newUser2", password="12345",
            gender=1, age=2, taste="AB", question=2
            # 남성, 20대, "간편식사/과자류", "가성비"
        )

    def test_token(self):
        client = Client(enforce_csrf_checks=True)
#         response = client.get('/api/token/')
#         csrftoken = response.cookies['csrftoken'].value
#         self.assertEqual(response.status_code, 204)

#         response = client.delete('/api/token/', HTTP_X_CSRFTOKEN=csrftoken)
#         self.assertEqual(response.status_code, 405)

    def tearDown(self):
        User.objects.all().delete()

    def test_signup(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        # 1. CSRF 토큰 없이 리퀘스트를 보냄 -> 403 에러
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup/', json.dumps({'username': 'testUser1', 'password': '12345',
                                                           'gender': '1', 'age': '1', 'taste': 'ABC', 'question': '1'}),
                               content_type='application/json')
        # Request without csrf token returns 403 response
        # self.assertEqual(response.status_code, 403)

        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value
        # 2. CSRF 토큰 있고 + 정상 회원가입 -> 201
        response = client.post('/api/signup/', json.dumps({'username': 'testUser1', 'password': '12345',
                                                           'gender': '1', 'age': '1', 'taste': 'ABC', 'question': '1'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

        # 3. POST 이외의 요청이 들어옴 -> 405 에러
        # HttpResponseNotAllowed['POST']
        response = client.put('/api/signup/', json.dumps({'username': 'testUser1', 'password': '12345',
                                                          'gender': '1', 'age': '1', 'taste': 'ABC', 'question': '1'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete('/api/signup/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_signin(self):
        # 아직 수정되지 않음
        print("로그인 함수 테스팅")

    def test_signout(self):
        # 아직 수정되지 않음
        print("로그아웃 함수 테스팅")
