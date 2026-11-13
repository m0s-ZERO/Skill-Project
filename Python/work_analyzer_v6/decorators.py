def show_process(func):
    def wrapper(*args, **kwargs):
        print("\n===== 処理開始 =====")

        result = func(*args, **kwargs)

        print("===== 処理終了 =====\n")
        return result

    return wrapper