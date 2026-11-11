class Work:
    # クラス変数
    tax_rate = 0.1

    def __init__(self, title, price):
        self.title = title
        self._price = price

    # Getter
    @property
    def price(self):
        return self._price

    # Setter
    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("価格は0円以上にしてください")

        self._price = value

    # 作品情報の表示
    def show_info(self):
        print(f"作品名：{self.title}")
        print(f"価格：{self.price}円")

    # 消費税の計算
    def calculate_tax(self):
        return self.price * Work.tax_rate
