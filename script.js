// === Smooth Scrolling for all internal links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// === Scroll Reveal Animation ===
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Animate only once
      }
    });
  },
  { threshold: 0.2 }
);

// Apply observer to sections and cards
document.querySelectorAll("section, .project-card, .skill-card").forEach(el => {
  el.classList.add("hidden"); // start hidden
  observer.observe(el);
});

// === Typing Effect in Hero Section ===
const roles = ["Frontend Developer", "Data Analyst"];
let roleIndex = 0;
let charIndex = 0;
const typingSpeed = 120;
const erasingSpeed = 80;
const delayBetweenRoles = 2000;

const heroParagraph = document.querySelector(".hero-text p");
if (heroParagraph) {
  heroParagraph.innerHTML = 'Aspiring <strong><span class="typing"></span></strong><br>Passionate about crafting solutions.';
}
const typingSpan = document.querySelector(".typing");

function type() {
  if (charIndex < roles[roleIndex].length) {
    typingSpan.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenRoles);
  }
}

function erase() {
  if (charIndex > 0) {
    typingSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingSpan) setTimeout(type, 500);
});

// Always start at top on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
