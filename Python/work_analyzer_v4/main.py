
from work_manager import WorkManager
from website import WebSite
from webapp import WebApp


def main():
    manager = WorkManager()

    while True:
        print("\n===== Work Analyzer Ver.4.0 =====")
        print("1. 作品一覧")
        print("2. 作品追加")
        print("3. キーワード検索")
        print("4. 合計価格")
        print("5. カテゴリー別集計")
        print("6. 終了")

        choice = input("番号を選択してください：")

        try:
            if choice == "1":
                manager.show_works()

            elif choice == "2":
                title = input("作品名：")
                category = input("カテゴリー（Web Site / Web App）：")
                price = int(input("価格："))

                if price < 0:
                    raise ValueError("価格は0円以上にしてください")

                if category == "Web Site":
                    pages = int(input("ページ数："))

                    if pages < 1:
                        raise ValueError("ページ数は1以上にしてください")

                    work = WebSite(title, price, pages)

                elif category == "Web App":
                    users = int(input("利用者数："))

                    if users < 0:
                        raise ValueError("利用者数は0以上にしてください")

                    work = WebApp(title, price, users)

                else:
                    raise ValueError("カテゴリーが正しくありません")

                manager.add_work(work)

            elif choice == "3":
                keyword = input("検索キーワード：")
                manager.search_work(keyword)

            elif choice == "4":
                manager.show_total()

            elif choice == "5":
                manager.show_categories()

            elif choice == "6":
                print("プログラムを終了します")
                break

            else:
                print("1〜6の番号を入力してください")

        except ValueError as error:
            print(f"入力エラー：{error}")


if __name__ == "__main__":
    main()
