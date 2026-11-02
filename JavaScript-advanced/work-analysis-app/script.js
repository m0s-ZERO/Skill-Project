
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

function saveWorks() {
  // works配列をJSON文字列に変換
  const worksData = JSON.stringify(works);

  // localStorageに保存
  localStorage.setItem("works", worksData);
}


function loadWorks() {
  // localStorageから保存データを取得
  const savedData = localStorage.getItem("works");

  // 保存データが存在しない場合は初期データを使用
  if (savedData === null) {
    return;
  }

  try {
    // JSON文字列をJavaScriptの配列に変換
    const parsedData = JSON.parse(savedData);

    // 配列であることを確認
    if (Array.isArray(parsedData)) {
      works.splice(0, works.length, ...parsedData);
    }
  } catch (error) {
    console.error("作品データの読み込みに失敗しました。", error);
  }
}


const keywordInput = document.querySelector("#keyword");
const categorySelect = document.querySelector("#category");

const minPriceInput = document.querySelector("#min-price");
const maxPriceInput = document.querySelector("#max-price");

const sortOrderSelect = document.querySelector("#sort-order");

const searchErrorElement = document.querySelector("#search-error");
const searchButton = document.querySelector("#search-button");
const resetButton = document.querySelector("#reset-button");

const workSubmitButton = document.querySelector("#work-submit-button");
const cancelEditButton = document.querySelector("#cancel-edit-button");

const resultCountElement = document.querySelector("#result-count");
const resultTotalElement = document.querySelector("#result-total");
const resultAverageElement = document.querySelector("#result-average");
const resultsCountElement = document.querySelector("#results-count");
const workListElement = document.querySelector("#work-list");


const workForm = document.querySelector("#work-form");
const workTitleInput = document.querySelector("#work-title");
const workCategoryInput = document.querySelector("#work-category");
const workPriceInput = document.querySelector("#work-price");
const workImageInput = document.querySelector("#work-image");

const successPopup = document.querySelector("#success-popup");
const closePopupButton = document.querySelector("#close-popup-button");

let editingWorkId = null;

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

    // 編集ボタン
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-button";
    editButton.textContent = "編集";
    editButton.addEventListener("click", () => {
      editWork(work.id);
    });

    details.append(title, category, price);

    const cardActions = document.createElement("div");
    cardActions.className = "card-actions";
    cardActions.appendChild(editButton);
    // 削除ボタン
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", () => {
      deleteWork(work.id);
    });

    cardActions.appendChild(deleteButton);

    card.append(image, details, cardActions);

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


function editWork(id) {
  // IDから対象の作品を取得
  const targetWork = works.find(work => work.id === id);

  // 対象が存在しない場合は終了
  if (!targetWork) {
    return;
  }

  // 編集中の作品IDを保存
  editingWorkId = id;

  // 作品情報をフォームに反映
  workTitleInput.value = targetWork.title;
  workCategoryInput.value = targetWork.category;
  workPriceInput.value = targetWork.price;
  workImageInput.value = targetWork.image;

  // ボタンの表示を変更
  workSubmitButton.textContent = "変更を保存する";
  cancelEditButton.style.display = "block";

  // フォームまでスクロール
  workForm.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function addWork(event) {
  event.preventDefault();

  const title = workTitleInput.value.trim();
  const category = workCategoryInput.value;
  const price = workPriceInput.value;
  const image = workImageInput.value.trim();

  // 入力チェック
  if (title === "") {
    alert("作品名を入力してください。");
    return;
  }

  if (
    price === "" ||
    !Number.isFinite(Number(price)) ||
    Number(price) < 0
  ) {
    alert("価格は0以上の数値を入力してください。");
    return;
  }

  // 編集モード
  if (editingWorkId !== null) {
    const targetWork = works.find(work => work.id === editingWorkId);

    if (!targetWork) {
      return;
    }

    targetWork.title = title;
    targetWork.category = category;
    targetWork.price = Number(price);
    targetWork.image = image;

    editingWorkId = null;

    workSubmitButton.textContent = "作品を追加する";
    cancelEditButton.style.display = "none";
  } else {
    // 追加モード
    const newWork = {
      id: Math.max(0, ...works.map(work => work.id)) + 1,
      title: title,
      category: category,
      price: Number(price),
      image: image
    };

    works.push(newWork);
  }

  // フォームをリセット
  workForm.reset();

  // 作品データを保存
  saveWorks();

  // 画面を更新
  runSearch();

  // 完了ポップアップを表示
  successPopup.classList.add("show");
}

function cancelEdit() {
  editingWorkId = null;

  workForm.reset();

  workSubmitButton.textContent = "作品を追加する";
  cancelEditButton.style.display = "none";
}


function deleteWork(id) {
  // 削除対象の作品を取得
  const targetWork = works.find(work => work.id === id);

  if (!targetWork) {
    return;
  }

  // 削除確認
  const confirmed = confirm(
    `「${targetWork.title}」を削除しますか？`
  );

  if (!confirmed) {
    return;
  }

  // 対象の作品を配列から削除
  const targetIndex = works.findIndex(work => work.id === id);

  if (targetIndex !== -1) {
    works.splice(targetIndex, 1);
  }

  // 編集中の作品が削除された場合は編集を解除
  if (editingWorkId === id) {
    cancelEdit();
  }

  // 削除したデータを保存
  saveWorks();

  // 画面を更新
  runSearch();
}


cancelEditButton.addEventListener("click", cancelEdit);


searchButton.addEventListener("click", runSearch);
resetButton.addEventListener("click", resetSearch);
workForm.addEventListener("submit", addWork);
closePopupButton.addEventListener("click", () => {
  successPopup.classList.remove("show");
});

loadWorks();
runSearch();