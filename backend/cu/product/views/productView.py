import json
from rest_framework import viewsets
from rest_framework.response import Response
from product.models.productModel import Tag, Product
from product.serializers.productSerializer import ProductSerializer
#from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

'''
/api/product/
def list(self, request) - product 전체 가져오기

/api/product/{product_id}
def retrieve(self, request, pk) - 특정 product 가져오기
def update(self, request, pk) - avgScore 수정
'''
class ProductViewSet(viewsets.GenericViewSet):
    queryset = Product.objects.all() 
    serializer_class = ProductSerializer

    # (O)GET /api/product/

    def list(self, request):
        products = Product.objects.all()
        serializer = self.get_serializer(products, many=True)
        data = serializer.data              # dictionary format not json yet
        return Response(data, status=200)   # json

    '''
    for search function

    def list(self, request):       
        searchWord = request.GET.get("mainCategory", "")  
        #searchWord = request.data?
        products = (
            self.get_queryset()
            .filter(
                mainCategory=searchWord
                #Q(mainCategory_icontains=searchWord)|
                #Q(subCategory_icontains=searchWord)|
                #Q(name_icontains=searchWord)
            )
            #.distinct()
        )
        #products = products[:5]            # 20 product lists
        serializer = self.get_serializer(products, many=True)
        data = serializer.data              # dictionary format not json yet
        return Response(data, status=200)   # json
    '''

    # (O)GET /api/product/{product_id}

    def retrieve(self, request, pk=None):
        product = self.get_object()
        return Response(self.get_serializer(product).data, status=200)

    # (O)PUT /api/product/{product_id} 

    def update(self, request, pk=None):
        product = self.get_object()
        data = json.loads(request.body.decode('utf-8'))
        averageScoreData = data.pop("averageScore")

        # update, puts only the modifying field, partial true
        serializer = self.get_serializer(product, data={'averageScore': averageScoreData}, partial=True)
        # (O)bad request 400
        serializer.is_valid(raise_exception=True) # if False 400 response
        serializer.save()

        return Response(serializer.data, status=200)

    # def searchName(self, request, searchKey):
    #     products = [Product.objects.filter(Q(name__contains=searchKey))]
    #     serializer = self.get_serializer(products, many=True)
    #     data = serializer.data              # dictionary format not json yet
    #     return Response(data, status=200)   # json

    # def searchTag(self, request, searchTag):
    #     products = [product for product in Product.objects.all() if searchTag in product.tags]
    #     serializer = self.get_serializer(products, many=True)
    #     # data = serializer.data              # dictionary format not json yet
    #     return Response(data, status=200)   # json