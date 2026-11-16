import sqlite3

from pathlib import Path
from work import Work
from website import WebSite
from webapp import WebApp
from decorators import show_process

class WorkManager:
    def __init__(self):
        # データベースの保存先
        self.db_path = Path(__file__).parent / "works.db"

        # データベースに接続
        self.connection = sqlite3.connect(self.db_path)

        # テーブルを作成
        self.connection.execute("""
            CREATE TABLE IF NOT EXISTS works (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                price INTEGER NOT NULL
            )
        """)

        self.connection.commit()

        # 初期データを登録
        self.initialize_data()

    def initialize_data(self):
        cursor = self.connection.cursor()

        cursor.execute("SELECT COUNT(*) FROM works")
        count = cursor.fetchone()[0]

        if count == 0:
            works = [
                ("m0s Hair", "Web Site", 50000),
                ("m0s MOVIE", "Web Site", 50000),
                ("m0s Table", "Web Site", 35000),
                ("Weather App", "Web App", 20000),
                ("Idea Vault", "Web App", 10000)
            ]

            cursor.executemany(
                "INSERT INTO works (title, category, price) VALUES (?, ?, ?)",
                works
            )

            self.connection.commit()

    @show_process
    def show_works(self):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM works")

        works = cursor.fetchall()

        print("\n===== WORK LIST =====")

        for work in works:
            print(
                f"ID：{work[0]} | "
                f"作品名：{work[1]} | "
                f"カテゴリー：{work[2]} | "
                f"価格：{work[3]:,}円"
            )

    @show_process
    def add_work(self, title, category, price):
        if category not in ("Web Site", "Web App"):
            raise ValueError("カテゴリーが正しくありません")

        if price <= 0:
            raise ValueError("価格は0より大きくしてください")

        self.connection.execute(
            "INSERT INTO works (title, category, price) VALUES (?, ?, ?)",
            (title, category, price)
        )

        self.connection.commit()
        print("作品を登録しました")

    @show_process
    def search_work(self, keyword):
        cursor = self.connection.cursor()

        cursor.execute(
            "SELECT * FROM works WHERE title LIKE ?",
            (f"%{keyword}%",)
        )

        works = cursor.fetchall()

        print("\n===== SEARCH RESULT =====")

        for work in works:
            print(work)

        if not works:
            print("該当する作品はありません")

    @show_process
    def show_total(self):
        cursor = self.connection.cursor()

        cursor.execute("SELECT SUM(price) FROM works")
        total = cursor.fetchone()[0] or 0

        print(f"合計金額：{total:,}円")

    @show_process
    def update_work(self, work_id, new_price):
        if new_price <= 0:
            raise ValueError("価格は0より大きくしてください")

        cursor = self.connection.cursor()

        cursor.execute(
            "UPDATE works SET price = ? WHERE id = ?",
            (new_price, work_id)
        )

        self.connection.commit()

        if cursor.rowcount == 0:
            print("該当する作品がありません")
        else:
            print("作品情報を更新しました")

    @show_process
    def delete_work(self, work_id):
        cursor = self.connection.cursor()

        cursor.execute(
            "DELETE FROM works WHERE id = ?",
            (work_id,)
        )

        self.connection.commit()

        if cursor.rowcount == 0:
            print("該当する作品がありません")
        else:
            print("作品を削除しました")

    @show_process
    def show_filtered_works(self):
        cursor = self.connection.cursor()

        cursor.execute(
            "SELECT * FROM works WHERE price >= ?",
            (30000,)
        )

        works = cursor.fetchall()

        for work in works:
            print(work)

    @show_process
    def show_sorted_works(self):
        cursor = self.connection.cursor()

        cursor.execute(
            "SELECT * FROM works ORDER BY price DESC"
        )

        works = cursor.fetchall()

        for work in works:
            print(work)

    def close(self):
        self.connection.close()
