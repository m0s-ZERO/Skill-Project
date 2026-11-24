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

    print("ユーザー取得件数:", len(users))
    print("投稿取得件数:", len(posts))

    print("\nユーザーと投稿の連携")

    for user in users:
        user_posts = [
            post for post in posts
            if post["userId"] == user["id"]
        ]

        print(f"\nユーザー名: {user['name']}")
        print(f"投稿件数: {len(user_posts)}")

except requests.exceptions.RequestException as error:
    print("API通信エラー:", error)