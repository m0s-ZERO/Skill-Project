# work_manager.py

from work import Work


class WorkManager:

    def __init__(self):
        self.works = [
            Work("m0s Hair", "Web Site", 50000),
            Work("m0s MOVIE", "Web Site", 50000),
            Work("m0s Table", "Web Site", 35000),
            Work("Weather App", "Web App", 20000),
            Work("Idea Vault", "Web App", 10000)
        ]

    def show_works(self):
        print("\n===== WORK LIST =====")

        for work in self.works:
            work.show_info()
            print("--------------------")

    def add_work(self, title, category, price):
        if category not in ("Web Site", "Web App"):
            raise ValueError("カテゴリーが正しくありません")

        if price <= 0:
            raise ValueError("価格は0より大きい値にしてください")

        work = Work(title, category, price)
        self.works.append(work)

        print("作品を追加しました")

    def search_work(self, keyword):
        print("\n===== SEARCH RESULT =====")

        found = False

        for work in self.works:
            if keyword.lower() in work.title.lower():
                work.show_info()
                found = True

        if not found:
            print("該当する作品はありません")

    def show_total(self):
        total = sum(work.price for work in self.works)
        print(f"合計金額：{total:,}円")

    def show_categories(self):
        print("\n===== CATEGORY ANALYSIS =====")

        categories = ("Web Site", "Web App")

        for category in categories:
            count = sum(
                1 for work in self.works
                if work.category == category
            )

            print(f"{category}：{count}件")