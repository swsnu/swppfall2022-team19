from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.response import Response
from product.models.rateModel import Score, Rate
from product.models.productModel import Product
from product.serializers.rateSerializer import RateSerializer

'''
/api/rate/
def get(request) - rate

/api/rate/{rate_id}/
def update(request,pk) - rate 수정
def destroy(request,pk) - rate 삭제
'''

class RateViewSet(viewsets.GenericViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer

    # GET /api/rate/
    @csrf_exempt
    def list(self, request):
        data = request.data.copy()
        id = data.pop("id")
        product = Product.object.get(id=id)
        rate = Rate.object.filter(product=product)

        serializer = self.get_queryset(rate, many=True)
        data = serializer.data
        return Response(data, status=200) # successful

    # POST /api/rate/
    @csrf_exempt
    def create(self, request):
        data = request.data.copy()
        score_data = data.pop("scores", [])
        if not isinstance(score_data, list):
            return Response(
                {"error": "scores should be list"}, status=400)
        
        serializer = RateSerializer(data=data)    # all to dic format
        serializer.is_valid(raise_exception=True) # check before saving in db, if False 400 response
        rate = serializer.save()
        rate.save()
        '''
        score = Score.objects.create(
            score1=score_data[0],
            score1=score_data[0],
            score1=score_data[0],
            score1=score_data[0],
            score1=score_data[0],
        )
        ''' 
        return Response(serializer.data, status=201) # newly posted

    # PUT /api/rate/{rate_id}/
    @csrf_exempt
    def update(self, request, pk=None):
        rate = Rate.get_object(id=pk)
        data = request.data.copy #scores, comment, picture, likedCount, like
        scoresData = data.pop("scores")
        commentData = data.pop("comment")
        pictureData = data.pop("picture")
        likedCountData = data.pop("likedCount")
        likeData= data.pop("like")

        serializer = self.get_queryset(rate, data={
            'scores': scoresData,
            'comment': commentData,
            'picture': pictureData,
            'likedCount': likedCountData,
            'likeData': likeData,
            }, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=200)

    # DELETE /api/rate/{rate_id}/
    @csrf_exempt
    def destroy(self, request, pk=None):
        rate = Rate.objects.get(id=pk)
        rate.delete()
        return Response(status=204)
