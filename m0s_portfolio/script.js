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
    nameMessage.textContent = nameInput.value + "さん!ありがとうございます！";
  }
});

// // Day11
// const works = [
//   {
//     title: "Skill Project",
//     category: "Web",
//   },
//   {
//     title: "Grow Value up",
//     category: "Music",
//   },
//   {
//     title: "NRS T-shirt",
//     category: "Design",
//   }
// ];
// console.log(works.length + "作品");
// for (let i = 0; i < works.length; i++) {
//   const workTitle = document.createElement("div");
//   const workCategory = document.createElement("div");
//   const project = document.querySelector(`#works-project${i + 1}`);
//   workTitle.textContent = works[i].title;
//   workCategory.textContent = "(" + works[i].category + ")";
//   project.appendChild(workTitle);
//   project.appendChild(workCategory);
//   workTitle.classList.toggle("work-title");
//   workCategory.classList.toggle("work-category");

//   // Day12,Day13
//   project.addEventListener("click", function (event) {
//     const detail = document.querySelector("#work-detail");
//     const detailText = document.querySelector("#detail-text");
//     const detailTitle = document.createElement("div");
//     const detailCategory = document.createElement("div");
//     detailText.textContent = "クリックされたプロジェクト"
//     detailTitle.textContent = "タイトル：" + works[i].title;
//     detailCategory.textContent = "カテゴリー：" + works[i].category;
//     detail.innerHTML = "";
//     detail.appendChild(detailTitle);
//     detail.appendChild(detailCategory);
//     detailTitle.classList.toggle("detail-title");
//     detailCategory.classList.toggle("detail-category");
//     console.log("タイトル：" + workTitle.textContent);
//     console.log("カテゴリー：" + workCategory.textContent);
//     console.log("クリックされた要素：" + event.target.textContent);

//     // Day14
//     detailText.classList.toggle("show-detail");
//     detail.classList.toggle("show-detail");
//     if (detailText.classList.contains("show-detail")) {
//       console.log("テキストが表示されています");
//     }
//     if (detail.classList.contains("show-detail")) {
//       console.log("詳細が表示されています");
//     }

//     // Day15
//     if (workTitle.textContent === "Skill Project") {
//       console.log("タイトル：" + workTitle.textContent + "が選択されました");
//       console.log("タイトル：" + workCategory.textContent + "が選択されました");
//     } else if (workTitle.textContent === "Grow Value up") {
//       console.log("タイトル：" + workTitle.textContent + "が選択されました");
//       console.log("タイトル：" + workCategory.textContent + "が選択されました");
//     } else if (workTitle.textContent === "NRS T-shirt") {
//       console.log("タイトル：" + workTitle.textContent + "が選択されました");
//       console.log("タイトル：" + workCategory.textContent + "が選択されました");
//     }

//     // Day16
//     function Click(title, category) {
//       console.log("タイトル：" + title + "が選択されました");
//       console.log("タイトル：" + category + "が選択されました");
//     }
//     Click(workTitle.textContent, workCategory.textContent);

//     function getWorkInfo(title, category) {
//       return "タイトル：" + title + " / カテゴリー：" + category;
//     }
//     const result = getWorkInfo(works[i].title, works[i].category);
//     console.log(result);

//     // Day17
//     const clickWorkInfo = document.querySelector("#click");
//     const clickInfo = document.createElement("div");
//     clickWorkInfo.textContent = getWorkInfo(works[i].title, works[i].category);
//     clickWorkInfo.appendChild(clickInfo);

//     // Day18
//     function workInfo(work) {
//       return work.title + "/" + work.category;
//     }
//     const resultWork = workInfo(works[i]);
//     console.log(resultWork);
//     const WorkInfo = document.querySelector("#work-info");
//     const work = document.createElement("div");
//     work.textContent = resultWork;
//     WorkInfo.appendChild(work);

//     // Day19
//     // 作品情報を作る関数
//     function clickFunc(clickWork) {
//       return clickWork.title + "/" + clickWork.category;
//     }
//     const clickRes = clickFunc(works[i]);
//     console.log("クリックされた要素：" + event.target.textContent);
//     console.log(clickRes);
//     detail.textContent = clickRes;
//     }
//   )
// }

// -------------------------------------------
//【作品データ】
// works→作品全部→works[i]→現在の1作品

// 【作品一覧】
// project→作品全体
// workTitle→タイトル
// workCategory→カテゴリー

// 【詳細表示】
// detail→詳細エリア
// detailText→「クリックされたプロジェクト」
// detailTitle→詳細タイトル
// detailCategory→詳細カテゴリー

// 【関数】
// Click()→選択された情報をConsole表示
// getWorkInfo()→タイトル＋カテゴリーを文字列化
// workInfo()→作品オブジェクトから情報を取得
// clickFunc()→クリックされた作品情報を作る
// showWorkInfo()→作品情報を画面に表示 ← Day20で整理する
// -------------------------------------------

// Day20,Day21,Day22,Day23
// ① 作品データ
const works = [
  {
    title: "Skill Project",
    category: "Web",
    description: "JavaScriptを学習しながら制作しているポートフォリオ",
    url: "https://github.com/m0s-ZERO/Skill-Project/tree/main/m0s_portfolio"
  },
  {
    title: "Grow Value up",
    category: "Music",
    description: "m0sが出した曲",
    url: "https://music.apple.com/jp/song/grow-value-up/1791005208"
  },
  {
    title: "NRS T-shirt",
    category: "Design",
    description: "高校からの3人組の服作成",
    url: "https://mochy-nrs.github.io/"
  }
];

// ② 作品情報を作る関数
function getWorkInfo(work) {
  return "クリックしたプロジェクト"
    + "\nタイトル：" + work.title
    + " / カテゴリー：" + work.category
    + "\n説明：" + work.description;
}

// ③ 作品情報を画面に表示する関数
function showWorkInfo(work) {
  const detail = document.querySelector("#work-detail");
  const workElement = document.createElement("div");
  const link = document.createElement("a");

  workElement.textContent = getWorkInfo(work);

  link.textContent = "作品を見る";
  link.href = work.url;
  link.target = "_blank";
  link.setAttribute("rel", "noopener noreferrer");

  detail.innerHTML = "";
  detail.appendChild(workElement);
  detail.appendChild(link);
  detail.classList.toggle("work-detail");
  link.classList.toggle("work-detail a");

}

// ④ 作品一覧を作る
for (let i = 0; i < works.length; i++) {
  const project = document.querySelector(`#works-project${i + 1}`);

  const workTitle = document.createElement("div");
  const workCategory = document.createElement("div");
  const workDescription = document.createElement("div");

  workTitle.textContent = works[i].title;
  workCategory.textContent = "(" + works[i].category + ")";
  workDescription.textContent = works[i].description;

  project.appendChild(workTitle);
  project.appendChild(workCategory);
  project.appendChild(workDescription);

  workTitle.classList.toggle("work-title");
  workCategory.classList.toggle("work-category");

  // ⑤ 作品をクリックしたら詳細を表示
  project.addEventListener("click", function (e) {
    console.log("クリックされた要素：" + e.target.textContent);
    console.log(works[i].url);
    showWorkInfo(works[i]);
  });
}
