from selenium import webdriver
from bs4 import BeautifulSoup as bs
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


import json


driver = webdriver.Chrome('/Users/jahyunyun/Downloads/chromedriver')
driver.implicitly_wait(3)

category_name = ["convenient", "snack", "icecream", "food", "drink"]
category_id = [1,3,4,5,6]
# category_id = [5]

index = 0
prod_list = []


for cIndex, i in enumerate(category_id):
    url_link = "http://cu.bgfretail.com/product/product.do?category=product&depth2=4&depth3={}".format(i)
    
    driver.get(url_link)
    
    wait = WebDriverWait(driver, 20)
    
    
    element = wait.until(EC.invisibility_of_element((By.CLASS_NAME, 'AjaxLoading')))
    driver.find_element(By.ID, 'setC').click()
    driver.implicitly_wait(10)

    html = driver.page_source
    # print(html)
    soup = bs(html, 'html.parser') 

    prod_itemAll = soup.find_all("a", "prod_item")



    for prod in prod_itemAll:
        new_tag = prod.find("span", "new")
        # print(new_tag)
        if new_tag is None: 
            continue

        prod_img = prod.find("img", class_ = "prod_img")

        prod_name = prod.find("div", "name").getText()
        prod_price = prod.find("div", "price").getText()
        prod_price = prod_price[:len(prod_price)-1].replace("," , "")

        prod_dictionary = {"ID": index, "CategoryID": cIndex, "Name": prod_name, "Img": "https:"+prod_img["src"], "Price": int(prod_price)}
        index = index + 1 
        prod_list.append(prod_dictionary)

    print(prod_list)

    
    
    
file_name = "/Users/jahyunyun/Desktop/2022-2/소프트웨어 개발의 원리와 실재/TeamRepo/swppfall2022-team19/Data/product_data.json"    

with open(file_name, "w") as outfile:
    json.dump(prod_list, outfile, ensure_ascii=False, indent=2)