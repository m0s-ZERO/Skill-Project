import json

# 作品データ
works = [
    {"title": "m0s Hair", "category": "Web Site", "price": 50000},
    {"title": "m0s MOVIE", "category": "Web Site", "price": 50000},
    {"title": "m0s Table", "category": "Web Site", "price": 35000},
    {"title": "Weather App", "category": "Web App", "price": 20000},
    {"title": "Idea Vault", "category": "Web App", "price": 10000}
]

# JSONに保存
with open("works.json", "w", encoding="utf-8") as file:
    json.dump(works, file, ensure_ascii=False, indent=4)

print("JSONファイルを保存しました")

# JSONを読み込む
with open("works.json", "r", encoding="utf-8") as file:
    loaded_works = json.load(file)

# 読み込んだデータを表示
print("\n【作品一覧】")

for work in loaded_works:
    print(
        f'{work["title"]} | '
        f'{work["category"]} | '
        f'{work["price"]:,}円'
    )

# 合計金額
total = sum(work["price"] for work in loaded_works)

print(f"\n合計金額：{total:,}円")