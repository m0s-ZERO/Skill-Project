class Work:
    def __init__(self, title, price):
        self.title = title
        self._price = price

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("価格は0円以上にしてください")

        self._price = value

    def show_info(self):
        print(f"作品名：{self.title}")
        print(f"価格：{self.price}円")


work1 = Work("m0s Hair", 50000)

# Getter：価格を取得
print(work1.price)

# Setter：価格を変更
work1.price = 60000

work1.show_info()

# 不正な価格を設定
try:
    work1.price = -10000
except ValueError as error:
    print(error)