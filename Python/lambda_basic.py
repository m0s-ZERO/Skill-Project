# ラムダ式で税込価格を計算
calculate_tax = lambda price: price * 1.1

# 作品価格
price = 50000

# 計算
total = calculate_tax(price)

print(f"税抜価格：{price}円")
print(f"税込価格：{total}円")