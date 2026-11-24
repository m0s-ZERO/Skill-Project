import requests


def fetch_api_data(url, params=None):
    try:
        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        print("API通信成功！")
        return data

    except requests.exceptions.Timeout:
        print("タイムアウトしました。")

    except requests.exceptions.HTTPError as error:
        print("HTTPエラー:", error)

    except requests.exceptions.RequestException as error:
        print("通信エラー:", error)

    except ValueError:
        print("JSONの解析に失敗しました。")

    return None


def main():
    url = "https://jsonplaceholder.typicode.com/posts/1"

    data = fetch_api_data(url)

    if data is not None:
        print("タイトル:", data["title"])
        print("投稿ID:", data["id"])


if __name__ == "__main__":
    main()