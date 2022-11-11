import requests

urls = []

for num, i in enumerate(urls):

    img_url = urls

    save_path = "./Product_img/"

    down_img = requests.get(img_url)

    with open(save_path, "wb") as photo: 
        photo.write(down_img.content)