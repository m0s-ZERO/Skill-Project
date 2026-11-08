# 作品データ
works = [
    {"title": "m0s Hair", "category": "Web Site", "price": 50000},
    {"title": "m0s MOVIE", "category": "Web Site", "price": 50000},
    {"title": "m0s Table", "category": "Web Site", "price": 35000},
    {"title": "Weather App", "category": "Web App", "price": 20000},
    {"title": "Idea Vault", "category": "Web App", "price": 10000}
]
def calculate_discount(price, rate):
    discount = price * rate / 100
    return price - discount


result = calculate_discount(50000, 10)

print("\n【割引後の価格】")
print(result, "円")



def calculate_average(*prices):
    if len(prices) == 0:
        return 0

    return sum(prices) / len(prices)


average = calculate_average(
    50000,
    50000,
    35000,
    20000,
    10000
)

print("\n【平均価格】")
print(average, "円")

def show_work(**work):
    print("\n【作品情報】")

    for key, value in work.items():
        print(key, ":", value)


show_work(
    title="m0s Hair",
    category="Web Site",
    price=50000
)