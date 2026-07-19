// ===================== Typing effect =====================
const roles = ["I build modern Full Stack web applications."];
const typedEl = document.getElementById("typedRole");
let roleIndex = 0,
  charIndex = 0,
  deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// ===================== Mobile nav =====================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ===================== Theme toggle =====================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeIcon.className =
    theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
  localStorage.setItem("theme", theme);
}
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(current);
});

// ===================== Back to top =====================
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===================== Project filter tabs =====================
const filterTabs = document.querySelectorAll(".filter-tab");
const projectCards = document.querySelectorAll(".project-card");
filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const filter = tab.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
    });
  });
});

// ===================== GitHub Activity (best effort live check) =====================
// TODO: set your GitHub username below to enable this section (e.g. "pranav-ekkaldevi")
const GITHUB_USERNAME = "PranavEkkaldevi";

const githubStatus = document.getElementById("githubStatus");
if (!GITHUB_USERNAME) {
  githubStatus.innerHTML =
    "<p>Add your GitHub username in script.js (GITHUB_USERNAME) to show live repositories here.</p>";
} else {
  fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=3`,
  )
    .then((res) => {
      if (!res.ok) throw new Error("GitHub API error");
      return res.json();
    })
    .then((repos) => {
      if (!Array.isArray(repos) || repos.length === 0) {
        githubStatus.innerHTML = "<p>No public repositories found.</p>";
        return;
      }
      githubStatus.innerHTML = repos
        .map(
          (r) => `
        <div class="exp-card" style="text-align:left; margin-bottom:16px;">
          <div class="exp-head">
            <div>
              <h3>${r.name}</h3>
              <p class="exp-company">${r.description ? r.description : "No description provided."}</p>
            </div>
            <div class="exp-dates">
              <span><i class="fa-regular fa-star"></i> ${r.stargazers_count}</span>
              <span><i class="fa-solid fa-code-fork"></i> ${r.forks_count}</span>
            </div>
          </div>
        </div>
      `,
        )
        .join("");
    })
    .catch(() => {
      githubStatus.innerHTML = "<p>Failed to load GitHub repositories</p>";
    });
}

// ===================== Scroll reveal (content loads in as you scroll down) =====================
const revealTargets = document.querySelectorAll(".reveal, .reveal-group");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
);
revealTargets.forEach((el) => revealObserver.observe(el));

// ===================== Animated stat counters =====================
const statNums = document.querySelectorAll(".stat-num");
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);
statNums.forEach((el) => statObserver.observe(el));

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current;
  }, 30);
}

// ===================== Contact form (Formspree) =====================
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  formStatus.textContent = "Sending...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      formStatus.textContent =
        "Thanks! Your message has been sent successfully.";
      contactForm.reset();
    } else {
      const data = await response.json().catch(() => null);
      formStatus.textContent =
        data && data.errors
          ? data.errors.map((err) => err.message).join(", ")
          : "Oops! Something went wrong. Please try again.";
    }
  } catch (error) {
    formStatus.textContent =
      "Oops! Something went wrong. Please check your connection and try again.";
  } finally {
    submitBtn.disabled = false;
  }
});

// ===================== Footer year =====================
document.getElementById("year").textContent = new Date().getFullYear();

// ===================== Scrollspy for nav active state =====================
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-link");
const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" },
);
sections.forEach((sec) => spyObserver.observe(sec));
