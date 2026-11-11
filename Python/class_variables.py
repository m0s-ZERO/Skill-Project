class Work:
    # クラス変数
    tax_rate = 0.1

    def __init__(self, title, price):
        # インスタンス変数
        self.title = title
        self.price = price

    def show_info(self):
        tax = self.price * Work.tax_rate
        print(f"作品名：{self.title}")
        print(f"価格：{self.price}円")
        print(f"消費税：{tax}円")


work1 = Work("m0s Hair", 50000)
work2 = Work("Weather App", 20000)

work1.show_info()
print("----------------")
work2.show_info()