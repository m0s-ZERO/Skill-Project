// ▫データ
let ideas = [];
let completedIdeas = [];

// ▫DOM
const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const categoryInput = document.querySelector("#category");

const addButton = document.querySelector("#add-button");
const clearButton = document.querySelector("#clear-button");
const cancelEditButton = document.querySelector("#cancel-edit");
const ideasContainer = document.querySelector("#ideas");

const completedIdeasContainer = document.querySelector("#completed-ideas");

const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");

const detailArea = document.querySelector("#idea-detail");
const detailTitle = document.querySelector("#detail-title");
const detailCategory = document.querySelector("#detail-category");
const detailContent = document.querySelector("#detail-content");
const closeDetail = document.querySelector("#close-detail");

// ▫状態
let editingIdea = null;
cancelEditButton.style.display = "none";

// ▫関数
// 追加したアイデアを画面に表示する関数
function displayIdeas() {
  ideasContainer.innerHTML = "";
  // 条件を取得
  const selectedCategory = categoryFilter.value;
  const keyword = searchInput.value.trim().toLowerCase();
  // Ideaをfilter()
  const filteredIdeas = ideas.filter((idea) => {
    const matchesCategory =
      selectedCategory === "すべて" ||
      idea.category === selectedCategory;
    const matchesKeyword =
      idea.title.toLowerCase().includes(keyword) ||
      idea.content.toLowerCase().includes(keyword);
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
    ideaCard.classList.add("idea-card");
    ideaCard.innerHTML = `
      <div class="card-header">
        <h2>${idea.title}</h2>
        <p class="category-tag">${idea.category}</p>
      </div>
      <h3 class="idea-content">${idea.content}</h3>
      `;

    // 編集ボタン
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
      clearButton.style.display = "none";
      cancelEditButton.style.display = "inline-block";
    });

    // 削除ボタン
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
    const buttonArea = document.createElement("div");
    buttonArea.classList.add("button-area");

    // Todoの場合完了チェックを追加
    if (idea.category === "Todo") {
      const completeLabel = document.createElement("label");
      const completeCheckbox = document.createElement("input");
      completeCheckbox.type = "checkbox";
      completeLabel.appendChild(completeCheckbox);
      completeLabel.append(" 完了");
      completeCheckbox.addEventListener("change", (e) => {
        e.stopPropagation();
        completedIdeas.push(idea);
        ideas = ideas.filter((item) => item !== idea);
        localStorage.setItem("ideas", JSON.stringify(ideas));
        localStorage.setItem("completedIdeas", JSON.stringify(completedIdeas));
        displayIdeas();
        displayCompletedIdeas();
      });
      buttonArea.appendChild(completeLabel);
    }
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");
    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);
    const cardHeader = ideaCard.querySelector(".card-header");
    cardHeader.appendChild(buttonGroup);
    ideaCard.appendChild(buttonArea);
    ideasContainer.appendChild(ideaCard);

    ideasContainer.appendChild(ideaCard);
  });
}
// Todoの完了したアイデアを表示する関数
function displayCompletedIdeas() {
  completedIdeasContainer.innerHTML = "";
  completedIdeas.forEach((idea) => {
    const completedCard = document.createElement("div");
    completedCard.classList.add("idea-card");
    completedCard.innerHTML = `
      <div class="card-header">
        <h2>${idea.title}</h2>
        <p class="category-tag">${idea.category}</p>
      </div>
      <h3 class="idea-content">${idea.content}</h3>
    `;
    // Todoの完了したアイデアを元に戻すボタンを作成
    const restoreButton = document.createElement("button");
    restoreButton.textContent = "元に戻す";
    restoreButton.classList.add("restore-button");
    restoreButton.addEventListener("click", () => {
      // 完了したタスクから削除
      completedIdeas = completedIdeas.filter((item) => item !== idea);
      // 記録一覧に戻す
      ideas.push(idea);
      // 最新の状態を保存
      localStorage.setItem("ideas", JSON.stringify(ideas));
      localStorage.setItem("completedIdeas", JSON.stringify(completedIdeas));
      // 画面を更新
      displayIdeas();
      displayCompletedIdeas();
    });
    completedCard.appendChild(restoreButton);
    completedIdeasContainer.appendChild(completedCard);
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
  clearButton.style.display = "inline-block";
  cancelEditButton.style.display = "none";
});

// クリアイベント
clearButton.addEventListener("click", () => {
  titleInput.value = "";
  contentInput.value = "";
  categoryInput.value = "アイデア";
});

// キャンセルイベント
cancelEditButton.addEventListener("click", () => {
  editingIdea = null;
  titleInput.value = "";
  contentInput.value = "";
  categoryInput.value = "アイデア";
  addButton.textContent = "追加する";
  clearButton.style.display = "inline-block";
  cancelEditButton.style.display = "none";
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
const savedCompletedIdeas = localStorage.getItem("completedIdeas");
if (savedIdeas) {
  ideas = JSON.parse(savedIdeas);
}
if (savedCompletedIdeas) {
  completedIdeas = JSON.parse(savedCompletedIdeas);
}

displayIdeas();
displayCompletedIdeas();