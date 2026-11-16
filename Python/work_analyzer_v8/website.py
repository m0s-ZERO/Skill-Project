from work import Work


class WebSite(Work):
    def __init__(self, title, price, pages):
        super().__init__(title, "Web Site", price)
        self.pages = pages

    def show_info(self):
        super().show_info()
        print(f"ページ数：{self.pages}")
