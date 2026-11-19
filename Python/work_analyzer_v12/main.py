
from work_manager import WorkManager
from graph_manager import GraphManager


def main():
    manager = WorkManager()
    graph_manager = GraphManager()

    try:
        while True:
            print("\n===== WORK ANALYZER Ver.12.0 =====")
            print("1. 作品一覧")
            print("2. 作品検索")
            print("3. ページ表示")
            print("4. 作品追加")
            print("5. 価格更新")
            print("6. 作品削除")
            print("7. 価格分析")
            print("8. カテゴリー分析")
            print("9. 価格フィルター")
            print("10. 価格順ソート")
            print("11. CSVエクスポート")
            print("12. 作品価格グラフ")
            print("13. カテゴリー価格グラフ")
            print("14. カテゴリー割合グラフ")
            print("15. 終了")

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
                    manager.analyze_prices()

                elif choice == "8":
                    manager.analyze_categories()

                elif choice == "9":
                    manager.filter_works()

                elif choice == "10":
                    manager.sort_works()

                elif choice == "11":
                    manager.export_csv()

                elif choice == "12":
                    df = manager.get_dataframe()
                    graph_manager.show_work_prices(df)

                elif choice == "13":
                    df = manager.get_dataframe()
                    graph_manager.show_category_prices(df)

                elif choice == "14":
                    df = manager.get_dataframe()
                    graph_manager.show_category_ratio(df)

                elif choice == "15":
                    print("終了します")
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
