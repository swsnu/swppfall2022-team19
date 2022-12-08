# --------------- TODO --------------- 
# {"CategoryID": cIndex, "Name": prod_name, "Img": "https:"+prod_img["src"], "Price": int(prod_price), "Tag": tags, "Explanation": prod_exp}

import csv
import time

from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


category_class = ["prodInfo_01", "prodInfo_03", "prodInfo_04", "prodInfo_05", "prodInfo_06"]
category_id = [1,3,4,5,6]

prod_list = []

driver = webdriver.Chrome('/Users/jahyunyun/Downloads/chromedriver')

url_link = "http://cu.bgfretail.com/product/product.do?category=product&depth2=4&depth3=1"

wait = WebDriverWait(driver, 40)

for index, i in enumerate(category_class):
        
    driver.get(url_link)

    if i == "prodInfo_04":
        sub_class = ["eventInfo_02"]
    else :
        sub_class = ["eventInfo_02", "eventInfo_03", "eventInfo_04"]

    category = driver.find_element(By.CLASS_NAME, i).text

    driver.find_element_by_xpath("//*[@id=\"contents\"]/div[1]/ul/li[{}]".format(category_id[3])).click() #fix


    print(category)

    for sub in sub_class:
        time.sleep(4)
        

        subCategory = driver.find_element(By.CLASS_NAME, sub).text
        print(subCategory)


        driver.find_element(By.CLASS_NAME, sub).click()
        
        
        products = driver.find_elements(By.CLASS_NAME, "prod_wrap")

        countNum = 0


        while(True): # within same category, get only 6 products
            print("coutNum", countNum)
            p = products[countNum]
            if countNum == 6: 
                break

            p.click()
            html = driver.page_source
        
            soup = bs(html, 'html.parser') 

            prod = soup.find("div", "prodDetail")

            prod_img = prod.find("img")        
            prod_name = prod.find("p", "tit").getText()
            prod_price = prod.find("dd", "prodPrice").getText()
            prod_price = prod_price[1:len(prod_price)-2].replace("," , "")
            
            prod_tags = prod.find_all("li")
            
            liList = []
            for i in prod_tags:
                tagInfo = i.getText()
                liList.append(tagInfo)

            
            newProduct = False
            if countNum < 3 :
                newProduct = True
            else:
                newProduct = False

            prod_dictionary = {
                "name": prod_name, "mainCategory": category,
                "subCategory": subCategory, "imageUrl": "https:"+prod_img["src"], 
                "details": liList[0], "price": int(prod_price), "newProduct": newProduct, "tags": liList[1:len(liList)], "averageScore": 0}

            prod_list.append(prod_dictionary)
            countNum = countNum + 1 # get only 6 elements in each sub category 
            print(prod_dictionary)
            

            url_link = "http://cu.bgfretail.com/product/product.do?category=product&depth2=4&depth3"
            
            driver.get(url_link)
            driver.find_element_by_xpath("//*[@id=\"contents\"]/div[1]/ul/li[{}]".format(category_id[3])).click() #fix


            print("sub", sub)
            element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, sub)))

            sub_cat = driver.find_element(By.CLASS_NAME, sub)
            action = ActionChains(driver)

            action.move_to_element(sub_cat).click().perform()

            driver.find_element(By.CLASS_NAME, sub).click()

            products = driver.find_elements(By.CLASS_NAME, "prod_wrap")

        

    
file_name = "./product_data.csv"    

fieldName = ["name", "mainCategory", "subCategory", "imageUrl", "details", "price", "newProduct", "tags", "averageScore"]

with open(file_name, "a") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames = fieldName)
    # writer.writeheader()
    writer.writerows(prod_list)


print("FINISH")



