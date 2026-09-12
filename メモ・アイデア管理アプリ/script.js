// ▫データ
let ideas = [];

// ▫DOM
const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const categoryInput = document.querySelector("#category");

const addButton = document.querySelector("#add-button");
const cancelEditButton = document.querySelector("#cancel-edit");
const ideasContainer = document.querySelector("#ideas");

const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");

const detailArea = document.querySelector("#idea-detail");
const detailTitle = document.querySelector("#detail-title");
const detailCategory = document.querySelector("#detail-category");
const detailContent = document.querySelector("#detail-content");
const closeDetail = document.querySelector("#close-detail");

// ▫状態
let editingIdea = null;

// ▫関数
// 追加したアイデアを画面に表示する関数
function displayIdeas() {
  ideasContainer.innerHTML = "";
  // 条件を取得
  const selectedCategory = categoryFilter.value;
  const keyword = searchInput.value.trim();
  // Ideaをfilter()
  const filteredIdeas = ideas.filter((idea) => {
    const matchesCategory =
      selectedCategory === "すべて" ||
      idea.category === selectedCategory;
    const matchesKeyword =
      idea.title.toLowerCase().includes(keyword.toLowerCase()) ||
      idea.content.toLowerCase().includes(keyword.toLowerCase());
    return matchesCategory && matchesKeyword;
  });
  // 0件ならメッセージ
  if (filteredIdeas.length === 0) {
    if (keyword !== "") {
      ideasContainer.innerHTML = "<p>該当するアイデアがありません</p>";
    } else {
      ideasContainer.innerHTML = "<p>アイデアがありません</p>";
    }
    return;
  }
  // Ideaをカードとして作る
  filteredIdeas.forEach((idea) => {
    const ideaCard = document.createElement("div");
    ideaCard.innerHTML = `
      <h2>${idea.title}</h2>
      <p>カテゴリー：${idea.category}</p>
      <h3>${idea.content}</h3>
      `;
    const editButton = document.createElement("button");
    editButton.textContent = "編集";
    // 編集ボタンイベント
    editButton.addEventListener("click", (e) => {
      e.stopPropagation();
      editingIdea = idea;
      titleInput.value = idea.title;
      contentInput.value = idea.content;
      categoryInput.value = idea.category;
      addButton.textContent = "更新する";
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    // 削除ボタンイベント
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      ideas = ideas.filter((item) => {
        return item !== idea;
      });
      editingIdea = null;
      localStorage.setItem("ideas", JSON.stringify(ideas));
      displayIdeas();
    });
    // 詳細表示イベント
    ideaCard.addEventListener("click", () => {
      detailTitle.textContent = idea.title;
      detailCategory.textContent = `カテゴリー：${idea.category}`;
      detailContent.textContent = idea.content;
      detailArea.style.display = "block";
    });
    // 画面に表示
    ideaCard.appendChild(editButton);
    ideaCard.appendChild(deleteButton);
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
  if (editingIdea) {
    editingIdea.title = titleInput.value;
    editingIdea.content = contentInput.value;
    editingIdea.category = categoryInput.value;
  } else {
    const newIdea = {
      title: titleInput.value,
      content: contentInput.value,
      category: categoryInput.value
    };
    ideas.push(newIdea);
  }
  localStorage.setItem("ideas", JSON.stringify(ideas));
  displayIdeas();
  titleInput.value = "";
  contentInput.value = "";
  addButton.textContent = "追加する";
  editingIdea = null;
});

// キャンセルイベント
cancelEditButton.addEventListener("click", () => {
  editingIdea = null;
  titleInput.value = "";
  contentInput.value = "";
  categoryInput.value = "アイデア";
  addButton.textContent = "追加する";
});

// 検索イベント
searchInput.addEventListener("input", () => {
  displayIdeas();
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


const savedIdeas = localStorage.getItem("ideas");
if (savedIdeas) {
  ideas = JSON.parse(savedIdeas);
}
displayIdeas();