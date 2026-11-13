from work import Work
from decorators import show_process


class WorkManager:
    def __init__(self):
        self.works = [
            Work("m0s Hair", "Web Site", 50000),
            Work("m0s MOVIE", "Web Site", 50000),
            Work("m0s Table", "Web Site", 35000),
            Work("Weather App", "Web App", 20000),
            Work("Idea Vault", "Web App", 10000)
        ]

    # ジェネレーター
    def generate_works(self):
        for work in self.works:
            yield work

    # 作品一覧
    @show_process
    def show_works(self):
        for work in self.generate_works():
            work.show_info()
            print("--------------------")

    # 作品追加
    @show_process
    def add_work(self, title, category, price):
        if category not in ("Web Site", "Web App"):
            raise ValueError("カテゴリが正しくありません")

        if price <= 0:
            raise ValueError("価格は0より大きい数値にしてください")

        work = Work(title, category, price)
        self.works.append(work)

        print(f"{title}を追加しました")

    # 作品検索
    @show_process
    def search_work(self, keyword):
        found = False

        for work in self.generate_works():
            if keyword.lower() in work.title.lower():
                work.show_info()
                found = True

        if not found:
            print("該当する作品はありません")

    # 合計金額
    @show_process
    def show_total(self):
        total = sum(work.price for work in self.generate_works())
        print(f"合計金額：{total}円")

    # 価格による作品の絞り込み
    @show_process
    def show_filtered_works(self):
        filtered_works = list(
            filter(
                lambda work: work.price >= 30000,
                self.works
            )
        )

        for work in filtered_works:
            work.show_info()
            print("--------------------")

    # 税込み価格の表示
    @show_process
    def show_tax_prices(self):
        tax_works = list(
            map(
                lambda work: {
                    "title": work.title,
                    "price": work.price,
                    "tax_price": round(work.price * 1.1)
                },
                self.works
            )
        )

        for work in tax_works:
            print(f"作品名：{work['title']}")
            print(f"税抜価格：{work['price']}円")
            print(f"税込価格：{work['tax_price']}円")
            print("--------------------")

    # 価格の高い順に並び替え
    @show_process
    def show_sorted_works(self):
        sorted_works = sorted(
            self.works,
            key=lambda work: work.price,
            reverse=True
        )

        for work in sorted_works:
            work.show_info()
            print("--------------------")