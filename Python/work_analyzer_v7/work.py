from datetime import datetime


class Work:
    def __init__(self, title, category, price):
        self.title = title
        self.category = category
        self.price = price

        # 作品の登録日時
        self.registered_at = datetime.now()

    def show_info(self):
        print(f"作品名：{self.title}")
        print(f"カテゴリー：{self.category}")
        print(f"価格：{self.price:,}円")
        print(
            f"登録日時：{self.registered_at.strftime('%Y/%m/%d %H:%M')}"
        )
