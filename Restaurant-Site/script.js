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
