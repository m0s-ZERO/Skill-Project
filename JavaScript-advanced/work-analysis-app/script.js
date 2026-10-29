
const works = [
  { id: 1, title: "m0s Hair", category: "Web Site", price: 50000 },
  { id: 2, title: "m0s MOVIE", category: "Web Site", price: 50000 },
  { id: 3, title: "m0s Table", category: "Web Site", price: 35000 },
  { id: 4, title: "Weather App", category: "Web App", price: 20000 },
  { id: 5, title: "Idea Vault", category: "Web App", price: 10000 }
];

function searchWorks(works, keyword, category) {
  return works
    .filter(work => {
      const matchesKeyword = work.title
        .toLowerCase()
        .includes(keyword.toLowerCase());

      const matchesCategory =
        category === "all" || work.category === category;

      return matchesKeyword && matchesCategory;
    })
    .sort((a, b) => b.price - a.price);
}

function analyzeWorks(works) {
  const resultCount = works.length;

  const resultTotalPrice = works.reduce(
    (total, work) => total + work.price,
    0
  );

  const resultAveragePrice =
    resultCount === 0 ? 0 : resultTotalPrice / resultCount;

  return {
    resultCount,
    resultTotalPrice,
    resultAveragePrice
  };
}

console.log(searchWorks(works, "m0s", "Web Site"));
console.log(analyzeWorks(works));



const keywordInput = document.querySelector("#keyword");
const categorySelect = document.querySelector("#category");
const searchButton = document.querySelector("#search-button");

const resultCountElement = document.querySelector("#result-count");
const resultTotalElement = document.querySelector("#result-total");
const resultAverageElement = document.querySelector("#result-average");
const workListElement = document.querySelector("#work-list");

function displayWorks(works) {
  workListElement.replaceChildren();

  if (works.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-message";
    message.textContent = "該当する作品が見つかりませんでした。";
    workListElement.appendChild(message);
    return;
  }

  works.forEach(work => {
    const card = document.createElement("article");
    card.className = "work-card";

    const title = document.createElement("h3");
    title.textContent = work.title;

    const category = document.createElement("p");
    category.textContent = `カテゴリー：${work.category}`;

    const price = document.createElement("p");
    price.textContent = `価格：${work.price.toLocaleString("ja-JP")}円`;

    card.append(title, category, price);
    workListElement.appendChild(card);
  });
}

function runSearch() {
  const keyword = keywordInput.value.trim();
  const category = categorySelect.value;

  const searchResults = searchWorks(works, keyword, category);
  const analysis = analyzeWorks(searchResults);

  resultCountElement.textContent = analysis.resultCount;
  resultTotalElement.textContent =
    analysis.resultTotalPrice.toLocaleString("ja-JP");
  resultAverageElement.textContent =
    Math.round(analysis.resultAveragePrice).toLocaleString("ja-JP");

  displayWorks(searchResults);
}

searchButton.addEventListener("click", runSearch);

runSearch();
