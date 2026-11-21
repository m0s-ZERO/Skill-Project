import requests
import json
from pathlib import Path

url = "https://jsonplaceholder.typicode.com/posts"

params = {
    "userId": 1
}

response = requests.get(url, params=params, timeout=10)
response.raise_for_status()

data = response.json()

# タイトルだけ抽出
titles = [post["title"] for post in data]

print("タイトル一覧")
for title in titles:
    print(title)

# タイトルに特定の文字が含まれる投稿を抽出
filtered_posts = [
    post for post in data
    if "qui" in post["title"]
]

print("\n「qui」を含む投稿")
for post in filtered_posts:
    print(post["id"], post["title"])

# 投稿IDの合計
total_ids = sum(post["id"] for post in data)

print("\n投稿IDの合計:", total_ids)

# 保存先
output_path = Path(__file__).parent / "api_posts.json"

# JSONファイルに保存
with open(output_path, "w", encoding="utf-8") as file:
    json.dump(
        data,
        file,
        ensure_ascii=False,
        indent=4
    )

print("\nJSON保存完了！")
print("保存先:", output_path)

# JSONファイルを読み込む
with open(output_path, "r", encoding="utf-8") as file:
    saved_data = json.load(file)

print("\n保存データの確認")
print("取得件数:", len(saved_data))
print("最初のタイトル:", saved_data[0]["title"])