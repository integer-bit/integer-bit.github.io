import "./style.css";

// Interactive background effect
const hero = document.querySelector<HTMLElement>(".hero");
if (hero) {
  // NOTE: We explicitly type the event as MouseEvent
  hero.addEventListener("mousemove", (e: MouseEvent) => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Now we know hero is an HTMLElement, so getBoundingClientRect is safe
    const { left, top, width, height } = hero.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    // We can set CSS custom properties on hero directly
    hero.style.setProperty("--mouse-x", `${x * 100}%`);
    hero.style.setProperty("--mouse-y", `${y * 100}%`);
  });
}

// Hide header on scroll
let lastScroll = 0;
// We expect nav to be an HTMLElement with a classList
const nav = document.querySelector<HTMLElement>(".main-nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // If nav is null, the optional chaining operator ?. guards us
  if (nav) {
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.classList.add("nav-hidden");
    } else {
      nav.classList.remove("nav-hidden");
    }
  }

  lastScroll = currentScroll;
});

// Smooth scroll for navigation links
// We tell TypeScript that each anchor is an HTMLAnchorElement
const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
anchorLinks.forEach((anchor) => {
  anchor.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();

    // anchor.getAttribute("href") returns string | null
    const href = anchor.getAttribute("href");
    if (href) {
      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });
});

// Animate sections on scroll
const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // entry.target is an Element, but we know it's a section (HTMLElement)
      (entry.target as HTMLElement).classList.add("fade-in");
    }
  });
}, observerOptions);

// Find all sections and begin observing them
const allSections = document.querySelectorAll<HTMLElement>("section");
allSections.forEach((section) => {
  section.classList.add("fade-out");
  observer.observe(section);
});
