# 作品データ
works = [
    {"title": "m0s Hair", "price": 50000},
    {"title": "m0s MOVIE", "price": 50000},
    {"title": "m0s Table", "price": 35000},
    {"title": "Weather App", "price": 20000},
    {"title": "Idea Vault", "price": 10000}
]


# STEP1：30,000円以上の作品を抽出
filtered_works = list(
    filter(lambda work: work["price"] >= 30000, works)
)


# STEP2：税込価格を追加
tax_works = list(
    map(
        lambda work: {
            **work,
            "tax_price": round(work["price"] * 1.1)
        },
        filtered_works
    )
)


# STEP3：税込価格の高い順に並び替え
sorted_works = sorted(
    tax_works,
    key=lambda work: work["tax_price"],
    reverse=True
)


# STEP4：結果を表示
for work in sorted_works:
    print(f"作品名：{work['title']}")
    print(f"税抜価格：{work['price']}円")
    print(f"税込価格：{work['tax_price']}円")
    print("--------------------")