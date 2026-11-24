import logging

logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    encoding="utf-8"
)

logging.info("API通信を開始しました。")
logging.info("データ取得に成功しました。")
logging.warning("一部のデータが不足しています。")
logging.error("API通信に失敗しました。")

print("ログ記録完了！")