// ▫データ
// ▫DOM
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

const categoryButtons = document.querySelectorAll(".category-button");
const galleryItems = document.querySelectorAll(".gallery-item");

const galleryModal = document.querySelector(".gallery-modal");
const modalImage = galleryModal.querySelector("img");
const modalClose = galleryModal.querySelector(".modal-close");

const faqQuestions = document.querySelectorAll(".faq-question");

const reservationForm = document.querySelector(".reservation-form");

// ▫状態
// ▫関数
// ▫イベント

// ハンバーガーメニュー
menuButton.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
  });
});

// カテゴリー切り替え
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    categoryButtons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
    galleryItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// 画像の拡大表示(モーダル)
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    galleryModal.style.display = "flex";
  });
});
modalClose.addEventListener("click", () => {
  galleryModal.style.display = "none";
});
galleryModal.addEventListener("click", (event) => {
  if (event.target === galleryModal) {
    galleryModal.style.display = "none";
  }
});

// FAQ開閉機能
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector(".faq-icon");
    const isOpen = answer.style.display === "block";
    answer.style.display = isOpen ? "none" : "block";
    icon.textContent = isOpen ? "＋" : "−";
  });
});

// 予約フォームインタラクション
reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const requiredFields = reservationForm.querySelectorAll("[required]");
  for (const field of requiredFields) {
    if (!field.value) {
      alert("必須項目を入力してください。");
      field.focus();
      return;
    }
  }
  alert("予約内容を受け付けました。");
  reservationForm.reset();
});

// ▫初期表示