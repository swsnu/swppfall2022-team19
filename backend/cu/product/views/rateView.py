
'''
/api/rate/
def list(request) - rates

/api/rate/{rate_id}/
def retrieve(request,pk) - 특정 rate 가져오기
def update(request,pk) - rate 수정
def destroy(request,pk) - rate 삭제

/api/rate/user/
def list(request) - rates, by a specific user

/api/rate/liked/ - rates, liked by a specific user

'''

from django.utils import timezone
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
import json
from user.models import User
from product.models.rateModel import Rate, Like
from product.models.productModel import Product
from product.serializers.rateSerializer import RateSerializer
from product.models.rateModel import Like

class RateViewSet(viewsets.GenericViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer

    # (O)GET /api/rate/
    def list(self, request):
        user_id = request.GET.get("user_id")
        if user_id is None:
            rates = Rate.objects.all()
        else:
            rates = (
                Rate.objects.filter(user_id=user_id))
        serializer = RateSerializer(rates, many=True)
        return Response(serializer.data, status=200)

    # (O)POST /api/rate/
    def create(self, request):
        post = Rate()
        user_id = request.POST['user_id']
        product_id = request.POST['product_id']

        user = User.objects.get(id=int(user_id))
        product = Product.objects.get(id=int(product_id))
        post.user = user
        post.product = product
        post.scores = request.POST['scores']
        post.averageScore = round((int(post.scores[0]) + int(post.scores[1])  + int(post.scores[2])  + int(post.scores[3])  + int(post.scores[4]) )/5,2)
        post.comment = request.POST['comment']
        if 'picture' in request.FILES:
            post.picture = request.FILES['picture']
        post.save()
        print("post created time:" + str(post.created_at))

        #update product's average score & increase rateCount by 1
        product.averageScore = round(((product.rateCount * product.averageScore) + post.averageScore)/(product.rateCount + 1),2)
        product.rateCount += 1
        product.save()
        res_rate = {
            'user_id': post.user.id,
            'username': post.user.username,
            'product_id': post.product.id,
            'scores': post.scores,
            'comment': post.comment,
            'picture': str(post.picture),
            'likedCount': post.likedCount,  # default 0
            'created_at': post.created_at,
        }
        return JsonResponse(res_rate, status=201)

    # (O)GET /api/rate/{rate_id}/
    def retrieve(self, request, pk=None):
        try:
            rate = self.get_object()
        except Rate.DoesNotExist:
            return Response(status=404)
        return Response(self.get_serializer(rate).data, status=200)


    # (O)PUT /api/rate/{rate_id}/
    def update(self, request, pk=None):
        try:
            rate_id = request.POST.get('id')
            rate = Rate.objects.get(id= rate_id)
        except Rate.DoesNotExist:
            return Response(status=404)
        
        #update product averageScore
        product_id = request.POST.get('product_id')
        product = Product.objects.get(id=int(product_id))
        newScores = request.POST.get('scores')
        newScore = round((int(newScores[0]) + int(newScores[1])  + int(newScores[2])  + int(newScores[3])  + int(newScores[4]) ) / 5, 2)
        product.averageScore = round(((product.rateCount * product.averageScore) - rate.averageScore + newScore) / (product.rateCount), 2)
        product.save()

        # check current user
        user = request.user

        # store all the previous attributes
        previous_scores = rate.scores
        previous_comment = rate.comment
        previous_picture = rate.picture
        previous_like_count = rate.likedCount
        
        # update infos
        rate.scores = request.POST['scores']
        rate.averageScore = newScore
        rate.comment = request.POST['comment']
        if 'picture' in request.FILES:   #if file is uploaded, change rate.picture to updated picture
            rate.picture = request.FILES['picture']
        elif 'picture' in request.POST:  #if string is uploaded, it means rate.picture stays the same. 
            rate.picture
        else:
            rate.picture = None
        rate.likedCount = request.POST['likedCount']
        rate.save()

        # store all the after attributes
        after_scores = rate.scores
        after_comment = rate.comment
        after_picture = rate.picture
        after_like_count = rate.likedCount
        print("after comment: " + rate.comment)

        # Create Like Object
        if int(previous_like_count)<int(after_like_count):    # if liked -> create Object
            like = Like.objects.create(user = user, rate=rate)
            like.save()
        elif int(previous_like_count)>int(after_like_count) : # if disliked -> delete object
            delete_like = Like.objects.filter(user = user) & Like.objects.filter(rate = rate)
            delete_like.delete()
        else:                                                 # no change in 'likes' just rate edit -> updated 'created_at'(meaning last edit time)
            if previous_scores!=after_scores or previous_comment!=after_comment or previous_picture!=after_picture:
                rate.created_at = timezone.now()                                           
                rate.save() # final .save() for time change

        print("rate update at: "+str(rate.created_at))
        print("updated comment:" + rate.comment)

        res_rate = {
            'user_id': rate.user.id,
            'username': rate.user.username,
            'product_id': rate.product.id,
            'scores': rate.scores,
            'comment': rate.comment,
            'picture': str(rate.picture),
            'likedCount': rate.likedCount,
            'created_at': rate.created_at,
        }
        return JsonResponse(res_rate,status=200)

    # (O)DELETE /api/rate/{rate_id}/
    def destroy(self, request, pk=None):
        try:
            rate = self.get_object()
        except Rate.DoesNotExist:
            return Response(status=404)
        else:
            product_id = rate.product.id
            #request.POST.get('product_id')
            product = Product.objects.get(id=int(product_id))
            if(product.rateCount == 1):
                product.averageScore = 0
            else:
                product.averageScore = round(((product.rateCount * product.averageScore) - rate.averageScore)/(product.rateCount - 1), 2)
            product.rateCount -= 1
            product.save()
            rate.delete()
            
            return Response(status=204)

    # GET /api/rate/user/
    @action(detail=False, methods=["GET"])
    def user(self, request):
        user_id = request.GET.get("user_id")
        rates = (
            Rate.objects.filter(user_id=user_id)
        )
        serializer = RateSerializer(rates, many=True)
        return Response(serializer.data, status=200)

    # GET /api/rate/liked/
    @action(detail=False, methods=["GET"])
    def liked(self, request):
        user_id = request.GET.get("user_id")
        
        likes = (
            Like.objects.filter(user_id=user_id)
        )
        rates=[]

        for i in likes:
            rates.append(i.rate)

        serializer = RateSerializer(rates, many=True)
        return Response(serializer.data, status=200)
