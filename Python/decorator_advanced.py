
def show_process(func):

    def wrapper(*args, **kwargs):
        print("===== START =====")

        result = func(*args, **kwargs)

        print("===== END =====")

        return result

    return wrapper


@show_process
def calculate_price(title, price, tax_rate=0.1):
    total = price + price * tax_rate

    print(f"作品名：{title}")
    print(f"税込価格：{total}円")

    return total


result = calculate_price(
    "m0s Hair",
    50000,
    tax_rate=0.1
)

print(f"戻り値：{result}円")
