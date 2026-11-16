
from work_manager import WorkManager


def main():
    manager = WorkManager()

    try:
        while True:
            print("\n===== WORK ANALYZER Ver.9.0 =====")
            print("1. 作品一覧")
            print("2. カテゴリー別集計")
            print("3. 価格分析")
            print("4. 作品価格の更新")
            print("5. 終了")

            choice = input("番号を選択してください：")

            try:
                if choice == "1":
                    manager.show_works()

                elif choice == "2":
                    manager.show_category_summary()

                elif choice == "3":
                    manager.show_price_analysis()

                elif choice == "4":
                    work_id = int(input("更新する作品ID："))
                    new_price = int(input("新しい価格："))
                    manager.update_work(work_id, new_price)

                elif choice == "5":
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
