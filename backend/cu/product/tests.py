from django.test import TestCase, Client, RequestFactory
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from product.models.productModel import Product
from product.models.rateModel import Rate, Score
import json
# Create your tests here.

class BlogTestCase(TestCase):
    
    def setUp(self) -> None:
        '''
        newUser1
        벌교꼬막 비빔밥, 자이언트일품닭강정
        newScore1(5,5,5,5,5)
        newRate1, newRate2

        '''

        newUser1 = User.objects.create(
            username="newUser1", password="12345",
            gender=1, age=1, taste="A", question=1
            # 남성, ~10대, "간편식사", "맛"
        )

        벌교꼬막비빔밥 = Product.objects.create(
            name = "벌교꼬막비빔밥",
            mainCategory = "간편식사",
            subCategory = "도시락",
            imageUrl = "https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809196616970.jpg",
            details = "꼬막을 풍성하게 구성항 외관과 비쥬얼을 극대화 하였음(일부지역 미운영)",
            price = 5000,
            newProduct= True,
            # tag
            averageScore = 0,
        )

        자이언트일품닭강정 = Product.objects.create(
            name = "벌교꼬막비빔밥",
            mainCategory = "간편식사",
            subCategory = "도시락",
            imageUrl = "https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771025320.jpg",
            details = "지금까지 출시한 자이언트 닭강정 시리즈 중 가장 인기있는 레시피 적용",
            price = 9900,
            newProduct= True,
            # tag
            averageScore = 0,
        )
        '''
        newScore1 = Score.objects.create(
            name = "newScore1",
            score1 = 5,
            score2 = 5,
            score3 = 5,
            score4 = 5,
            score5 = 5,
        )
        newRate1 = Rate.objects.create(
            user = newUser1,
            product = 벌교꼬막비빔밥,
            scores = newScore1,
            comment = "맛나요"
            #picture (blank true)
            #likedCount (default=0)
        )
        newRate2 = Rate.objects.create(
            user = newUser1,
            product = 자이언트일품닭강정,
            scores = newScore1,
            comment = "닭강정 최고"
            #picture (blank true)
            #likedCount (default=0)
        )
        '''

    def test_product(self): # get(product list, a product) put(product avgScore)
        client = Client(enforce_csrf_checks=True)

        # (O)list - not intended(all products) /api/product/
        response = self.client.get('/api/product/', content_type='application/json') 
        self.assertEqual(response.status_code, 200)

        # (O)retrieve /api/product/{product_id}
        response = self.client.get('/api/product/1/',content_type='application/json') 
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/product/2/',content_type='application/json') 
        self.assertEqual(response.status_code, 200)

        # (O)update /api/product/{product_id}
        response = self.client.update('/api/product/1/',{'averageScore':'1.0'},content_type='application/json') 
        self.assertEqual(response.status_code, 200)
        response = self.client.update('/api/product/2/',{'averageScore':'1.0'},content_type='application/json') 
        self.assertEqual(response.status_code, 200)
        response = self.client.update('/api/product/1/',{'averageScore':'타입오류1'},content_type='application/json') 
        self.assertEqual(response.status_code, 400) # input format error
        response = self.client.update('/api/product/2/',{'averageScore':'타입오류2'},content_type='application/json') 
        self.assertEqual(response.status_code, 400) # input format error

    
    def test_rate(self): # get(list rates, retrieve rate) post(create rate) put(update rate) delete(destroy rate)
        client = Client(enforce_csrf_checks=True)

        # list /api/rate/
        # response = self.client.get('/api/rate/', content_type='application/json') 
        # self.assertEqual(response.status_code, 200)
        
        # create /api/rate/
        # response = self.client.post('/api/rate/', {},content_type='application/json') 
        # self.assertEqual(response.status_code, 200)
        # response = self.clinet.post('/api/rate/', {},content_type='application/json') 
        # self.assertEqual(response.status_code, 400) # input format error

        # (O)retrieve /api/rate/{rate_id}/
        response = self.client.get('/api/rate/1/',content_type='application/json') 
        self.assertEqual(response.status_code, 200)

        # update /api/rate/{rate_id}/
        # response = self.client.update('/api/product/1/',{},content_type='application/json') 
        # self.assertEqual(response.status_code, 200)
        # response = self.client.update('/api/product/1/',{},content_type='application/json') 
        # self.assertEqual(response.status_code, 400) # input format error

        # (O)destroy /api/rate/{rate_id}/
        response = self.client.delete('/api/rate/1/',content_type='application/json') 
        self.assertEqual(response.status_code, 204)
        response = self.client.delete('/api/rate/10/',content_type='application/json') 
        self.assertEqual(response.status_code, 404)

    
        