import requests

url = "https://jsonplaceholder.typicode.com/posts"

data = {
    "title": "m0s Python Project",
    "body": "API POST Request Test",
    "userId": 1
}

try:
    response = requests.post(
        url,
        json=data,
        timeout=10
    )

    response.raise_for_status()

    result = response.json()

    print("通信成功！")
    print("ステータスコード:", response.status_code)
    print("送信結果:", result)

except requests.exceptions.Timeout:
    print("通信がタイムアウトしました。")

except requests.exceptions.HTTPError as error:
    print("HTTPエラー:", error)

except requests.exceptions.RequestException as error:
    print("通信エラー:", error)