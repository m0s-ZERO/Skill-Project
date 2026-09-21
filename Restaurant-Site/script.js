// ▫データ
// ▫DOM
// ▫状態
// ▫関数
// ▫イベント
// ▫初期表示



// スムーススクロール
const navLinks = document.querySelectorAll(".site-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Headerのスクロール制御
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Menuインタラクション
const menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// Galleryインタラクション
const galleryItems = document.querySelectorAll(".gallery-item");
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// 過去の日付の来店日を選べないようにする
const today = new Date();
const dateInput = document.querySelector("#date");
dateInput.min = today.toISOString().split("T")[0];

// 予約ボタンインタラクション
const reservationForm = document.querySelector(".reservation-form");
reservationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const message = document.querySelector("#message").value;
  if (errorCheck()) {
    alert(
      "予約内容を確認しました\n\n" +
      "お名前：" + document.querySelector("#name").value + "\n" +
      "メール：" + document.querySelector("#email").value + "\n" +
      "電話番号：" + document.querySelector("#phone").value + "\n" +
      "ご来店日：" + document.querySelector("#date").value + "\n" +
      "ご来店時間：" + document.querySelector("#time").value + "\n" +
      "人数：" + document.querySelector("#guests").value +
      "\n" +
      "ご要望・備考：" + document.querySelector("#message").value +
      "\n\n" +
      "ご入力いただいた内容を確認のうえ、担当者よりご連絡いたします。"

    );
  }
});

// エラーチェック関数
function errorCheck() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const date = document.querySelector("#date").value;
  const time = document.querySelector("#time").value;
  const guests = document.querySelector("#guests").value;
  if (name === "") {
    alert("お名前を入力してください");
    return false;
  }
  if (email === "") {
    alert("メールアドレスを入力してください");
    return false;
  }
  if (phone === "") {
    alert("電話番号を入力してください");
    return false;
  }
  if (date === "") {
    alert("ご来店日を入力してください");
    return false;
  }
  if (time === "") {
    alert("ご来店時間を入力してください");
    return false;
  }
  if (guests === "") {
    alert("人数を入力してください");
    return false;
  }
  return true;
}
