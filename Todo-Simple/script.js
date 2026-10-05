const input = document.querySelector("#input");
const button = document.querySelector("#button");
const task = document.querySelector("#task");
const tasks = [];


function renderTasks() {
  task.textContent = "";
  for (let i = 0; i < tasks.length; i++) {
    // ここでtasks[i]を使う
    const taskElement = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    taskElement.textContent = "・" + tasks[i].title;
    if (tasks[i].completed) {
      taskElement.classList.add("completed");
    }
    task.appendChild(taskElement);
    taskElement.appendChild(deleteButton);

    taskElement.addEventListener("click", function () {
      // クリックされたとき
      tasks[i].completed = !tasks[i].completed;
      if (tasks[i].completed) {
        // completedクラスを追加
        taskElement.classList.add("completed");
      } else {
        taskElement.classList.remove("completed");
      }
    });

    deleteButton.addEventListener("click", function (e) {
      e.stopPropagation();
      tasks.splice(i, 1);
      renderTasks();
    });

  }
}

button.addEventListener("click", function () {
  // ここにクリックされたときの処理
  if (input.value === "") {
    // 空欄の場合
    task.textContent = "タスクを入力してください";
  } else {
    // 入力されている場合
    task.textContent = input.value;
    tasks.push({ title: input.value, completed: false });
    renderTasks();
  }
});
