from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.http.response import HttpResponseNotAllowed
from django.forms.models import model_to_dict
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json.decoder import JSONDecodeError
from .models import Product, Rate

#path('<string: mainCategory>/all/'    , views.getProductByMainCategory, name='product_by_main_category'),
#path('<int: id>/'                     , views.product, name = "product"),
#path('<int: id>/rate/'                , views.rateCreate, name='rateCreate'),
#path('<int: id>/rates/'               , views.rateFetch, name='rateFetch'),
#path('rate/<int: id>/'                , views.rateUpdateDelete, name='rateUpdateDelete),

# api/product/:mainCategory/all/  -> GET
# api/product/{id}/               -> GET PUT(avgScore) // id==productID
# api/product/{id}/rate/          -> POST(rate)        // id==productID
# api/product/{id}/rates/         -> GET(rates)        // id==productID
# api/product/rate/{id}/          -> PUT DELETE        // id==rateID

# 순서는 거꾸로 작성됨. rate func > product func > getProductBy...func
# should likeCount change be in the views.rate_PUT?


# api/product/rate/{id}/  
@ensure_csrf_cookie
def rateUpdateDelete(request, id):  # rateID
    if request.method == 'PUT':
        try:
            body = request.body.decode()
            rate_scores = json.loads(body)['scores']
            rate_comment = json.loads(body)['comment']
            rate_picture = json.loads(body)['picture']
            rate_likeCount = json.loads(body)['likeCount']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        # only him/herself can delete one's rate.
        # if rate.user == request.user:

        rate = Rate.objects.get(id=id) #should be unique
        rate.scores = rate_scores
        rate.comment = rate_comment
        rate.picture = rate_picture
        rate.likedCount = rate_likeCount
        rate.save()
        response_dict = {
            "id": rate.id, 
            "user" : request.user.id, # OR rate.user.id
            "product" : rate.product,
            "scores" : rate.scores,
            "comment" : rate.comment,
            "picture": rate.picture,
            "likedCount" : rate.likedCount,
            "liked" : rate.liked, 
        }
        return JsonResponse(response_dict, status=200)

    elif request.method == 'DELETE':
        rate = Rate.objects.get(id=id) #should be unique

        # only him/herself can delete one's rate.
        # if rate.user == request.user:
        rate.delete()
        return HttpResponse(status=200)
        #else:
        #    return HttpResponse(status=403)
    else:
        return HttpResponseNotAllowed(['PUT','DELETE'])
        

# api/product/{id}/rates/  
def rateFetch(request, id):  # id == productID
    if request.method == 'GET':
        product = Product.objects.get(id=id)
        rates = Rate.objects.filter(product=product)
        res = [model_to_dict(i) for i in rates]
        return JsonResponse(res, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

# api/product/{id}/rate/
def rateCreate(request, id): # id == productID
    if request.method == 'POST':
        try:
            body = request.body.decode()
            rate_scores = json.loads(body)['scores']
            rate_comment = json.loads(body)['comment']
            rate_picture = json.loads(body)['picture']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        
        product = Product.objects.get(id=id)
        rate = Rate(user=request.user, product=product, scores=rate_scores, comment=rate_comment, picture=rate_picture)
        rate.save()
        response_dict = {
            "id": rate.id, 
            "user" : rate.user.id,
            "product" : rate.product,
            "scores" : rate.scores,
            "comment" : rate.comment,
            "picture": rate.picture,
            "likedCount" : rate.likedCount, #default=0
            "liked" : rate.liked,           #default=False
        }
        return JsonResponse(response_dict, status=200)
        

# api/product/{id}/ 
@ensure_csrf_cookie
def product(request, id): # id == productID
    if request.method == 'GET':
        product = Product.objects.get(id=id)
        return JsonResponse({
            "id": product.id, 
            "name": product.name, 
            "mainCategory": product.mainCategory,
            "subCategory": product.subCategory,
            "imageUrl": product.imageUrl,
            "details": product.details,
            "price": product.price,
            "newProduct": product.newProduct,
            "tags": product.tags,
            "averageScore": product.avergaeScore,
        })

    # avgScore change
    elif request.method == 'PUT': 
        try:
            body = request.body.decode()
            product_averageScore = json.loads(body)['averageScore']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        product = Product.objects.get(id=id)
        product.averageScore = product_averageScore
        product.save()
        response_dict = {
            "id": product.id, 
            "name": product.name, 
            "mainCategory": product.mainCategory,
            "subCategory": product.subCategory,
            "imageUrl": product.imageUrl,
            "details": product.details,
            "price": product.price,
            "newProduct": product.newProduct,
            "tags": product.tags,
            "averageScore": product.averageScore,
        }
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


# api/product/:mainCategory/all/ 
@ensure_csrf_cookie
def getProductByMainCategory(request, mainCategory): #mainCategory parameter: string
    if request.method == "GET":
        list = Product.objects.filter(mainCategoty=mainCategory)
        res = [model_to_dict(i) for i in list]
        return JsonResponse(res, safe=False)

    else: 
        return HttpResponseNotAllowed(["GET"])
