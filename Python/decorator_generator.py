# 作品データ
works = [
    {"title": "m0s Hair", "price": 50000},
    {"title": "m0s MOVIE", "price": 50000},
    {"title": "m0s Table", "price": 35000},
    {"title": "Weather App", "price": 20000},
    {"title": "Idea Vault", "price": 10000}
]


# デコレーター
def show_process(func):
    def wrapper(*args, **kwargs):
        print("===== 処理開始 =====")

        result = func(*args, **kwargs)

        print("===== 処理終了 =====")
        return result

    return wrapper


# ジェネレーター
def generate_works(data):
    for work in data:
        yield work


# 作品表示関数
@show_process
def show_works(data):
    for work in generate_works(data):
        print(f"作品名：{work['title']}")
        print(f"価格：{work['price']}円")
        print("--------------------")


# 実行
show_works(works)