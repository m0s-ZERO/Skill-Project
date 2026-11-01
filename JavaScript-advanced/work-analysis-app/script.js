
const works = [
  {
    id: 1,
    title: "m0s Hair",
    category: "Web Site",
    price: 50000,
    image: "images/m0s-hairのコピー.png"
  },
  {
    id: 2,
    title: "m0s MOVIE",
    category: "Web Site",
    price: 50000,
    image: "images/m0s-movieのコピー.png"
  },
  {
    id: 3,
    title: "m0s Table",
    category: "Web Site",
    price: 35000,
    image: "images/m0s-tableのコピー.png"
  },
  {
    id: 4,
    title: "Weather App",
    category: "Web App",
    price: 20000,
    image: "images/weather-appのコピー.png"
  },
  {
    id: 5,
    title: "Idea Vault",
    category: "Web App",
    price: 10000,
    image: "images/idea-vaultのコピー.png"
  }
];

function searchWorks(works, keyword, category, minPrice, maxPrice, sortOrder) {
  return works
    .filter(work => {
      const matchesKeyword = work.title
        .toLowerCase()
        .includes(keyword.toLowerCase());

      const matchesCategory =
        category === "all" || work.category === category;

      const matchesMinPrice =
        minPrice === "" || work.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || work.price <= Number(maxPrice);

      return (
        matchesKeyword &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    })
    .sort((a, b) => {
      if (sortOrder === "low") {
        return a.price - b.price;
      }

      return b.price - a.price;
    });
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

const keywordInput = document.querySelector("#keyword");
const categorySelect = document.querySelector("#category");

const minPriceInput = document.querySelector("#min-price");
const maxPriceInput = document.querySelector("#max-price");

const sortOrderSelect = document.querySelector("#sort-order");

const searchErrorElement = document.querySelector("#search-error");
const searchButton = document.querySelector("#search-button");
const resetButton = document.querySelector("#reset-button");

const resultCountElement = document.querySelector("#result-count");
const resultTotalElement = document.querySelector("#result-total");
const resultAverageElement = document.querySelector("#result-average");
const resultsCountElement = document.querySelector("#results-count");
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

    const image = document.createElement("img");
    image.className = "work-card-image";
    image.src = work.image;
    image.alt = `${work.title}の画面`;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.alt = `${work.title}の画像を読み込めませんでした`;
      image.classList.add("image-error");
    });

    const details = document.createElement("div");
    details.className = "work-card-details";

    const title = document.createElement("h3");
    title.textContent = work.title;

    const category = document.createElement("p");
    category.textContent = `カテゴリー：${work.category}`;

    const price = document.createElement("p");
    price.textContent = `価格：${work.price.toLocaleString("ja-JP")}円`;

    details.append(title, category, price);
    card.append(image, details);
    workListElement.appendChild(card);
  });
}

function runSearch() {
  const keyword = keywordInput.value.trim();
  const category = categorySelect.value;
  const minPrice = minPriceInput.value;
  const maxPrice = maxPriceInput.value;
  const sortOrder = sortOrderSelect.value;
  // エラー表示を初期化
  searchErrorElement.textContent = "";

  // 価格の入力チェック
  if (
    (minPrice !== "" &&
      (!Number.isFinite(Number(minPrice)) || Number(minPrice) < 0)) ||
    (maxPrice !== "" &&
      (!Number.isFinite(Number(maxPrice)) || Number(maxPrice) < 0))
  ) {
    searchErrorElement.textContent =
      "価格は0以上の数値で入力してください。";
    return;
  }

  // 最低価格と最高価格の比較
  if (
    minPrice !== "" &&
    maxPrice !== "" &&
    Number(minPrice) > Number(maxPrice)
  ) {
    searchErrorElement.textContent =
      "最低価格は最高価格以下に設定してください。";
    return;
  }

  const searchResults = searchWorks(
    works,
    keyword,
    category,
    minPrice,
    maxPrice,
    sortOrder
  );

  const analysis = analyzeWorks(searchResults);

  resultCountElement.textContent = analysis.resultCount;
  resultTotalElement.textContent =
    analysis.resultTotalPrice.toLocaleString("ja-JP");
  resultAverageElement.textContent =
    Math.round(analysis.resultAveragePrice).toLocaleString("ja-JP");
  resultsCountElement.textContent =
    `全${analysis.resultCount}件`;

  displayWorks(searchResults);
}

function resetSearch() {
  keywordInput.value = "";
  categorySelect.value = "all";
  minPriceInput.value = "";
  maxPriceInput.value = "";
  sortOrderSelect.value = "high";

  runSearch();
}

searchButton.addEventListener("click", runSearch);
resetButton.addEventListener("click", resetSearch);

runSearch();
