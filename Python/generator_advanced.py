works = [
    {"title": "m0s Hair", "price": 50000},
    {"title": "m0s MOVIE", "price": 50000},
    {"title": "m0s Table", "price": 35000},
    {"title": "Weather App", "price": 20000},
    {"title": "Idea Vault", "price": 10000}
]


def generate_works(data):
    for work in data:
        yield work


# ジェネレーターを作成
work_generator = generate_works(works)

# 作品を1件ずつ処理
for work in work_generator:
    print(f"作品名：{work['title']}")
    print(f"価格：{work['price']}円")
    print("--------------------")