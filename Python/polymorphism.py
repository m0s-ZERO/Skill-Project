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

    def show_info(self):
        print("【Web Site】")
        print(f"作品名：{self.title}")
        print(f"価格：{self.price}円")
        print(f"ページ数：{self.pages}ページ")


class WebApp(Work):
    def __init__(self, title, price, users):
        super().__init__(title, price)
        self.users = users

    def show_info(self):
        print("【Web App】")
        print(f"作品名：{self.title}")
        print(f"価格：{self.price}円")
        print(f"利用者数：{self.users}人")


# オブジェクトを作成
works = [
    WebSite("m0s Hair", 50000, 3),
    WebSite("m0s MOVIE", 50000, 2),
    WebApp("Weather App", 20000, 100),
    WebApp("Idea Vault", 10000, 50)
]

# 同じメソッドで全作品を表示
for work in works:
    work.show_info()
    print("----------------")