from pathlib import Path

# 現在のフォルダを取得
current_folder = Path.cwd()

print(current_folder)

file_path = Path("basic.py")

if file_path.exists():
    print("ファイルが存在します")
else:
    print("ファイルが存在しません")

print("ファイル名:", file_path.name)
print("拡張子:", file_path.suffix)
print("親フォルダ:", file_path.parent)


folder = Path("test_folder")

folder.mkdir(exist_ok=True)

print("フォルダを作成しました")


folder = Path(".")

files = folder.iterdir()

for file in files:
    print(file.name)