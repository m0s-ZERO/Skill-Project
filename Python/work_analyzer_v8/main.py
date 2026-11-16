
from work_manager import WorkManager


def main():
    manager = WorkManager()

    try:
        while True:
            print("\n===== WORK ANALYZER Ver.8.0 =====")
            print("1. 作品一覧")
            print("2. 作品登録")
            print("3. 作品検索")
            print("4. 合計金額")
            print("5. 価格30000円以上")
            print("6. 価格の高い順")
            print("7. 作品価格の更新")
            print("8. 作品の削除")
            print("9. 終了")

            choice = input("番号を選択してください：")

            try:
                if choice == "1":
                    manager.show_works()

                elif choice == "2":
                    title = input("作品名：")
                    category = input("カテゴリー（Web Site / Web App）：")
                    price = int(input("価格："))

                    manager.add_work(title, category, price)

                elif choice == "3":
                    keyword = input("検索キーワード：")
                    manager.search_work(keyword)

                elif choice == "4":
                    manager.show_total()

                elif choice == "5":
                    manager.show_filtered_works()

                elif choice == "6":
                    manager.show_sorted_works()

                elif choice == "7":
                    work_id = int(input("更新する作品ID："))
                    new_price = int(input("新しい価格："))

                    manager.update_work(work_id, new_price)

                elif choice == "8":
                    work_id = int(input("削除する作品ID："))

                    manager.delete_work(work_id)

                elif choice == "9":
                    print("プログラムを終了します")
                    break

                else:
                    print("正しい番号を選択してください")

            except ValueError as error:
                print(f"入力エラー：{error}")

    finally:
        manager.close()


if __name__ == "__main__":
    main()
