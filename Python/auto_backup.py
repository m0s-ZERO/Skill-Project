import json
import shutil
from pathlib import Path

data_path = Path("api_data.json")
backup_path = Path("api_data_backup.json")

new_data = [
    {"id": 1, "title": "投稿A"},
    {"id": 2, "title": "投稿B"},
    {"id": 3, "title": "投稿C"}
]

# 既存ファイルがあればバックアップ
if data_path.exists():
    shutil.copy2(data_path, backup_path)
    print("バックアップ完了！")

# 新しいデータを保存
with open(data_path, "w", encoding="utf-8") as file:
    json.dump(
        new_data,
        file,
        ensure_ascii=False,
        indent=4
    )

print("データ保存完了！")