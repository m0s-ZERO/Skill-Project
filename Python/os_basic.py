import os

current_folder = os.getcwd()

print(current_folder)


files = os.listdir(".")

for file in files:
    print(file)


folder_name = "test_folder"

if not os.path.exists(folder_name):
    os.mkdir(folder_name)
    print("フォルダを作成しました")
else:
    print("フォルダはすでに存在します")


print("OS情報:", os.name)
print("ユーザー:", os.environ.get("USER"))