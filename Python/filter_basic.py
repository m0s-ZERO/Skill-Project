works = [
    {"title": "m0s Hair", "price": 50000},
    {"title": "m0s MOVIE", "price": 50000},
    {"title": "m0s Table", "price": 35000},
    {"title": "Weather App", "price": 20000},
    {"title": "Idea Vault", "price": 10000}
]


# 30,000円以上の作品を抽出
expensive_works = list(
    filter(lambda work: work["price"] >= 30000, works)
)


for work in expensive_works:
    print(f"作品名：{work['title']}")
    print(f"価格：{work['price']}円")
    print("--------------------")