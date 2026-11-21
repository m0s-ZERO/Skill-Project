import json
import requests

from pathlib import Path


class APIManager:
    def __init__(self):
        self.api_url = "https://jsonplaceholder.typicode.com/posts"
        self.save_path = Path(__file__).parent / "api_posts.json"
        self.posts = []

    def fetch_posts(self, user_id=1):
        params = {
            "userId": user_id
        }

        try:
            response = requests.get(
                self.api_url,
                params=params,
                timeout=10
            )

            response.raise_for_status()

            self.posts = response.json()

            print(f"{len(self.posts)}件のデータを取得しました！")

        except requests.RequestException as error:
            print("API取得エラー:", error)

    def show_posts(self):
        if not self.posts:
            print("表示できるデータがありません。")
            return

        for post in self.posts:
            print(f"{post['id']}: {post['title']}")

    def search_posts(self, keyword):
        results = [
            post for post in self.posts
            if keyword.lower() in post["title"].lower()
        ]

        if not results:
            print("該当するデータがありません。")
            return

        for post in results:
            print(f"{post['id']}: {post['title']}")

    def save_posts(self):
        with open(self.save_path, "w", encoding="utf-8") as file:
            json.dump(
                self.posts,
                file,
                ensure_ascii=False,
                indent=4
            )

        print("APIデータを保存しました！")

    def load_posts(self):
        if not self.save_path.exists():
            print("保存ファイルがありません。")
            return

        with open(self.save_path, "r", encoding="utf-8") as file:
            self.posts = json.load(file)

        print(f"{len(self.posts)}件のデータを読み込みました！")