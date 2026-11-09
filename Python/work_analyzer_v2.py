import csv
import json
import os

# 作品データ
works = [
    {"title": "m0s Hair", "category": "Web Site", "price": 50000},
    {"title": "m0s MOVIE", "category": "Web Site", "price": 50000},
    {"title": "m0s Table", "category": "Web Site", "price": 35000},
    {"title": "Weather App", "category": "Web App", "price": 20000},
    {"title": "Idea Vault", "category": "Web App", "price": 10000}
]

# 作品一覧
def show_works():
    print("\n【作品一覧】")

    for work in works:
        print(
            f'{work["title"]} | '
            f'{work["category"]} | '
            f'{work["price"]:,}円'
        )

# 作品追加
def add_work():
    title = input("作品名：")
    category = input("カテゴリー（Web Site / Web App）：")

    try:
        price = int(input("価格："))

        if price < 0:
            print("0以上の価格を入力してください")
            return

    except ValueError:
        print("価格は数字で入力してください")
        return

    if not title.strip():
        print("作品名を入力してください")
        return

    if category not in ("Web Site", "Web App"):
        print("カテゴリーが正しくありません")
        return

    works.append({
        "title": title,
        "category": category,
        "price": price
    })

    print("作品を追加しました")

# 作品検索
def search_work():
    keyword = input("検索キーワード：").lower()

    found = [
        work for work in works
        if keyword in work["title"].lower()
    ]

    print("\n【検索結果】")

    if not found:
        print("該当する作品はありません")
        return

    for work in found:
        print(work["title"], work["price"], "円")

# CSV保存
def save_csv():
    with open(
        "works.csv",
        "w",
        newline="",
        encoding="utf-8-sig"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=["title", "category", "price"]
        )

        writer.writeheader()
        writer.writerows(works)

    print("CSVに保存しました")

# CSV読み込み
def load_csv():
    global works

    if not os.path.exists("works.csv"):
        print("CSVファイルがありません")
        return

    with open(
        "works.csv",
        "r",
        encoding="utf-8-sig"
    ) as file:

        reader = csv.DictReader(file)

        loaded_works = []

        for work in reader:
            try:
                price = int(work["price"])

                if (
                    not work["title"].strip()
                    or work["category"] not in ("Web Site", "Web App")
                    or price < 0
                ):
                    print("不正なデータをスキップしました")
                    continue

                loaded_works.append({
                    "title": work["title"],
                    "category": work["category"],
                    "price": price
                })

            except (ValueError, TypeError, AttributeError):
                print("不正なデータをスキップしました")

    works = loaded_works
    print("CSVから読み込みました")

# JSON保存
def save_json():
    with open("works.json", "w", encoding="utf-8") as file:
        json.dump(
            works,
            file,
            ensure_ascii=False,
            indent=4
        )

    print("JSONに保存しました")

# JSON読み込み
def load_json():
    global works

    if not os.path.exists("works.json"):
        print("JSONファイルがありません")
        return

    try:
        with open("works.json", "r", encoding="utf-8") as file:
            loaded_works = json.load(file)

        if not isinstance(loaded_works, list):
            print("データ形式が正しくありません")
            return

        valid_works = []

        for work in loaded_works:
            if not isinstance(work, dict):
                continue

            title = work.get("title")
            category = work.get("category")
            price = work.get("price")

            if (
                not isinstance(title, str)
                or not title.strip()
                or category not in ("Web Site", "Web App")
                or isinstance(price, bool)
                or not isinstance(price, (int, float))
                or price < 0
            ):
                continue

            valid_works.append({
                "title": title,
                "category": category,
                "price": price
            })

        works = valid_works
        print("JSONから読み込みました")

    except (json.JSONDecodeError, OSError):
        print("JSONファイルを読み込めませんでした")

# メインメニュー
def main():
    while True:
        print("\n===== Python Work Analyzer Ver.2.0 =====")
        print("1. 作品一覧")
        print("2. 作品追加")
        print("3. 作品検索")
        print("4. CSV保存")
        print("5. CSV読み込み")
        print("6. JSON保存")
        print("7. JSON読み込み")
        print("8. 終了")

        choice = input("番号を選択してください：")

        if choice == "1":
            show_works()

        elif choice == "2":
            add_work()

        elif choice == "3":
            search_work()

        elif choice == "4":
            save_csv()

        elif choice == "5":
            load_csv()

        elif choice == "6":
            save_json()

        elif choice == "7":
            load_json()

        elif choice == "8":
            print("プログラムを終了します")
            break

        else:
            print("1〜8の番号を入力してください")

if __name__ == "__main__":
    main()