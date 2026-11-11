class Work:
    def __init__(self, title, price):
        self.title = title
        self.price = price

    def show_info(self):
        print(f"作品名：{self.title}")
        print(f"価格：{self.price}円")


class WebSite(Work):
    def __init__(self, title, price, pages):
        super().__init__(title, price)
        self.pages = pages


class WebApp(Work):
    def __init__(self, title, price, users):
        super().__init__(title, price)
        self.users = users


website = WebSite("m0s Hair", 50000, 3)
webapp = WebApp("Weather App", 20000, 100)

website.show_info()
print(f"ページ数：{website.pages}ページ")

print("----------------")

webapp.show_info()
print(f"利用者数：{webapp.users}人")