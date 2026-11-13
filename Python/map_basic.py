works = [
    {"title": "m0s Hair", "price": 50000},
    {"title": "m0s MOVIE", "price": 50000},
    {"title": "m0s Table", "price": 35000},
    {"title": "Weather App", "price": 20000},
    {"title": "Idea Vault", "price": 10000}
]


# 作品価格を税込価格に変換
tax_prices = list(
    map(lambda work: work["price"] * 1.1, works)
)


for price in tax_prices:
    print(f"税込価格：{price}円")