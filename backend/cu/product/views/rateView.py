from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.response import Response

from product.models.rateModel import Score, Rate
from product.models.productModel import Product
from product.serializers.rateSerializer import RateSerializer, newRateSerializer

'''
/api/rate/
def get(request) - rates

/api/rate/{rate_id}/
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


    # ()POST /api/rate/
    @csrf_exempt
    def create(self, request):
        data = request.data.copy()
        score_data = data.pop("scores")
        '''
        score_data = data.pop("scores", [])
        if not isinstance(score_data, list):
            return Response({"error": "scores should be list"}, status=400)
        '''
        '''
        scores = Score.objects.create(
            name = "score"
            score1=score_data[0],
            score2=score_data[1],
            score3=score_data[2],
            score4=score_data[3],
            score5=score_data[4],
        )

        user = models.ForeignKey(User, on_delete = models.CASCADE)
        product = models.ForeignKey(Product, on_delete = models.CASCADE)
        scores = models.ForeignKey(Score, on_delete=models.CASCADE)
        comment = models.TextField(blank=True, null=False)
        picture = models.ImageField(upload_to='%Y/%m/%d', blank=True)
        likedCount = models.IntegerField(default = 0)
        '''
        serializer = newRateSerializer(data=data)    # all to dic format
        serializer.is_valid(raise_exception=True) # check before saving in db, if False 400 response
        rate = serializer.save()
        rate.save()


        return Response(serializer.data, status=201) # newly posted

    
    # (O)GET /api/rate/{rate_id}/
    def retrieve(self, request, pk=None):
        rate = self.get_object()
        return Response(self.get_serializer(rate).data, status=200)



    # ()PUT /api/rate/{rate_id}/
    @csrf_exempt
    def update(self, request, pk=None):
        rate = Rate.get_object()
        data = request.data.copy #scores, comment, picture, likedCount
        scoresData = data.pop("scores")
        commentData = data.pop("comment")
        pictureData = data.pop("picture")
        likedCountData = data.pop("likedCount")

        serializer = self.get_queryset(rate, data={
            'scores': scoresData,
            'comment': commentData,
            'picture': pictureData,
            'likedCount': likedCountData,

            }, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)

    # (O)DELETE /api/rate/{rate_id}/
    @csrf_exempt
    def destroy(self, request, pk=None):
        try:
            rate = Rate.objects.get()
        except Rate.DoesNotExist:
            return Response(status=404)        
        rate.delete()
        return Response(status=204)
