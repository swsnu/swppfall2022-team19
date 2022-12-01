from datetime import timezone, datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
import json
from user.models import User
from product.models.rateModel import Rate
from product.models.productModel import Product
from product.serializers.rateSerializer import RateSerializer

'''
/api/rate/
def list(request) - rates

/api/rate/{rate_id}/
def retrieve(request,pk) - 특정 rate 가져오기
def update(request,pk) - rate 수정
def destroy(request,pk) - rate 삭제

/api/rate/{user_id}/?
def list(request) - rates, a by specific user

'''
class RateViewSet(viewsets.GenericViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer

    # (O)GET /api/rate/

    def list(self, request):
        user_id=request.GET.get("user_id")
        if user_id is None:
            rates = Rate.objects.all()
        else: 
            rates = (
            Rate.objects.filter(user_id=user_id))
        serializer = RateSerializer(rates, many=True)
        return Response(serializer.data, status=200) 


    # (O)POST /api/rate/ hmm without picture..

    def create(self, request):
        post = Rate()
        user_id = request.POST['user_id']
        product_id = request.POST['product_id']
        
        user = User.objects.get(id=int(user_id))
        product = Product.objects.get(id=int(product_id)) 
        post.user = user
        post.product = product
        post.scores = request.POST['scores']
        post.comment = request.POST['comment']
        if 'picture' in request.FILES:
            post.picture = request.FILES['picture']
        else:
            post.picture = False
        post.save()

        res_rate = {
            'user_id': post.user.id,
            'username': post.user.username,
            'product_id': post.product.id,
            'scores': post.scores,
            'comment': post.comment,
            'picture': str(post.picture),
            'likedCount': post.likedCount, #default 0
        }
        return JsonResponse(res_rate,status=201)
    


    # (O)GET /api/rate/{rate_id}/ hmm without picture..

    def retrieve(self, request, pk=None):
        try:
            rate = self.get_object()
        except Rate.DoesNotExist:
            return Response(status=404)
        return Response(self.get_serializer(rate).data, status=200)

    # (O)PUT /api/rate/{rate_id}/

    def update(self, request, pk=None):
        try:
            rate = self.get_object()
        except Rate.DoesNotExist:
            return Response(status=404)
        
        data = json.loads(request.body.decode())
        updatedScores = data['scores'] # string
        updatedComment = data['comment']
        updatedPicture = data['picture']
        updatedLikedCount = data['likedCount']

        rate.scores = updatedScores
        rate.comment = updatedComment
        rate.picture = updatedPicture
        rate.likedCount = updatedLikedCount
        rate.save()

        res_rate = {
            'user_id': rate.user.id,
            'username': rate.user.username,
            'product_id': rate.product.id,
            'scores': rate.scores,
            'comment': rate.comment,
            'picture': str(rate.picture),
            'likedCount': rate.likedCount
        }
        return JsonResponse(res_rate,status=200)
    

    # (O)DELETE /api/rate/{rate_id}/

    def destroy(self, request, pk=None):
        try:
            rate = self.get_object()
        except Rate.DoesNotExist:
            return Response(status=404)        
        else:
            rate.delete()
            return Response(status=204)

    
    


    # GET /api/rate/user/
    @action(detail=False, methods=["GET"])
    def user(self, request):

        user_id=request.GET.get("user_id")
        rates = (
            Rate.objects.filter(user_id=user_id)
        )
        serializer = RateSerializer(rates,many=True)
        return Response(serializer.data, status=200)

        # GET /api/rate/user/
    @action(detail=False, methods=["GET"])
    def user(self, request):

        user_id=request.GET.get("user_id")
        rates = (
            Rate.objects.filter(user_id=user_id)
        )
        serializer = RateSerializer(rates,many=True)
        return Response(serializer.data, status=200)