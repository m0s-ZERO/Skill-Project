// ==============================
// DOM Loaded
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  console.log("m0s Portfolio loaded");

  // Custom cursor
  const cursor = document.querySelector(".custom-cursor");
  if (!cursor) return;
  const cursorText = cursor.querySelector("span");
  const defaultCursorText = "●";

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.classList.remove("is-hidden");
    cursor.classList.add("is-visible");
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-visible");
    cursor.classList.add("is-hidden");
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "";
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const hoverTargets = document.querySelectorAll("a, button");

  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      cursor.classList.add("is-hover");

      const cursorLabel = target.dataset.cursor;

      if (cursorLabel) {
        cursor.classList.add("is-changing");

        setTimeout(() => {
          cursorText.textContent = cursorLabel;

          cursor.classList.remove("is-changing");
          cursor.classList.add(`is-${cursorLabel.toLowerCase()}`);
        }, 150);
      }

    });

    target.addEventListener("mouseleave", () => {
      cursor.classList.remove(
        "is-hover",
        "is-menu",
        "is-view",
        "is-contact"
      );

      cursorText.textContent = defaultCursorText;
    });
  });

  // Menu
  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll(".menu a");
  const menuClose = document.querySelector(".menu-close");

  let menuScrollPosition = 0;

  menuButton.addEventListener("click", () => {
    if (!menu.classList.contains("is-open")) {
      menuScrollPosition = window.scrollY;
    }

    menu.classList.toggle("is-open");
    menuClose.classList.toggle("is-visible");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuClose.classList.remove("is-visible");
    });
  });

  menuClose.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuClose.classList.remove("is-visible");

    window.scrollTo({
      top: menuScrollPosition,
      behavior: "smooth"
    });
  });

  // Header scroll
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  });

  // Hero load animation
  const hero = document.querySelector(".hero");

  window.addEventListener("load", () => {
    hero.classList.add("is-loaded");
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll(
    ".about-content, .about-image, .skills-header, .skill-item, .works-header, .work-item, .service-header, .service-item, .contact-content"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // Contact background
  const contact = document.querySelector(".contact");

  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          contact.classList.add("is-visible");
          cursor.classList.add("is-light");
        } else {
          contact.classList.remove("is-visible");
          cursor.classList.remove("is-light");
        }
      });
    },
    {
      threshold: 0.3
    }
  );

  contactObserver.observe(contact);

});