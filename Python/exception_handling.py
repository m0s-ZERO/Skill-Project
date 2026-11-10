print("===== Price Checker =====")

try:
    price = int(input("作品価格を入力してください："))

    if price < 0:
        raise ValueError("価格は0以上にしてください")

except ValueError as error:
    print(f"エラー：{error}")

else:
    print(f"作品価格：{price:,}円")

finally:
    print("価格チェックを終了しました")