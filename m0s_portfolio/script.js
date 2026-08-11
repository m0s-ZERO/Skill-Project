// Day8
console.log("m0s portfolio");

// Day9
const title = document.querySelector("#title");
const message = document.querySelector("#message");
const button = document.querySelector("#changeButton");
button.addEventListener("click", function () {
  title.textContent = "ZERO";
  message.textContent = "ボタンが押されました！";
  title.classList.toggle("active");
});

// Day10
const nameInput = document.querySelector("#nameInput");
const showButton = document.querySelector("#showButton");
const nameMessage = document.querySelector("#nameMessage");
showButton.addEventListener("click", function () {
  if (nameInput.value === "") {
    nameMessage.classList.toggle("red-active");
    nameMessage.textContent = "名前を入力してください"
  } else {
    nameMessage.classList.toggle("blue-active");
    nameMessage.textContent = "ありがとうございます！" + nameInput.value + "さん";
  }
});

// Day11
const works = [
  {
    title: "Skill Project",
    category: "(Web)",
  },
  {
    title: "Grow Value up",
    category: "(Music)",
  },
  {
    title: "NRS T-shirt",
    category: "(Design)",
  }
];
console.log(works.length + "作品");
for (let i = 0; i < works.length; i++) {
  const workTitle = document.createElement("div");
  const workCategory = document.createElement("div");
  const project = document.querySelector(`#works-project${i + 1}`);
  workTitle.textContent = works[i].title;
  workCategory.textContent = works[i].category;
  project.appendChild(workTitle);
  project.appendChild(workCategory);
  workTitle.classList.toggle("work-title");
  workCategory.classList.toggle("work-category");
}