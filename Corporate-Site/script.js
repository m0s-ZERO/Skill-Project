// ハンバーガーメニュー
const menuButton = document.querySelector(".menu-button");
const headerNav = document.querySelector(".header-nav");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("is-open");
  headerNav.classList.toggle("is-open");
});

const navLinks = document.querySelectorAll(".header-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    headerNav.classList.remove("is-open");
    menuButton.classList.remove("is-open");
  });
});

// FAQアコーディオン
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const currentItem = question.closest(".faq-item");

    document.querySelectorAll(".faq-item.is-open").forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove("is-open");
      }
    });

    currentItem.classList.toggle("is-open");
  });
});

// スクロール時のヘッダーインタラクション
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 50) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
});