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

    # 親クラスのメソッドを上書き
    def show_info(self):
        print(f"【Web Site】")
        print(f"作品名：{self.title}")
        print(f"価格：{self.price}円")
        print(f"ページ数：{self.pages}ページ")


class WebApp(Work):
    def __init__(self, title, price, users):
        super().__init__(title, price)
        self.users = users

    # 親クラスのメソッドを上書き
    def show_info(self):
        print(f"【Web App】")
        print(f"作品名：{self.title}")
        print(f"価格：{self.price}円")
        print(f"利用者数：{self.users}人")


website = WebSite("m0s Hair", 50000, 3)
webapp = WebApp("Weather App", 20000, 100)

website.show_info()

print("----------------")

webapp.show_info()