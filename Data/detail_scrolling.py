# --------------- TODO --------------- 
# {"CategoryID": cIndex, "Name": prod_name, "Img": "https:"+prod_img["src"], "Price": int(prod_price), "Tag": tags, "Explanation": prod_exp}

import csv
import time

from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait



category_class = ["prodInfo_01", "prodInfo_03", "prodInfo_04", "prodInfo_05", "prodInfo_06"]
category_id = [1,3,4,5,6]

index = 0
prod_list = []

driver = webdriver.Chrome('/Users/jahyunyun/Downloads/chromedriver')

url_link = "http://cu.bgfretail.com/product/product.do?category=product&depth2=4&depth3=1"

wait = WebDriverWait(driver, 40)


# for index, i in enumerate(category_class):
i = category_class[3] # fix 


    
driver.get(url_link)

if i == "prodInfo_04":
    sub_class = ["eventInfo_02"]
else :
    # sub_class = ["eventInfo_02"]
    sub_class = ["eventInfo_02", "eventInfo_03", "eventInfo_04"]

time.sleep(10)

category = driver.find_element(By.CLASS_NAME, i).text

driver.find_element_by_xpath("//*[@id=\"contents\"]/div[1]/ul/li[{}]".format(category_id[3])).click() #fix

time.sleep(4)
driver.refresh()

print(category)
time.sleep(10)

for sub in sub_class:
    time.sleep(4)
    

    subCategory = driver.find_element(By.CLASS_NAME, sub).text
    print(subCategory)
    # //*[@id="einfo"]/li[2]/a

    driver.find_element(By.CLASS_NAME, sub).click()
    
    # time.sleep(2)
    # element = wait.until(EC.invisibility_of_element((By.CLASS_NAME, 'AjaxLoading')))
    # driver.find_element(By.ID, 'setC').click()
    time.sleep(25)
    
    
    products = driver.find_elements(By.CLASS_NAME, "prod_wrap")

    countNum = 0

    time.sleep(2)

    while(True): # within same category, get only 6 products
        print("coutNum", countNum)
        p = products[countNum]
        if countNum == 6: 
            break
        time.sleep(5)

        p.click()
        time.sleep(2)


        html = driver.page_source
    # print(html)
        soup = bs(html, 'html.parser') 

        prod = soup.find("div", "prodDetail")
        # print("prod", prod)
        
        # tag = prod.find("span", "tag")
        # # print("tag", tag)

        # if tag:        
        #     # print(tag)

        time.sleep(2)

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
        

        url_link = "http://cu.bgfretail.com/product/product.do?category=product&depth2=4&depth3=1"
        
        driver.get(url_link)

        time.sleep(2)


        driver.find_element_by_xpath("//*[@id=\"contents\"]/div[1]/ul/li[{}]".format(category_id[3])).click() #fix
        time.sleep(2)

        driver.refresh()

    
        

        # element = wait.until(EC.visibility_of(subCategory))
        print("sub", sub)
        element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, sub)))

        try:
            time.sleep(2)
            sub_cat = driver.find_element(By.CLASS_NAME, sub)
            action = ActionChains(driver)

            action.move_to_element(sub_cat).click().perform()
        except:
            try:
                # driver.refresh()
                time.sleep(3)
                driver.find_element(By.CLASS_NAME, sub).click()
            except:
                # driver.refresh()
                time.sleep(3)
                driver.find_element(By.CLASS_NAME, sub).click()

        # driver.find_element(By.ID, 'setC').click()
        time.sleep(25)
        products = driver.find_elements(By.CLASS_NAME, "prod_wrap")
        time.sleep(4)

        

    
file_name = "/Users/jahyunyun/Desktop/2022-2/소프트웨어 개발의 원리와 실재/TeamRepo/swppfall2022-team19/Data/product_data.csv"    

fieldName = ["name", "mainCategory", "subCategory", "imageUrl", "details", "price", "newProduct", "tags", "averageScore"]

with open(file_name, "a") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames = fieldName)
    # writer.writeheader()
    writer.writerows(prod_list)
    # json.dump(prod_list, outfile, ensure_ascii=False, indent=2)

print("FINISH")