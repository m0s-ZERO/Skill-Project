# class_basic.py

class Work:

    def __init__(self, title, category, price):
        self.title = title
        self.category = category
        self.price = price

    def show_info(self):
        print(f"作品名：{self.title}")
        print(f"カテゴリー：{self.category}")
        print(f"価格：{self.price:,}円")

    def calculate_tax(self):
        return self.price * 0.1


works = [
    Work("m0s Hair", "Web Site", 50000),
    Work("m0s MOVIE", "Web Site", 50000),
    Work("m0s Table", "Web Site", 35000),
    Work("Weather App", "Web App", 20000),
    Work("Idea Vault", "Web App", 10000)
]


for work in works:
    work.show_info()
    print(f"消費税：{work.calculate_tax():,.0f}円")
    print("--------------------")