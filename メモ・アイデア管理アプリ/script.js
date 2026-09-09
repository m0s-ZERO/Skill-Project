// ▫データ
let ideas = [];

// ▫DOM
const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const categoryInput = document.querySelector("#category");

const addButton = document.querySelector("#add-button");

const ideasContainer = document.querySelector("#ideas");

const categoryFilter = document.querySelector("#category-filter");

const detailArea = document.querySelector("#idea-detail");
const detailTitle = document.querySelector("#detail-title");
const detailCategory = document.querySelector("#detail-category");
const detailContent = document.querySelector("#detail-content");
const closeDetail = document.querySelector("#close-detail");

// ▫状態

// ▫関数
// 追加したアイデアを画面に表示する関数
function displayIdeas() {
  ideasContainer.innerHTML = "";
  const selectedCategory = categoryFilter.value;
  const filteredIdeas = ideas.filter((idea) => {
    return selectedCategory === "すべて" || idea.category === selectedCategory;
  });
  filteredIdeas.forEach((idea) => {
    const ideaCard = document.createElement("div");
    ideaCard.innerHTML = `
      <h2>${idea.title}</h2>
      <p>カテゴリー：${idea.category}</p>
      <h3>${idea.content}</h3>
    `;
    ideaCard.addEventListener("click", () => {
      detailTitle.textContent = idea.title;
      detailCategory.textContent = `カテゴリー：${idea.category}`;
      detailContent.textContent = idea.content;

      detailArea.style.display = "block";
    });
    ideasContainer.appendChild(ideaCard);
  });
}

// ▫イベント
// アイデア追加イベント
addButton.addEventListener("click", () => {
  if (titleInput.value === "" || contentInput.value === "") {
    alert("タイトルと内容を入力してください");
    return;
  }
  const newIdea = {
    title: titleInput.value,
    content: contentInput.value,
    category: categoryInput.value
  };
  ideas.push(newIdea);
  displayIdeas(); // 追加後にアイデアを再表示
});

// フィルター変更イベント
categoryFilter.addEventListener("change", () => {
  displayIdeas();
});

// 詳細を閉じるボタンイベント
closeDetail.addEventListener("click", () => {
  detailArea.style.display = "none";
});
// ▫初期表示