old_data = [
    {"id": 1, "title": "投稿A"},
    {"id": 2, "title": "投稿B"},
    {"id": 3, "title": "投稿C"}
]

new_data = [
    {"id": 1, "title": "投稿A"},
    {"id": 2, "title": "投稿B"},
    {"id": 3, "title": "投稿C"},
    {"id": 4, "title": "投稿D"}
]

old_ids = {item["id"] for item in old_data}

new_items = [
    item for item in new_data
    if item["id"] not in old_ids
]

print("新しく追加されたデータ:")

for item in new_items:
    print(item)