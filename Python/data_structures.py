# 固定カテゴリー
categories = ("Web Site", "Web App", "LP")

# 作品データ
works = [
    {
        "title": "m0s Hair",
        "category": "Web Site",
        "price": 50000
    },
    {
        "title": "m0s MOVIE",
        "category": "Web Site",
        "price": 50000
    },
    {
        "title": "m0s Table",
        "category": "Web Site",
        "price": 35000
    },
    {
        "title": "Weather App",
        "category": "Web App",
        "price": 20000
    },
    {
        "title": "Idea Vault",
        "category": "Web App",
        "price": 10000
    }
]

def show_works():
    print("\n【作品一覧】")

    for work in works:
        print(
            work["title"],
            "|",
            work["category"],
            "|",
            work["price"],
            "円"
        )


def add_work():
    title = input("作品名：")
    category = input("カテゴリー（Web Site / Web App / LP）：")

    if category not in categories:
        print("カテゴリーが正しくありません")
        return

    try:
        price = int(input("価格："))

        if price < 0:
            print("価格は0以上で入力してください")
            return

    except ValueError:
        print("価格は数字で入力してください")
        return

    new_work = {
        "title": title,
        "category": category,
        "price": price
    }

    works.append(new_work)

    print("作品を追加しました！")


def search_work():
    keyword = input("検索する作品名：")

    found = False

    for work in works:
        if keyword.lower() in work["title"].lower():
            print(work["title"], "-", work["price"], "円")
            found = True

    if not found:
        print("作品が見つかりませんでした")

def show_total():
    total = 0

    for work in works:
        total += work["price"]

    print("\n作品の合計金額:", total, "円")

def show_categories():
    used_categories = set()

    for work in works:
        used_categories.add(work["category"])

    print("\n【使用カテゴリー】")

    for category in sorted(used_categories):
        print(category)

def main():
    while True:
        print("\n===== Python Work Manager =====")
        print("1. 作品一覧")
        print("2. 作品追加")
        print("3. 作品検索")
        print("4. 合計金額")
        print("5. カテゴリー一覧")
        print("6. 終了")

        choice = input("番号を選択してください：")

        if choice == "1":
            show_works()

        elif choice == "2":
            add_work()

        elif choice == "3":
            search_work()

        elif choice == "4":
            show_total()

        elif choice == "5":
            show_categories()

        elif choice == "6":
            print("プログラムを終了します")
            break

        else:
            print("1〜6の番号を入力してください")


if __name__ == "__main__":
    main()