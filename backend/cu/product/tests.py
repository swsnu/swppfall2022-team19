from django.test import TestCase
from user.models import User
from product.models.productModel import Product, Tag
from product.models.rateModel import Rate, Like
import json

class BlogTestCase(TestCase):
    
    def setUp(self) -> None:

        newUser1 = User.objects.create_user(
            id = 1,
            username="newUser1", password="12345",
            gender=1, age=1, taste="A", question=1
            # 남성, ~10대, "간편식사", "맛"
        )

        벌교꼬막비빔밥 = Product.objects.create(
            id = 1,
            name = "벌교꼬막비빔밥",
            mainCategory = "간편식사",
            subCategory = "도시락",
            imageUrl = "https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809196616970.jpg",
            details = "꼬막을 풍성하게 구성항 외관과 비쥬얼을 극대화 하였음(일부지역 미운영)",
            price = 5000,
            newProduct= True,
            # tag
            averageScore = 0,
            rateCount=4,
        )

        자이언트일품닭강정 = Product.objects.create(
            id = 2,
            name = "자이언트일품닭강정",
            mainCategory = "간편식사",
            subCategory = "도시락",
            imageUrl = "https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771025320.jpg",
            details = "지금까지 출시한 자이언트 닭강정 시리즈 중 가장 인기있는 레시피 적용",
            price = 9900,
            newProduct= True,
            # tag
            averageScore = 4.0,
            rateCount=1,
        )

        tag1 = Tag.objects.create(
            name = "우유",
        )

        newRate1 = Rate.objects.create(
            id=1,
            user = newUser1,
            product = 벌교꼬막비빔밥,
            scores = "55555",
            comment = "맛나요",
            picture = "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff3f943a3-0d77-44d7-b73a-0a1243830899%2FKakaoTalk_20220316_175852217.jpg?table=block&id=01f83f77-659f-4ab1-89ce-4274b3259c64&spaceId=d465497d-101f-41ec-bff8-b1d0842c9d7f&width=2000&userId=8d67198c-a864-44f0-abdc-84d89cf29324&cache=v2",
            likedCount = 0,
        )
        
        newRate2 = Rate.objects.create(
            id=2,
            user = newUser1,
            product = 자이언트일품닭강정,
            scores = "55555",
            comment = "닭강정 최고",
            likedCount = 0,
        )
        
        like1 = Like.objects.create(
            user=newUser1,
            rate=newRate1,
        )


    # (O)check setUp rate
    # def test_str(self): 
    #     rate = Rate.objects.get(id=2)
    #     user = User.objects.get(username="newUser1")
    #     # product = Product.objects.get(name="자이언트일품닭강정")
    #     tag = Tag.objects.get(name="우유")
    #     self.assertIsInstance(rate,Rate)
    #     self.assertEqual(rate.id, 2)
    #     self.assertEqual(rate.user, user)
    #     # self.assertEqual(rate.product, product)
    #     self.assertEqual(rate.scores, "55555")
    #     self.assertEqual(rate.comment, "닭강정 최고")

    #     # (O)test_str_
    #     # self.assertEqual(str(product), product.name)
    #     self.assertEqual(str(rate), rate.product.name)
    #     self.assertEqual("우유",str(tag))

    '''
    product
    '''
    # GET(list, retrieve) PUT(update)

    # (O)list /api/product/
    def test_product_list(self):
        response = self.client.get('/api/product/', {'user_id':'user_id'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    # (O)list /api/product/mainCategory/
    # def test_product_mainCategory(self):
    #     response = self.client.get('/api/product/mainCategory/', {'mainCategory':'간편식사'}, content_type='application/json') 
    #     self.assertEqual(response.status_code, 200)


    # (O)retrieve /api/product/{product_id}/
    def test_product_retrieve(self):
        response = self.client.get('/api/product/1/') 
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/product/2/') 
        self.assertEqual(response.status_code, 200)


    # (O)update /api/product/{product_id}/
    def test_product_update_type_correct(self):
        response = self.client.put('/api/product/1/',{'averageScore':'1.0'},content_type='application/json') 
        self.assertEqual(response.status_code, 200)
        response = self.client.put('/api/product/2/',{'averageScore':'1.0'},content_type='application/json') 
        self.assertEqual(response.status_code, 200)

    def test_product_update_type_wrong(self):
        response = self.client.put('/api/product/1/',{'averageScore':'형식오류1'},content_type='application/json') 
        self.assertEqual(response.status_code, 400) # input format error
        response = self.client.put('/api/product/2/',{'averageScore':'형식오류2'},content_type='application/json') 
        self.assertEqual(response.status_code, 400) # input format error


    '''
    rate
    '''
    # GET(list retrieve user liked) POST(create) PUT(update) DELETE(destroy)

    # (O)list /api/rate/
    def test_rate_list(self): 
        response = self.client.get('/api/rate/') 
        self.assertEqual(response.status_code, 200)

        # (O)list /api/rate/user/
        response = self.client.get('/api/rate/user/', {'user_id': '1'}, content_type='application/json') 
        self.assertEqual(response.status_code, 200)

        # (O)list /api/rate/liked/
        response = self.client.get('/api/rate/liked/', {'user_id': '1'}, content_type='application/json') 
        self.assertEqual(response.status_code, 200)

    # (O)create /api/rate/
    def test_rate_create(self):    
        response = self.client.post('/api/rate/',{
            "user_id": 1,"product_id":1,"scores": "55555","comment": "맛나요",
            "picture": "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff3f943a3-0d77-44d7-b73a-0a1243830899%2FKakaoTalk_20220316_175852217.jpg?table=block&id=01f83f77-659f-4ab1-89ce-4274b3259c64&spaceId=d465497d-101f-41ec-bff8-b1d0842c9d7f&width=2000&userId=8d67198c-a864-44f0-abdc-84d89cf29324&cache=v2"
            }) 
        # print(response.json())
        self.assertEqual(response.status_code, 201)


    # (O)retrieve /api/rate/{rate_id}/
    def test_rate_retrieve(self): 
        
        response = self.client.get('/api/rate/2/') 
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/rate/10/') 
        self.assertEqual(response.status_code, 404)


    # ()update /api/rate/{rate_id}/
    def test_rate_update(self): 
        #data = ( user_i:1, username:newUser1, product_id:1, scores:13333, comment:이이, likedCount:1, id:1)
        #response = self.client.put('/api/rate/2/', data=data, content_type = 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' ) # why 400
        print("see")
        #print(response.json())
        print("see")
        #self.assertEqual(response.status_code, 400)


    # (O)destroy /api/rate/{rate_id}/
    def test_rate_destory(self): 
        response = self.client.delete('/api/rate/1/') 
        self.assertEqual(response.status_code, 204)   
        response = self.client.delete('/api/rate/2/') 
        self.assertEqual(response.status_code, 204)
        response = self.client.delete('/api/rate/10/') 
        self.assertEqual(response.status_code, 404) # none exist 404

    
        
    def tearDown(self):
        User.objects.all().delete()
        Product.objects.all().delete()
        Rate.objects.all().delete()
        
