const projects = [
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

const projectList = document.querySelector("#project-list");

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
      projects.splice(i, 1);
      renderProjects();
    });

    // 編集するための定義
    let editingIndex = null;
    // 「編集」をクリックしたときの処理
    editButton.addEventListener("click", function (e) {
      e.stopPropagation();
      editingIndex = i;
      projectTitleInput.value = projectListData[i].title;
      projectCategoryInput.value = projectListData[i].category;
      projectDescriptionInput.value = projectListData[i].description;
    });

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
      renderProjects();
      editingIndex = null;
    });

  }
}
renderProjects(projects);


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
    renderProjects();
    projectTitleInput.value = "";
    projectCategoryInput.value = "";
    projectDescriptionInput.value = "";
  }
});

// 検索機能
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", function () {
  const keyword = searchInput.value;
  const searchResult = document.querySelector("#search-result");
  searchResult.textContent = "";
  const filteredProjects = projects.filter(function (project) {
    return project.title.toLowerCase().includes(keyword.toLowerCase()) || project.category.toLowerCase().includes(keyword.toLowerCase());
  });

  if (filteredProjects.length === 0) {
    searchResult.textContent = "該当するプロジェクトがありません";
  }
  renderProjects(filteredProjects);
});