# 高階関数
def process_price(price, func):
    result = func(price)
    return result


# 税込み計算
tax = lambda price: price * 1.1

# 20%割引
discount = lambda price: price * 0.8

# 1万円加算
addition = lambda price: price + 10000


price = 50000

print(f"税込価格：{process_price(price, tax)}円")
print(f"割引価格：{process_price(price, discount)}円")
print(f"加算価格：{process_price(price, addition)}円")