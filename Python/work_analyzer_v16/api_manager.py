import json
import requests

from pathlib import Path


class APIManager:
    def __init__(self):
        self.users_url = "https://jsonplaceholder.typicode.com/users"
        self.posts_url = "https://jsonplaceholder.typicode.com/posts"

        self.save_path = Path(__file__).parent / "api_integrated.json"

        self.integrated_data = []

    def fetch_api_data(self, url):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()

        except requests.exceptions.Timeout:
            print("タイムアウトしました。")

        except requests.exceptions.HTTPError as error:
            print("HTTPエラー:", error)

        except requests.exceptions.RequestException as error:
            print("通信エラー:", error)

        except ValueError:
            print("JSON解析エラーが発生しました。")

        return None

    def fetch_and_integrate(self):
        users = self.fetch_api_data(self.users_url)
        posts = self.fetch_api_data(self.posts_url)

        if users is None or posts is None:
            print("データを取得できませんでした。")
            return

        self.integrated_data = []

        for user in users:
            user_posts = [
                post for post in posts
                if post["userId"] == user["id"]
            ]

            self.integrated_data.append({
                "user_id": user["id"],
                "user_name": user["name"],
                "email": user["email"],
                "post_count": len(user_posts),
                "posts": [
                    {
                        "title": post["title"],
                        "body": post["body"]
                    }
                    for post in user_posts
                ]
            })

        print("APIデータの統合が完了しました！")

    def show_users(self):
        if not self.integrated_data:
            print("データがありません。")
            return

        for user in self.integrated_data:
            print(
                f"{user['user_id']}. "
                f"{user['user_name']} "
                f"投稿数: {user['post_count']}"
            )

    def search_users(self, keyword):
        results = [
            user for user in self.integrated_data
            if keyword.lower() in user["user_name"].lower()
        ]

        if not results:
            print("該当するユーザーがいません。")
            return

        for user in results:
            print(
                f"{user['user_name']} "
                f"投稿数: {user['post_count']}"
            )

    def show_total_posts(self):
        total = sum(
            user["post_count"]
            for user in self.integrated_data
        )

        print("ユーザー数:", len(self.integrated_data))
        print("投稿総数:", total)

    def save_data(self):
        with open(self.save_path, "w", encoding="utf-8") as file:
            json.dump(
                self.integrated_data,
                file,
                ensure_ascii=False,
                indent=4
            )

        print("JSON保存完了！")

    def load_data(self):
        if not self.save_path.exists():
            print("保存ファイルがありません。")
            return

        with open(self.save_path, "r", encoding="utf-8") as file:
            self.integrated_data = json.load(file)

        print("JSON読み込み完了！")