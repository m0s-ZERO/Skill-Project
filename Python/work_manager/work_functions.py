# work_functions.py

from work_data import works, categories


def show_works():
    print("\n===== WORK LIST =====")

    for work in works:
        print(
            f"{work['title']} | "
            f"{work['category']} | "
            f"{work['price']:,}円"
        )


def search_work(keyword):
    print("\n===== SEARCH RESULT =====")

    for work in works:
        if keyword.lower() in work["title"].lower():
            print(work["title"])


def show_total():
    total = sum(work["price"] for work in works)
    print(f"合計金額：{total:,}円")


def show_categories():
    print("\n===== CATEGORIES =====")

    for category in categories:
        count = sum(
            1 for work in works
            if work["category"] == category
        )

        print(f"{category}：{count}件")