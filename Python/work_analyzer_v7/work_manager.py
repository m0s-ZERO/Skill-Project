import os
import requests
import json
from datetime import datetime

from work import Work
from website import WebSite
from webapp import WebApp
from decorators import show_process
from pathlib import Path

class WorkManager:
    def __init__(self):
        self.works = [
            WebSite("m0s Hair", 50000, 4),
            WebSite("m0s MOVIE", 50000, 3),
            WebSite("m0s Table", 35000, 2),
            WebApp("Weather App", 20000, 100),
            WebApp("Idea Vault", 10000, 50)
        ]

        # データ保存用フォルダ
        self.data_folder = Path(__file__).parent / "data"

        # フォルダがなければ作成
        self.data_folder.mkdir(exist_ok=True)

    def show_data_folder(self):
        print("\n===== DATA FOLDER =====")
        print(f"保存先：{self.data_folder}")
        print(f"存在確認：{self.data_folder.exists()}")

    def show_environment(self):
        print("\n===== ENVIRONMENT INFO =====")

        # OS情報
        print(f"OS：{os.name}")

        # 現在の作業フォルダ
        print(f"作業フォルダ：{os.getcwd()}")

        # ユーザー情報
        print(f"ユーザー：{os.environ.get('USER')}")

        # データ保存先の存在確認
        print(f"保存先の存在確認：{os.path.exists(self.data_folder)}")

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

    @show_process
    def fetch_api_data(self):
        print("\n===== API DATA =====")

        url = "https://jsonplaceholder.typicode.com/posts"

        try:
            response = requests.get(url, timeout=10)

            # 通信エラーを確認
            response.raise_for_status()

            # JSONデータに変換
            posts = response.json()

            # 最初の5件を表示
            for post in posts[:5]:
                print(f"ID：{post['id']}")
                print(f"タイトル：{post['title']}")
                print("--------------------")
        except requests.exceptions.RequestException as error:
            print(f"API取得エラー：{error}")

    @show_process
    def save_api_data(self):
        print("\n===== SAVE API DATA =====")

        url = "https://jsonplaceholder.typicode.com/posts"

        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            posts = response.json()
            save_path = self.data_folder / "api_posts.json"

            with save_path.open("w", encoding="utf-8") as file:
                json.dump(posts[:5], file, ensure_ascii=False, indent=4)

            print(f"保存完了：{save_path}")
            print(f"保存件数：{len(posts[:5])}件")

        except requests.exceptions.RequestException as error:
            print(f"API取得エラー：{error}")

        except OSError as error:
            print(f"ファイル保存エラー：{error}")