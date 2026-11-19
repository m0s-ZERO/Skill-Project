import pandas as pd
import matplotlib.pyplot as plt

# データ
works = pd.DataFrame({
    "title": [
        "m0s Hair",
        "m0s MOVIE",
        "m0s Table",
        "Weather App",
        "Idea Vault"
    ],
    "category": [
      "Web Site",
      "Web Site",
      "Web Site",
      "Web App",
      "Web App"
  ],
    "price": [50000, 50000, 35000, 20000, 10000]
})

# 棒グラフ
plt.bar(works["title"], works["price"])

plt.title("Work Prices")
plt.xlabel("Work")
plt.ylabel("Price")

plt.show()


category_prices = works.groupby("category")["price"].sum()

plt.bar(category_prices.index, category_prices.values)

plt.title("Category Total Prices")
plt.xlabel("Category")
plt.ylabel("Total Price")

plt.show()

plt.figure(figsize=(10, 5))

plt.bar(works["title"], works["price"])

plt.title("Work Prices")
plt.xlabel("Work")
plt.ylabel("Price")

plt.tight_layout()

plt.savefig("work_prices.png")
plt.show()