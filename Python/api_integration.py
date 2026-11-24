import requests

users_url = "https://jsonplaceholder.typicode.com/users"
posts_url = "https://jsonplaceholder.typicode.com/posts"

try:
    users_response = requests.get(users_url, timeout=10)
    posts_response = requests.get(posts_url, timeout=10)

    users_response.raise_for_status()
    posts_response.raise_for_status()

    users = users_response.json()
    posts = posts_response.json()

    integrated_data = []

    for user in users:
        user_posts = [
            post for post in posts
            if post["userId"] == user["id"]
        ]

        integrated_data.append({
            "user_id": user["id"],
            "user_name": user["name"],
            "email": user["email"],
            "post_count": len(user_posts),
            "posts": [
                {
                    "title": post["title"],
                    "body": post["body"]
                }
                for post in user_posts
            ]
        })

    print("統合データ作成完了！")

    for user in integrated_data:
        print(
            f"{user['user_name']}："
            f"{user['post_count']}件"
        )

    # 投稿件数の合計
    total_posts = sum(
        user["post_count"]
        for user in integrated_data
    )

    print("\nユーザー数:", len(integrated_data))
    print("投稿総数:", total_posts)

except requests.exceptions.RequestException as error:
    print("API通信エラー:", error)