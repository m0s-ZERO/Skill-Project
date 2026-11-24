import matplotlib.pyplot as plt


class GraphManager:

    def show_work_prices(self, df):
        plt.figure(figsize=(10, 5))

        plt.bar(df["title"], df["price"])

        plt.title("Work Prices")
        plt.xlabel("Work")
        plt.ylabel("Price")

        plt.xticks(rotation=20)
        plt.tight_layout()

        plt.savefig("work_prices.png")
        plt.show()

    def show_category_prices(self, df):
      result = df.groupby("category")["price"].sum()

      plt.figure(figsize=(8, 5))

      plt.bar(result.index, result.values)

      plt.title("Category Total Prices")
      plt.xlabel("Category")
      plt.ylabel("Total Price")

      plt.tight_layout()

      plt.savefig("category_prices.png")
      plt.show()

    def show_category_ratio(self, df):
      result = df["category"].value_counts()

      plt.figure(figsize=(7, 7))

      plt.pie(
        result.values,
        labels=result.index,
        autopct="%1.1f%%",
        startangle=90
      )

      plt.title("Work Category Ratio")

      plt.savefig("category_ratio.png")
      plt.show()