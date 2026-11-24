import json
import logging
import requests
import shutil

from pathlib import Path


class AutomationManager:

    def __init__(self):
        self.api_url = "https://jsonplaceholder.typicode.com/posts"

        self.data_path = Path(__file__).parent / "automation_posts.json"
        self.backup_path = Path(__file__).parent / "automation_posts_backup.json"
        self.log_path = Path(__file__).parent / "automation.log"

        logging.basicConfig(
            filename=self.log_path,
            level=logging.INFO,
            format="%(asctime)s - %(levelname)s - %(message)s",
            encoding="utf-8"
        )

    def fetch_api_data(self):
        try:
            response = requests.get(
                self.api_url,
                timeout=10
            )

            response.raise_for_status()

            data = response.json()

            logging.info("APIデータ取得成功")
            return data

        except requests.exceptions.Timeout:
            logging.error("タイムアウト")
        except requests.exceptions.HTTPError as error:
            logging.error("HTTPエラー: %s", error)
        except requests.exceptions.RequestException as error:
            logging.error("通信エラー: %s", error)
        except ValueError:
            logging.error("JSON解析エラー")

        return None

    def load_existing_data(self):
        if not self.data_path.exists():
            return []

        try:
            with open(self.data_path, "r", encoding="utf-8") as file:
                return json.load(file)

        except (json.JSONDecodeError, OSError) as error:
            logging.error("既存データ読み込みエラー: %s", error)
            return None

    def detect_new_posts(self, old_data, new_data):
        old_ids = {post["id"] for post in old_data}

        new_posts = [
            post for post in new_data
            if post["id"] not in old_ids
        ]

        return new_posts

    def backup_data(self):
        if self.data_path.exists():
            shutil.copy2(
                self.data_path,
                self.backup_path
            )

            logging.info("バックアップ完了")

    def save_data(self, data):
        with open(self.data_path, "w", encoding="utf-8") as file:
            json.dump(
                data,
                file,
                ensure_ascii=False,
                indent=4
            )

        logging.info("JSON保存完了")

    def run_automation(self):
        print("自動処理を開始します。")

        old_data = self.load_existing_data()

        if old_data is None:
            print("既存データを読み込めませんでした。")
            return

        new_data = self.fetch_api_data()

        if new_data is None:
            print("APIデータの取得に失敗しました。")
            return

        new_posts = self.detect_new_posts(
            old_data,
            new_data
        )

        self.backup_data()
        self.save_data(new_data)

        print("自動処理完了！")
        print("取得データ数:", len(new_data))
        print("新規データ数:", len(new_posts))

        logging.info(
            "自動処理完了：取得%d件、新規%d件",
            len(new_data),
            len(new_posts)
        )

        for post in new_posts:
            print(
                f"新規投稿ID: {post['id']} "
                f"タイトル: {post['title']}"
            )