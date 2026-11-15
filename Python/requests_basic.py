import requests

response = requests.get(
    "https://jsonplaceholder.typicode.com/posts"
)

print("ステータスコード:", response.status_code)

data = response.json()

print(data[0])