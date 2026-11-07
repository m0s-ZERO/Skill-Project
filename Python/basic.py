# 割引額を計算する関数
def calculate_discount(price, rate):
    return price * rate / 100


# 入力値をチェックする関数
def validate_input(price, rate):
    if price <= 0:
        return False

    if rate < 0 or rate > 100:
        return False

    return True


# メイン処理
def main():
    work_name = input("制作物名を入力してください：")

    try:
        price = int(input("通常料金を入力してください："))
        discount_rate = float(input("割引率（％）を入力してください："))

        if not validate_input(price, discount_rate):
            print("エラー：入力値を確認してください。")
            return

        discount_amount = calculate_discount(price, discount_rate)
        final_price = price - discount_amount

        print("\n----- 計算結果 -----")
        print(f"制作物名：{work_name}")
        print(f"通常料金：{price:,.0f}円")
        print(f"割引率：{discount_rate}%")
        print(f"割引額：{discount_amount:,.0f}円")
        print(f"割引後料金：{final_price:,.0f}円")

    except ValueError:
        print("エラー：料金と割引率には数字を入力してください。")


# プログラムの実行
if __name__ == "__main__":
    main()