
from work import Work


class WebSite(Work):
    def __init__(self, title, price, pages):
        super().__init__(title, price)
        self.pages = pages

    # show_infoをオーバーライド
    def show_info(self):
        print("【Web Site】")
        print(f"作品名：{self.title}")
        print(f"価格：{self.price}円")
        print(f"ページ数：{self.pages}ページ")
        print(f"消費税：{self.calculate_tax()}円")
