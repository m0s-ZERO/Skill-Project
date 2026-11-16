
import sqlite3

# データベースに接続
connection = sqlite3.connect("works.db")

# カーソルを作成
cursor = connection.cursor()

# 作品データを登録
cursor.execute(
    "INSERT INTO works (title, category, price) VALUES (?, ?, ?)",
    ("m0s Hair", "Web Site", 50000)
)

# 変更を保存
connection.commit()

# 作品データを更新
cursor.execute(
    "UPDATE works SET price = ? WHERE id = ?",
    (60000, 1)
)

connection.commit()

print("作品データを更新しました")

# 作品データを削除
cursor.execute(
    "DELETE FROM works WHERE id = ?",
    (1,)
)

connection.commit()

print("作品データを削除しました")

# 価格が30000円以上の作品を検索
cursor.execute(
    "SELECT * FROM works WHERE price >= ?",
    (30000,)
)

works = cursor.fetchall()

print("\n===== 価格30000円以上 =====")

for work in works:
    print(work)


# 価格が高い順に並び替え
cursor.execute(
    "SELECT * FROM works ORDER BY price DESC"
)

works = cursor.fetchall()

print("\n===== 価格の高い順 =====")

# 取得したデータを表示
for work in works:
    print(work)

# 接続を終了
connection.close()
