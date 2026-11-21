
import json

data = """
{
    "title": "m0s Hair",
    "category": "Web Site",
    "price": 50000
}
"""

work = json.loads(data)

print("作品名:", work["title"])
print("カテゴリー:", work["category"])
print("価格:", work["price"])
