class Work:
    def __init__(self, title, category, price):
        self.title = title
        self.category = category
        self.price = price

    def show_info(self):
        print(f"作品名：{self.title}")
        print(f"カテゴリ：{self.category}")
        print(f"価格：{self.price}円")