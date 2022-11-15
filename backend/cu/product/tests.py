from django.test import TestCase, Client, RequestFactory
from user.models import User
from django.contrib.auth import authenticate,login,logout
from product.models.productModel import Product
from product.models.rateModel import Rate, Score
import json
# Create your tests here.

class BlogTestCase(TestCase):
    
    def setUp(self) -> None:

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
            name = "자이언트일품닭강정",
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
        '''
        newScore2 = Score.objects.create(
            name = "newScore2",
            score1 = 3,
            score2 = 3,
            score3 = 3,
            score4 = 3,
            score5 = 3,
        )
        '''
        newRate1 = Rate.objects.create(
            id=1,
            user = newUser1,
            product = 벌교꼬막비빔밥,
            scores = newScore1,
            comment = "맛나요"
        )
        '''
        newRate2 = Rate.objects.create(
            id=2,
            user = newUser1,
            product = 자이언트일품닭강정,
            scores = newScore2,
            comment = "닭강정 최고"
        )
        


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
        response = self.client.put('/api/product/1/',{'averageScore':'1.0'},content_type='application/json') 
        self.assertEqual(response.status_code, 200)
        response = self.client.put('/api/product/2/',{'averageScore':'1.0'},content_type='application/json') 
        self.assertEqual(response.status_code, 200)
        response = self.client.put('/api/product/1/',{'averageScore':'타입오류1'},content_type='application/json') 
        self.assertEqual(response.status_code, 400) # input format error
        response = self.client.put('/api/product/2/',{'averageScore':'타입오류2'},content_type='application/json') 
        self.assertEqual(response.status_code, 400) # input format error

    
    def test_rate(self): # get(list rates, retrieve rate) post(create rate) put(update rate) delete(destroy rate)
        client = Client(enforce_csrf_checks=True)

        # (O)list /api/rate/
        response = self.client.get('/api/rate/', content_type='application/json') 
        self.assertEqual(response.status_code, 200)
        
        # (O)check setUp rate
        rate = Rate.objects.get(id=2)
        user = User.objects.get(username="newUser1")
        product = Product.objects.get(name="자이언트일품닭강정")
        newScore = Score.objects.get(name="newScore2")
        self.assertIsInstance(rate,Rate)
        self.assertEqual(rate.id, 2)
        self.assertEqual(rate.user, user)
        self.assertEqual(rate.product, product)
        self.assertEqual(rate.scores, newScore)
        self.assertEqual(rate.comment, "닭강정 최고")

        # (O)test_str_
        self.assertEqual(str(product), product.name)
        self.assertEqual(str(newScore), newScore.name)
        self.assertEqual(str(rate), rate.product.name)

        # (X)create /api/rate/
        # response = self.client.post('/api/rate/', {},content_type='application/json') 
        # self.assertEqual(response.status_code, 200)
        # response = self.client.post('/api/rate/', {},content_type='application/json') 
        # self.assertEqual(response.status_code, 400) # input format error

        # (O)retrieve /api/rate/{rate_id}/
        response = self.client.get('/api/rate/2/',content_type='application/json') 
        self.assertEqual(response.status_code, 200)

        # (X)update /api/rate/{rate_id}/
        # response = self.client.put('/api/rate/1/',{},content_type='application/json') 
        # self.assertEqual(response.status_code, 200)
        # response = self.client.put('/api/rate/1/',{},content_type='application/json') 
        # self.assertEqual(response.status_code, 400) # input format error

        # (O)destroy /api/rate/{rate_id}/
        response = self.client.delete('/api/rate/2/',content_type='application/json') 
        self.assertEqual(response.status_code, 204)
        response = self.client.delete('/api/rate/10/',content_type='application/json') 
        self.assertEqual(response.status_code, 404)

    
        
'''
    def tearDown(self):
        User.objects.all().delete()
        Product.objects.all().delete()
        Score.objects.all().delete()
        Rate.objects.all().delete()
        
'''