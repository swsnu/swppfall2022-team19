# BY Jahyun
# 각 메인 카테고리의 sub 카테고리별 신제품 3개, 구제품 3개, 
# 아이스크림 카테고리를 제외한 나머지 메인 카테고리의 sub 카테고리의 갯수는 3개이다.
# 총 5개의 메인 카테고리 
# 4 * 3 * 6 + 6 = 78개 데이터

import csv
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cu.settings')
django.setup()

from product.models.productModel import Product,Tag



with open("./product_data.csv") as in_file:
    data_reader = csv.reader(in_file)
    next(data_reader, None)
    for row in data_reader:
        print(row)
        if len(row) == 0 : continue

        product = Product.objects.create(

            name = row[0],
            mainCategory = row[1], 
            subCategory = row[2],
            imageUrl = row[3],
            details = row[4],
            price = row[5],
            newProduct = row[6],            
            averageScore = row[7], 
        )
        i = 8
        while i < len(row):

            try:
                tag = Tag.objects.get(name=row[i])
            except:
                tag = Tag.objects.create(name=row[i])
            product.tags.add(tag)
            i = i + 1


