import sqlite3
from pathlib import Path


class WorkManager:
    def __init__(self):
        self.db_path = Path(__file__).parent / "works.db"
        self.create_tables()
        self.initialize_data()

    def connect_db(self):
        connection = sqlite3.connect(self.db_path)
        connection.row_factory = sqlite3.Row
        return connection

    def create_tables(self):
        connection = self.connect_db()

        try:
            connection.execute("PRAGMA foreign_keys = ON")

            connection.execute("""
                CREATE TABLE IF NOT EXISTS categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL UNIQUE
                )
            """)

            connection.execute("""
                CREATE TABLE IF NOT EXISTS works (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    category_id INTEGER NOT NULL,
                    price INTEGER NOT NULL,
                    FOREIGN KEY (category_id)
                        REFERENCES categories(id)
                )
            """)

            connection.commit()

        finally:
            connection.close()

    def initialize_data(self):
        connection = self.connect_db()

        try:
            cursor = connection.cursor()

            cursor.execute("SELECT COUNT(*) FROM categories")

            if cursor.fetchone()[0] == 0:
                categories = [
                    ("Web Site",),
                    ("Web App",)
                ]

                cursor.executemany(
                    "INSERT INTO categories (name) VALUES (?)",
                    categories
                )

            connection.commit()

            cursor.execute("SELECT COUNT(*) FROM works")

            if cursor.fetchone()[0] == 0:
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

            connection.commit()

        finally:
            connection.close()

    
    def search_works(
        self,
        keyword=None,
        category=None,
        min_price=None,
        max_price=None
    ):
        connection = self.connect_db()

        try:
            conditions = []
            values = []

            if keyword:
                conditions.append("works.title LIKE ?")
                values.append(f"%{keyword}%")

            if category:
                conditions.append("categories.name = ?")
                values.append(category)

            if min_price is not None:
                conditions.append("works.price >= ?")
                values.append(min_price)

            if max_price is not None:
                conditions.append("works.price <= ?")
                values.append(max_price)

            sql = """
                SELECT
                    works.id,
                    works.title,
                    categories.name AS category,
                    works.price
                FROM works
                INNER JOIN categories
                ON works.category_id = categories.id
            """

            if conditions:
                sql += " WHERE " + " AND ".join(conditions)

            sql += " ORDER BY works.id ASC"

            cursor = connection.cursor()
            cursor.execute(sql, values)
            works = cursor.fetchall()

            print("\n===== SEARCH RESULT =====")

            for work in works:
                print(
                    f"ID：{work['id']} | "
                    f"作品名：{work['title']} | "
                    f"カテゴリー：{work['category']} | "
                    f"価格：{work['price']:,}円"
                )

            if not works:
                print("該当する作品はありません")

        finally:
            connection.close()

    def get_works_page(self, page=1, limit=3):
        if page < 1:
            raise ValueError("ページ番号は1以上にしてください")

        if limit < 1:
            raise ValueError("取得件数は1以上にしてください")

        offset = (page - 1) * limit

        connection = self.connect_db()

        try:
            cursor = connection.cursor()

            cursor.execute(
                """
                SELECT
                    works.id,
                    works.title,
                    categories.name AS category,
                    works.price
                FROM works
                INNER JOIN categories
                ON works.category_id = categories.id
                ORDER BY works.id ASC
                LIMIT ? OFFSET ?
                """,
                (limit, offset)
            )

            works = cursor.fetchall()

            print(f"\n===== WORK LIST｜PAGE {page} =====")

            for work in works:
                print(
                    f"ID：{work['id']} | "
                    f"作品名：{work['title']} | "
                    f"カテゴリー：{work['category']} | "
                    f"価格：{work['price']:,}円"
                )

            if not works:
                print("表示する作品がありません")

        finally:
            connection.close()

    def add_work(self, title, category, price):
        connection = self.connect_db()

        try:
            if price <= 0:
                raise ValueError("価格は0より大きくしてください")

            cursor = connection.cursor()

            cursor.execute(
                "SELECT id FROM categories WHERE name = ?",
                (category,)
            )

            category_data = cursor.fetchone()

            if category_data is None:
                raise ValueError("カテゴリーが正しくありません")

            cursor.execute(
                """
                INSERT INTO works (title, category_id, price)
                VALUES (?, ?, ?)
                """,
                (title, category_data["id"], price)
            )

            connection.commit()
            print("作品を登録しました")

        except Exception:
            connection.rollback()
            raise

        finally:
            connection.close()

    def add_work(self, title, category, price):
        connection = self.connect_db()

        try:
            if price <= 0:
                raise ValueError("価格は0より大きくしてください")

            cursor = connection.cursor()

            cursor.execute(
                "SELECT id FROM categories WHERE name = ?",
                (category,)
            )

            category_data = cursor.fetchone()

            if category_data is None:
                raise ValueError("カテゴリーが正しくありません")

            cursor.execute(
                """
                INSERT INTO works (title, category_id, price)
                VALUES (?, ?, ?)
                """,
                (title, category_data["id"], price)
            )

            connection.commit()
            print("作品を登録しました")

        except Exception:
            connection.rollback()
            raise

        finally:
            connection.close()

    def update_work(self, work_id, new_price):
        connection = self.connect_db()

        try:
            if new_price <= 0:
                raise ValueError("価格は0より大きくしてください")

            cursor = connection.cursor()

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

            connection.commit()
            print("作品価格を更新しました")

        except Exception:
            connection.rollback()
            raise

        finally:
            connection.close()

    def delete_work(self, work_id):
        connection = self.connect_db()

        try:
            cursor = connection.cursor()

            cursor.execute(
                "DELETE FROM works WHERE id = ?",
                (work_id,)
            )

            if cursor.rowcount == 0:
                raise ValueError("該当する作品がありません")

            connection.commit()
            print("作品を削除しました")

        except Exception:
            connection.rollback()
            raise

        finally:
            connection.close()