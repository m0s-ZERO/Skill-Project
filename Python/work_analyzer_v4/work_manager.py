
from website import WebSite
from webapp import WebApp


class WorkManager:
    def __init__(self):
        self.works = [
            WebSite("m0s Hair", 50000, 3),
            WebSite("m0s MOVIE", 50000, 2),
            WebSite("m0s Table", 35000, 5),
            WebApp("Weather App", 20000, 100),
            WebApp("Idea Vault", 10000, 50)
        ]

    # 作品一覧
    def show_works(self):
        for work in self.works:
            work.show_info()
            print("----------------")

    # 作品追加
    def add_work(self, work):
        self.works.append(work)
        print(f"{work.title}を追加しました")

    # キーワード検索
    def search_work(self, keyword):
        results = [
            work for work in self.works
            if keyword.lower() in work.title.lower()
        ]

        if results:
            for work in results:
                work.show_info()
                print("----------------")
        else:
            print("該当する作品はありません")

    # 合計価格
    def show_total(self):
        total = sum(work.price for work in self.works)
        print(f"合計価格：{total:,}円")

    # カテゴリー別集計
    def show_categories(self):
        website_count = sum(
            1 for work in self.works
            if isinstance(work, WebSite)
        )

        webapp_count = sum(
            1 for work in self.works
            if isinstance(work, WebApp)
        )

        print(f"Web Site：{website_count}件")
        print(f"Web App：{webapp_count}件")
