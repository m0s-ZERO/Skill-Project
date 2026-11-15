from datetime import datetime

work_title = "m0s Hair"

registered_at = datetime.now()

print(f"作品名：{work_title}")
print(f"登録日時：{registered_at.strftime('%Y/%m/%d %H:%M')}")