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


    # (X)POST /api/rate/
    @csrf_exempt
    def create(self, request):
        data = request.data.copy()
        
        '''
        score_data = data.pop("scores")
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

        name = models.CharField(max_length = 300, blank=False, null=False)
        mainCategory = models.CharField(max_length = 100, blank=False, null=False)
        subCategory = models.CharField(max_length = 300, blank=False, null=False)
        imageUrl = models.URLField(blank = False, null=False)
        details = models.TextField(blank=False, null=False)
        price = models.IntegerField(blank = False, null=False)

        hw4 post article 
        req_data = json.loads(request.body.decode())
        title = req_data['title']
        content = req_data['content']
        article = Article(title=title, content=content, author=request.user)
        article.save()
        res_article = {'id': article.id, 'title': article.title, 'content': article.content, 'author': article.author.id}
        return JsonResponse(res_article,status=201)
            "id",
            "user_id",
            "username",
            "product_id",
            "scores",
            "comment",
            "picture",
            "likedCount",
        '''
        data = json.loads(request.body.decode())
        scores = data['scores']
        comment = data['comment']
        picture = data['picture']
        product = Product(name="상품명", mainCategory='간편식사', subCategory='도시락', imageUrl='https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809196616970.jpg', details='상세설명', price=5000)
        product.save()
        rate = Rate(user=request.user, product=product, scores=scores,comment=comment,picture=picture)
        rate.save()
        res_rate = {'id':rate.id, 'user_id':rate.user, 'username': rate.user.username, 'product_id': rate.product, 'scores': [rate.scores.score1, rate.scores.score2, rate.scores.score3, rate.scores.score4, rate.scores.score5], 'comment': rate.comment, 'picture': rate.picture}  
        #serializer = newRateSerializer(data=data)    # all to dic format
        #serializer.is_valid(raise_exception=True) # check before saving in db, if False 400 response
        #rate = serializer.save()
        #rate.save()

        #return Response(serializer.data, status=201) # newly posted
        return JsonResponse(res_rate, status=201)

    
    # (O)GET /api/rate/{rate_id}/
    def retrieve(self, request, pk=None):
        rate = self.get_object()
        return Response(self.get_serializer(rate).data, status=200)



    # (X)PUT /api/rate/{rate_id}/
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
