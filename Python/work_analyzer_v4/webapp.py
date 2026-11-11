
from work import Work


class WebApp(Work):
    def __init__(self, title, price, users):
        super().__init__(title, price)
        self.users = users

    # show_infoをオーバーライド
    def show_info(self):
        print("【Web App】")
        print(f"作品名：{self.title}")
        print(f"価格：{self.price}円")
        print(f"利用者数：{self.users}人")
        print(f"消費税：{self.calculate_tax()}円")
