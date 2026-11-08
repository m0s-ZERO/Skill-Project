# 作品データ
works = [
    {"title": "m0s Hair", "category": "Web Site", "price": 50000},
    {"title": "m0s MOVIE", "category": "Web Site", "price": 50000},
    {"title": "m0s Table", "category": "Web Site", "price": 35000},
    {"title": "Weather App", "category": "Web App", "price": 20000},
    {"title": "Idea Vault", "category": "Web App", "price": 10000}
]

# 固定カテゴリー
categories = ("Web Site", "Web App", "LP")

def show_works():
    print("\n【作品一覧】")

    for work in works:
        print(
            f'{work["title"]} | '
            f'{work["category"]} | '
            f'{work["price"]:,}円'
        )

def filter_works(min_price):
    filtered = [
        work
        for work in works
        if work["price"] >= min_price
    ]

    print(f"\n【{min_price:,}円以上の作品】")

    if not filtered:
        print("該当する作品はありません")
        return

    for work in filtered:
        print(work["title"], work["price"], "円")

def analyze_categories():
    print("\n【カテゴリー別分析】")

    for category in categories:

        category_works = [
            work
            for work in works
            if work["category"] == category
        ]

        total = sum(
            work["price"]
            for work in category_works
        )

        print(
            f"{category}: "
            f"{len(category_works)}作品 / "
            f"{total:,}円"
        )

def calculate_average(*prices):
    if len(prices) == 0:
        return 0

    return sum(prices) / len(prices)


def show_average():
    prices = [
        work["price"]
        for work in works
    ]

    average = calculate_average(*prices)

    print("\n【平均価格】")
    print(f"{average:,.0f}円")

def search_work(keyword):
    found = [
        work
        for work in works
        if keyword.lower() in work["title"].lower()
    ]

    print("\n【検索結果】")

    if not found:
        print("作品が見つかりませんでした")
        return

    for work in found:
        print(work["title"], work["price"], "円")

def main():
    while True:
        print("\n===== Python Work Analyzer =====")
        print("1. 作品一覧")
        print("2. 価格条件で抽出")
        print("3. カテゴリー別分析")
        print("4. 平均価格")
        print("5. 作品検索")
        print("6. 終了")

        choice = input("番号を選択してください：")

        if choice == "1":
            show_works()

        elif choice == "2":
            try:
                min_price = int(input("最低価格："))

                if min_price < 0:
                    print("0以上の価格を入力してください")
                else:
                    filter_works(min_price)

            except ValueError:
                print("数字を入力してください")

        elif choice == "3":
            analyze_categories()

        elif choice == "4":
            show_average()

        elif choice == "5":
            keyword = input("作品名：")
            search_work(keyword)

        elif choice == "6":
            print("プログラムを終了します")
            break

        else:
            print("1〜6の番号を入力してください")


if __name__ == "__main__":
    main()