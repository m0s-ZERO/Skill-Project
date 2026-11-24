import requests

url = "https://jsonplaceholder.typicode.com/posts"

for user_id in range(1, 4):

    response = requests.get(
        url,
        params={"userId": user_id},
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    print(f"ユーザーID：{user_id}")
    print(f"投稿数：{len(data)}件")
    print("--------------------")