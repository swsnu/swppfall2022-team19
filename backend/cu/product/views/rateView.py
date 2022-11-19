from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.response import Response
import json
from user.models import User
from product.models.rateModel import Score, Rate
from product.models.productModel import Product
from product.serializers.rateSerializer import RateSerializer, newRateSerializer

'''
/api/rate/
def list(request) - rates

/api/rate/{rate_id}/
def retrieve(request,pk) - 특정 rate 가져오기
def update(request,pk) - rate 수정
def destroy(request,pk) - rate 삭제
'''

class RateViewSet(viewsets.GenericViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer

    # (O)GET /api/rate/
    @csrf_exempt
    def list(self, request):
        rates = Rate.objects.all()
        serializer = RateSerializer(rates, many=True)
        return Response(serializer.data, status=200) 


    # (O)POST /api/rate/ hmm without picture..
    @csrf_exempt
    def create(self, request):
        data = json.loads(request.body.decode())
        user_id = data['user_id']
        product_id = data['product_id']
        scores = data['scores'] # list
        comment = data['comment']
        picture = data['picture']

        user = User.objects.get(id=user_id)
        product = Product.objects.get(id=product_id)

        scores = Score.objects.create(score1=scores[0], score2=scores[1], score3=scores[2], score4=scores[3], score5=scores[4])
        scores.save()
        
        rate = Rate.objects.create(user=user, product=product, scores=scores,comment=comment, picture=picture)
        rate.save()

        score_list = [rate.scores.score1, rate.scores.score2, rate.scores.score3, rate.scores.score4, rate.scores.score5]
        res_rate = {
            'user_id': rate.user.id,
            'user_username': rate.user.username,
            'product_id': rate.product.id,
            'scores': score_list,
            'comment': rate.comment,
            'picture': str(rate.picture),
            'likedCount': rate.likedCount, #default 0
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
    @csrf_exempt
    def update(self, request, pk=None):
        try:
            rate = self.get_object()
        except Rate.DoesNotExist:
            return Response(status=404)
        
        data = json.loads(request.body.decode())
        updatedScores = data['scores'] # list
        updatedComment = data['comment']
        updatedPicture = data['picture']
        updatedLikedCount = data['likedCount']

        score = Score.objects.get(id=rate.scores.id)
        score.score1 = updatedScores[0]
        score.score2 = updatedScores[1]
        score.score3 = updatedScores[2]
        score.score4 = updatedScores[3]
        score.score5 = updatedScores[4]
        score.save()
        score_list = [rate.scores.score1, rate.scores.score2, rate.scores.score3, rate.scores.score4, rate.scores.score5]

        rate.comment = updatedComment
        rate.picture = updatedPicture
        rate.likedCount = updatedLikedCount
        rate.save()

        res_rate = {
            'user_id': rate.user.id,
            'user_username': rate.user.username,
            'product_id': rate.product.id,
            'scores': score_list,
            'comment': rate.comment,
            'picture': str(rate.picture),
            'likedCount': rate.likedCount
        }
        return JsonResponse(res_rate,status=200)
    

    # (O)DELETE /api/rate/{rate_id}/
    @csrf_exempt
    def destroy(self, request, pk=None):
        try:
            rate = self.get_object()
        except Rate.DoesNotExist:
            return Response(status=404)        
        else:
            rate.scores.delete()
            rate.delete()
            return Response(status=204)
