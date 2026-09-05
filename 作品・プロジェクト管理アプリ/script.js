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
// リロード復元
const savedProjects = localStorage.getItem("projects");
console.log(savedProjects);
if (savedProjects !== null) {
  projects = JSON.parse(savedProjects);
}

const originalProjects = [...projects];
const projectList = document.querySelector("#project-list");
// 現在表示されているプロジェクトを保持するための変数
let currentProjects = projects;
// 編集するための定義
let editingIndex = null;

// 再描画関数
function renderProjects(projectListData) {
  projectList.textContent = "";
  for (let i = 0; i < projectListData.length; i++) {
    const project = document.createElement("div");

    const projectTitle = document.createElement("div");
    const projectCategory = document.createElement("div");
    const projectDescription = document.createElement("div");

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    projectTitle.textContent = projectListData[i].title;
    projectCategory.textContent = projectListData[i].category;
    projectDescription.textContent = projectListData[i].description;

    deleteButton.textContent = "削除";
    editButton.textContent = "編集";

    project.appendChild(projectTitle);
    project.appendChild(projectCategory);
    project.appendChild(projectDescription);
    project.appendChild(deleteButton);
    project.appendChild(editButton);

    projectList.appendChild(project);

    project.classList.add("project");

    project.addEventListener("click", function () {
      const detail = document.querySelector("#project-detail");
      const projectElement = document.createElement("div");
      projectElement.textContent = "クリックしたプロジェクト"
        + "\nタイトル：" + projectListData[i].title
        + " \nカテゴリー：" + projectListData[i].category
        + "\n説明：" + projectListData[i].description;
      detail.innerHTML = "";
      detail.appendChild(projectElement);
    });

    // 「削除」をクリックしたときの処理
    deleteButton.addEventListener("click", function (e) {
      e.stopPropagation();
      const targetProject = currentProjects[i];
      const originalIndex = projects.indexOf(targetProject);
      projects.splice(originalIndex, 1);
      saveProjects();
      filterProjects();
    });

    // 「編集」をクリックしたときの処理
    editButton.addEventListener("click", function (e) {
      e.stopPropagation();
      const targetProject = currentProjects[i];
      const originalIndex = projects.indexOf(targetProject);
      editingIndex = originalIndex;
      projectTitleInput.value = targetProject.title;
      projectCategoryInput.value = targetProject.category;
      projectDescriptionInput.value = targetProject.description;
    });

  }
}
renderProjects(projects);

// リロードしてもデータを保存する処理
function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// 編集したプロジェクトを保存するための定義
const saveProject = document.querySelector("#save-project");
// 「保存」をクリックしたときの処理
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
  editingIndex = null;
});

// 新しい作品を追加するための定義
const addProject = document.querySelector("#add-project");
const projectTitleInput = document.querySelector("#project-title");
const projectCategoryInput = document.querySelector("#project-category");
const projectDescriptionInput = document.querySelector("#project-description");
const blankCheck = document.querySelector("#blank-check");

// 「追加」をクリックしたときの処理
addProject.addEventListener("click", function () {
  if (projectTitleInput.value === "" ||
    projectCategoryInput.value === "" ||
    projectDescriptionInput.value === "") {
    // 空欄の場合
    blankCheck.textContent = "全て入力してください";
  } else {
    // 入力されている場合
    projects.push({
      title: projectTitleInput.value,
      category: projectCategoryInput.value,
      description: projectDescriptionInput.value
    });
    saveProjects();
    filterProjects();
    projectTitleInput.value = "";
    projectCategoryInput.value = "";
    projectDescriptionInput.value = "";
  }
});

// 検索機能
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", function () {
  filterProjects();
});

// カテゴリー絞り込み機能
const categoryFilter = document.querySelector("#category-filter");
let filteredCategory;
categoryFilter.addEventListener("change", function () {
  filterProjects();
});

// 「検索」+「カテゴリー絞り込み」機能
function filterProjects() {
  // ① keywordを取得
  const keyword = searchInput.value;
  // ② projectsをfilter
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
  // ③ 0件チェック
  const searchResult = document.querySelector("#search-result");
  searchResult.textContent = "";
  if (currentProjects.length === 0) {
    searchResult.textContent = "該当するプロジェクトがありません";
  }
  // ④ render
  renderProjects(currentProjects);
}

// ソート
let sortOrder = "reset";
const sortFilter = document.querySelector("#sort-filter");
sortFilter.addEventListener("change", function () {
  sortOrder = sortFilter.value;
  filterProjects();
});