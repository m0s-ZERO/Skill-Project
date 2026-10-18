// =========================
// SCROLL ANIMATION
// =========================

const animatedElements = document.querySelectorAll(
  ".service-detail-section, .service-detail-cta"
);

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  }
);

animatedElements.forEach((element) => {
  observer.observe(element);
});