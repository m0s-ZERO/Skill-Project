// ①データ：プロジェクト配列
let projects = [
  {
    title: "Skill Project",
    category: "Web",
    description: "ポートフォリオ制作"
  },
  {
    title: "m0s",
    category: "Music",
    description: "アーティスト名"
  },
  {
    title: "NRS T-shirt",
    category: "Fashion",
    description: "親友3人組の服作成"
  }
];


// ② localStorage：リロード復元
const savedProjects = localStorage.getItem("projects");
if (savedProjects !== null) {
  projects = JSON.parse(savedProjects);
}

// ③ DOM取得
const projectList = document.querySelector("#project-list");
const saveProject = document.querySelector("#save-project");
const addProjectButton = document.querySelector("#add-project");
const projectTitleInput = document.querySelector("#project-title");
const projectCategoryInput = document.querySelector("#project-category");
const projectDescriptionInput = document.querySelector("#project-description");
const blankCheck = document.querySelector("#blank-check");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const categoryFilter = document.querySelector("#category-filter");
const sortFilter = document.querySelector("#sort-filter");
const searchResult = document.querySelector("#search-result");
const actionMessage = document.querySelector("#action-message");
const formMode = document.querySelector("#form-mode");
const projectDetail = document.querySelector("#project-detail");

// ④ 状態
let currentProjects = projects;
let editingIndex = null;
let sortOrder = "reset";

// ⑤ 関数
// リロードしてもデータを保存する関数
function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}
// 追加関数
function addProject() {
  if (
    projectTitleInput.value === "" ||
    projectCategoryInput.value === "" ||
    projectDescriptionInput.value === ""
  ) {
    blankCheck.textContent = "全て入力してください";
    return;
  }
  projects.push({
    title: projectTitleInput.value,
    category: projectCategoryInput.value,
    description: projectDescriptionInput.value
  });
  saveProjects();
  filterProjects();
  actionMessage.textContent = "プロジェクトを追加しました";
  projectTitleInput.value = "";
  projectCategoryInput.value = "";
  projectDescriptionInput.value = "";
}
// 編集関数
function editProject(targetProject, originalIndex) {
  editingIndex = originalIndex;
  projectTitleInput.value = targetProject.title;
  projectCategoryInput.value = targetProject.category;
  projectDescriptionInput.value = targetProject.description;
  formMode.textContent = "プロジェクトを編集";
}
// 削除関数
function deleteProject(targetProject) {
  // 削除確認処理
  const result = confirm("本当に削除しますか？");
  if (result === false) {
    return;
  }
  const originalIndex = projects.indexOf(targetProject);
  projects.splice(originalIndex, 1);
  saveProjects();
  filterProjects();
  actionMessage.textContent = "プロジェクトを削除しました";
}

// 「検索」+「カテゴリー絞り込み」関数
function filterProjects() {
  // keywordを取得
  const keyword = searchInput.value;
  // projectsをfilter
  currentProjects = projects.filter(function (project) {
    return (
      project.title.toLowerCase().includes(keyword.toLowerCase()) ||
      project.category.toLowerCase().includes(keyword.toLowerCase())
    )
      &&
      (
        categoryFilter.value === "all" ||
        project.category.includes(categoryFilter.value)
      );
  });
  if (sortOrder === "asc") {
    currentProjects.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  } else if (sortOrder === "desc") {
    currentProjects.sort(function (a, b) {
      return b.title.localeCompare(a.title);
    });
  }
  // 0件チェック
  searchResult.textContent = "";
  if (projects.length === 0) {
    searchResult.textContent = "プロジェクトがありません";
  } else if (currentProjects.length === 0) {
    searchResult.textContent = "該当するプロジェクトがありません";
  }
  // render
  renderProjects(currentProjects);
}

// 再描画関数
function renderProjects(projectListData) {
  projectList.textContent = "";
  for (let i = 0; i < projectListData.length; i++) {
    const project = document.createElement("div");
    const projectTitle = document.createElement("h3");
    const projectCategory = document.createElement("div");
    const projectDescription = document.createElement("p");

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    const buttonArea = document.createElement("div");

    projectTitle.textContent = projectListData[i].title;
    projectCategory.textContent = projectListData[i].category;
    projectDescription.textContent = projectListData[i].description;

    editButton.textContent = "編集";
    deleteButton.textContent = "削除";

    project.appendChild(projectTitle);
    project.appendChild(projectCategory);
    project.appendChild(projectDescription);

    buttonArea.appendChild(editButton);
    buttonArea.appendChild(deleteButton);
    project.appendChild(buttonArea);

    projectList.appendChild(project);

    project.classList.add("project");

    project.addEventListener("click", function () {
      // 選択したプロジェクトを分かるようにする
      const selectedProjects = document.querySelectorAll(".project.selected");
      for (let j = 0; j < selectedProjects.length; j++) {
        selectedProjects[j].classList.remove("selected");
      }
      project.classList.add("selected");

      const projectElement = document.createElement("div");

      const detailTitle = document.createElement("h3");
      const detailCategory = document.createElement("p");
      const detailDescription = document.createElement("p");

      detailTitle.textContent = projectListData[i].title;
      detailCategory.textContent = "カテゴリー：" + projectListData[i].category;
      detailDescription.textContent = "説明：" + projectListData[i].description;

      projectElement.appendChild(detailTitle);
      projectElement.appendChild(detailCategory);
      projectElement.appendChild(detailDescription);

      projectDetail.innerHTML = "";
      projectDetail.appendChild(projectElement);

      // クリック詳細を閉じるボタン
      const closeButton = document.createElement("button");
      closeButton.textContent = "閉じる";
      closeButton.addEventListener("click", function () {
        projectDetail.innerHTML = "";
      });
      projectElement.appendChild(closeButton);
    });

    // 削除イベント
    deleteButton.addEventListener("click", function (e) {
      e.stopPropagation();
      const targetProject = currentProjects[i];
      deleteProject(targetProject);
    });
    // 編集イベント
    editButton.addEventListener("click", function (e) {
      e.stopPropagation();
      const targetProject = currentProjects[i];
      const originalIndex = projects.indexOf(targetProject);
      editProject(targetProject, originalIndex);
    });

  }
}

// ⑥ イベント
// 保存イベント
saveProject.addEventListener("click", function (e) {
  e.stopPropagation();
  if (editingIndex === null) {
    return;
  }
  projects[editingIndex].title = projectTitleInput.value;
  projects[editingIndex].category = projectCategoryInput.value;
  projects[editingIndex].description = projectDescriptionInput.value;
  saveProjects();
  filterProjects();
  actionMessage.textContent = "プロジェクトを更新しました";
  editingIndex = null;
  formMode.textContent = "プロジェクトを追加";
  projectTitleInput.value = "";
  projectCategoryInput.value = "";
  projectDescriptionInput.value = "";
});
// 追加イベント
addProjectButton.addEventListener("click", function () {
  addProject();
});
// 検索イベント
searchButton.addEventListener("click", function () {
  filterProjects();
});
// カテゴリーイベント
categoryFilter.addEventListener("change", function () {
  filterProjects();
});
// ソートイベント
sortFilter.addEventListener("change", function () {
  sortOrder = sortFilter.value;
  filterProjects();
});

// ⑦ 初期表示
filterProjects();