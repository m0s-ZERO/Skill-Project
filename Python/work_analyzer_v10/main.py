
from work_manager import WorkManager


def main():
    manager = WorkManager()

    try:
        while True:
            print("\n===== WORK ANALYZER Ver.10.0 =====")
            print("1. 作品一覧")
            print("2. 複数条件検索")
            print("3. ページネーション")
            print("4. 作品登録")
            print("5. 作品価格の更新")
            print("6. 作品削除")
            print("7. 終了")

            choice = input("番号を選択してください：")

            try:
                if choice == "1":
                    manager.get_works_page(page=1, limit=100)

                elif choice == "2":
                    keyword = input("作品名（未入力なら全件）：")
                    category = input("カテゴリー（Web Site / Web App / 未入力なら全件）：")

                    min_price_input = input("最低価格（未入力なら指定なし）：")
                    max_price_input = input("最高価格（未入力なら指定なし）：")

                    min_price = int(min_price_input) if min_price_input else None
                    max_price = int(max_price_input) if max_price_input else None

                    manager.search_works(
                        keyword=keyword or None,
                        category=category or None,
                        min_price=min_price,
                        max_price=max_price
                    )

                elif choice == "3":
                    page = int(input("ページ番号："))
                    manager.get_works_page(page=page, limit=3)

                elif choice == "4":
                    title = input("作品名：")
                    category = input("カテゴリー（Web Site / Web App）：")
                    price = int(input("価格："))

                    manager.add_work(title, category, price)

                elif choice == "5":
                    work_id = int(input("更新する作品ID："))
                    new_price = int(input("新しい価格："))

                    manager.update_work(work_id, new_price)

                elif choice == "6":
                    work_id = int(input("削除する作品ID："))

                    manager.delete_work(work_id)

                elif choice == "7":
                    print("プログラムを終了します")
                    break

                else:
                    print("正しい番号を選択してください")

            except ValueError as error:
                print(f"入力エラー：{error}")

            except Exception as error:
                print(f"エラーが発生しました：{error}")

    finally:
        print("Work Analyzerを終了しました")


if __name__ == "__main__":
    main()
