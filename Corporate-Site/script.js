// ハンバーガーメニュー
const menuButton = document.querySelector(".menu-button");
const headerNav = document.querySelector(".header-nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.classList.toggle("is-open");

  headerNav.classList.toggle("is-open");

  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "メニューを閉じる" : "メニューを開く"
  );
});

const navLinks = document.querySelectorAll(".header-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    headerNav.classList.remove("is-open");
    menuButton.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
  });
});

// FAQアコーディオン
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const currentItem = question.closest(".faq-item");
    const isOpen = currentItem.classList.contains("is-open");

    document.querySelectorAll(".faq-item.is-open").forEach((item) => {
      item.classList.remove("is-open");

      const button = item.querySelector(".faq-question");
      button.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      currentItem.classList.add("is-open");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

// スクロール時のヘッダーインタラクション
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
});