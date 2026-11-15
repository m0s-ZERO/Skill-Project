
from work import Work


class WebApp(Work):
    def __init__(self, title, price, users):
        super().__init__(title, "Web App", price)
        self.users = users

    def show_info(self):
        super().show_info()
        print(f"ユーザー数：{self.users}")
