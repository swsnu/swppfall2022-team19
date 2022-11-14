from rest_framework import viewsets
from rest_framework.response import Response
from product.models.productModel import Tag, Product
from product.serializers.productSerializer import ProductSerializer
#from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt

'''
/api/product/
def list(self, request)

/api/product/{product_id}
def list(self, request)
def retrieve(self, request, pk)
def update(self, request, pk)
'''

class ProductViewSet(viewsets.GenericViewSet):
    queryset = Product.objects.all() 
    serializer_class = ProductSerializer

    # (O)GET /api/product/
    @csrf_exempt
    def list(self, request):
        products = Product.objects.all()
        serializer = self.get_serializer(products, many=True)
        data = serializer.data              # dictionary format not json yet
        return Response(data, status=200)   # json

    '''
    def list(self, request):       # for search function
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
    @csrf_exempt
    def retrieve(self, request, pk=None):
        product = self.get_object()
        return Response(self.get_serializer(product).data, status=200)

    # (O)PUT /api/product/{product_id}  
    @csrf_exempt
    def update(self, request, pk=None):
        product = self.get_object()
        data = request.data.copy()
        averageScoreData = data.pop("averageScore")

        # update, puts only the modifying field, partial true
        serializer = self.get_serializer(product, data={'averageScore': averageScoreData}, partial=True)
        # (O)bad request 400
        serializer.is_valid(raise_exception=True) # if False 400 response
        serializer.save()

        return Response(serializer.data, status=200)