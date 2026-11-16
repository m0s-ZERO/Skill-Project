
import sqlite3
from pathlib import Path


class WorkManager:
    def __init__(self):
        self.db_path = Path(__file__).parent / "works.db"
        self.connection = sqlite3.connect(self.db_path)

        # 外部キー制約を有効にする
        self.connection.execute("PRAGMA foreign_keys = ON")

        self.create_tables()
        self.initialize_data()

    def create_tables(self):
        # カテゴリーテーブル
        self.connection.execute("""
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            )
        """)

        # 作品テーブル
        self.connection.execute("""
            CREATE TABLE IF NOT EXISTS works (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                category_id INTEGER NOT NULL,
                price INTEGER NOT NULL,
                FOREIGN KEY (category_id)
                    REFERENCES categories(id)
            )
        """)

        self.connection.commit()


    def initialize_data(self):
        cursor = self.connection.cursor()

        # カテゴリーの登録
        cursor.execute("SELECT COUNT(*) FROM categories")
        category_count = cursor.fetchone()[0]

        if category_count == 0:
            categories = [
                ("Web Site",),
                ("Web App",)
            ]

            cursor.executemany(
                "INSERT INTO categories (name) VALUES (?)",
                categories
            )

        self.connection.commit()

        # 作品の登録
        cursor.execute("SELECT COUNT(*) FROM works")
        work_count = cursor.fetchone()[0]

        if work_count == 0:
            works = [
                ("m0s Hair", 1, 50000),
                ("m0s MOVIE", 1, 50000),
                ("m0s Table", 1, 35000),
                ("Weather App", 2, 20000),
                ("Idea Vault", 2, 10000)
            ]

            cursor.executemany(
                """
                INSERT INTO works (title, category_id, price)
                VALUES (?, ?, ?)
                """,
                works
            )

        self.connection.commit()


    def show_works(self):
        cursor = self.connection.cursor()

        cursor.execute("""
            SELECT
                works.id,
                works.title,
                categories.name,
                works.price
            FROM works
            INNER JOIN categories
            ON works.category_id = categories.id
            ORDER BY works.id ASC
        """)

        works = cursor.fetchall()

        print("\n===== WORK LIST =====")

        for work in works:
            print(
                f"ID：{work[0]} | "
                f"作品名：{work[1]} | "
                f"カテゴリー：{work[2]} | "
                f"価格：{work[3]:,}円"
            )


    def show_category_summary(self):
        cursor = self.connection.cursor()

        cursor.execute("""
            SELECT
                categories.name,
                COUNT(works.id),
                SUM(works.price)
            FROM categories
            INNER JOIN works
            ON categories.id = works.category_id
            GROUP BY categories.id, categories.name
        """)

        summaries = cursor.fetchall()

        print("\n===== CATEGORY SUMMARY =====")

        for summary in summaries:
            print(
                f"カテゴリー：{summary[0]} | "
                f"作品数：{summary[1]}件 | "
                f"合計価格：{summary[2]:,}円"
            )


    def show_price_analysis(self):
        cursor = self.connection.cursor()

        cursor.execute("""
            SELECT
                AVG(price),
                MAX(price),
                MIN(price),
                COUNT(*),
                SUM(price)
            FROM works
        """)

        result = cursor.fetchone()

        average_price = result[0]
        max_price = result[1]
        min_price = result[2]
        work_count = result[3]
        total_price = result[4]

        print("\n===== PRICE ANALYSIS =====")
        print(f"作品数：{work_count}件")
        print(f"合計価格：{total_price:,}円")
        print(f"平均価格：{average_price:,.0f}円")
        print(f"最高価格：{max_price:,}円")
        print(f"最低価格：{min_price:,}円")


    def update_work(self, work_id, new_price):
        if new_price <= 0:
            raise ValueError("価格は0より大きくしてください")

        try:
            cursor = self.connection.cursor()

            cursor.execute(
                """
                UPDATE works
                SET price = ?
                WHERE id = ?
                """,
                (new_price, work_id)
            )

            if cursor.rowcount == 0:
                raise ValueError("該当する作品がありません")

            self.connection.commit()

            print("作品価格を更新しました")

        except Exception:
            self.connection.rollback()
            raise


    def close(self):
        self.connection.close()
