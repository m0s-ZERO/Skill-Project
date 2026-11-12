def show_works():
    yield "m0s Hair"
    yield "m0s MOVIE"
    yield "Weather App"


# ジェネレーターを作成
work_generator = show_works()

# 1つずつ取り出す
print(next(work_generator))
print(next(work_generator))
print(next(work_generator))