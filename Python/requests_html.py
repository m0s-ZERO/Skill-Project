
import csv
from bs4 import BeautifulSoup

html = """
<div class="work">
    <h2>m0s Hair</h2>
    <p>50000</p>
</div>

<div class="work">
    <h2>m0s MOVIE</h2>
    <p>50000</p>
</div>

<div class="work">
    <h2>m0s Table</h2>
    <p>35000</p>
</div>
"""

soup = BeautifulSoup(html, "html.parser")

works = soup.find_all("div", class_="work")

with open("works_scraped.csv", "w", newline="", encoding="utf-8-sig") as file:
    writer = csv.writer(file)

    writer.writerow(["title", "price"])

    for work in works:
        title = work.find("h2").text
        price = work.find("p").text

        writer.writerow([title, price])

print("CSV保存完了！")
