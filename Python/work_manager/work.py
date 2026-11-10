# work.py

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