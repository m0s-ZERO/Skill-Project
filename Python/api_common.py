import requests
import logging


def fetch_api_data(url, params=None):
    try:
        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        logging.info("API通信成功: %s", url)

        return data

    except requests.exceptions.Timeout:
        logging.error("タイムアウト: %s", url)

    except requests.exceptions.HTTPError as error:
        logging.error("HTTPエラー: %s", error)

    except requests.exceptions.RequestException as error:
        logging.error("通信エラー: %s", error)

    except ValueError:
        logging.error("JSON解析エラー: %s", url)

    return None

def main():
    logging.basicConfig(
        filename="api.log",
        level=logging.INFO,
        encoding="utf-8"
    )

    users_url = "https://jsonplaceholder.typicode.com/users"
    posts_url = "https://jsonplaceholder.typicode.com/posts"

    users = fetch_api_data(users_url)
    posts = fetch_api_data(posts_url)

    if users is None or posts is None:
        print("APIデータの取得に失敗しました。")
        return

    print("ユーザー数:", len(users))
    print("投稿数:", len(posts))


if __name__ == "__main__":
    main()