import pandas as pd

works = pd.read_csv("works.csv")

print("===== WORK DATA =====")
print(works)

print("\n===== FIRST 5 =====")
print(works.head())

print("\n===== DATA INFO =====")
works.info()

print("\n===== STATISTICS =====")
print(works.describe())

print("\n===== DATA SIZE =====")
print(works.shape)