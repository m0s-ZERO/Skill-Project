
import csv

from pathlib import Path
from bs4 import BeautifulSoup


class Scraper:

    def __init__(self):
        self.output_path = Path(__file__).parent / "scraped_works.csv"

    def scrape_works(self):

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

        scraped_data = []

        for work in works:
            title = work.find("h2").text.strip()
            price = int(work.find("p").text.strip())

            scraped_data.append({
                "title": title,
                "price": price
            })

        return scraped_data

    def save_csv(self, data):

        with open(
            self.output_path,
            "w",
            newline="",
            encoding="utf-8-sig"
        ) as file:

            writer = csv.DictWriter(
                file,
                fieldnames=["title", "price"]
            )

            writer.writeheader()
            writer.writerows(data)

        print("CSV保存完了！")
        print(self.output_path)
