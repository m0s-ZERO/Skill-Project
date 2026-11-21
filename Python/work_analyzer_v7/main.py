from work_manager import WorkManager


def main():
    manager = WorkManager()
    manager.show_data_folder()
    manager.show_environment()

    while True:
        print("\n===== WORK ANALYZER Ver.7.0 =====")
        print("1. 作品一覧")
        print("2. 作品追加")
        print("3. 作品検索")
        print("4. 合計金額")
        print("5. 30,000円以上の作品")
        print("6. 税込み価格")
        print("7. 価格の高い順")
        print("8. APIデータ取得")
        print("9. APIデータをJSON保存")
        print("10. 終了")

        choice = input("番号を選択してください：")

        try:
            if choice == "1":
                manager.show_works()

            elif choice == "2":
                title = input("作品名：")
                category = input("カテゴリ（Web Site / Web App）：")
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
                manager.show_tax_prices()

            elif choice == "7":
                manager.show_sorted_works()

            elif choice == "8":
                manager.fetch_api_data()

            elif choice == "9":
                manager.save_api_data()

            elif choice == "10":
                print("プログラムを終了します")
                break

            else:
                print("正しい番号を選択してください")

        except ValueError as error:
            print(f"入力エラー：{error}")


if __name__ == "__main__":
    main()