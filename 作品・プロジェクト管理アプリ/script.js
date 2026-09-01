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

function renderProjects() {
  projectList.textContent = "";
  for (let i = 0; i < projects.length; i++) {
    const project = document.createElement("div");

    const projectTitle = document.createElement("div");
    const projectCategory = document.createElement("div");
    const projectDescription = document.createElement("div");

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    projectTitle.textContent = projects[i].title;
    projectCategory.textContent = projects[i].category;
    projectDescription.textContent = projects[i].description;

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
        + "\nタイトル：" + projects[i].title
        + " \nカテゴリー：" + projects[i].category
        + "\n説明：" + projects[i].description;
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
      projectTitleInput.value = projects[i].title;
      projectCategoryInput.value = projects[i].category;
      projectDescriptionInput.value = projects[i].description;
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
renderProjects();


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
