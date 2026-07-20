# Pranav Ekkaldevi — Portfolio Website

A modern, responsive personal portfolio website built with plain HTML, CSS, and JavaScript. Showcases experience, projects, skills, education, and certifications of a Java Full Stack Developer, with live GitHub activity and a working contact form.

🔗 **Live Demo:** _pranavekkaldevi.in_

---

## ✨ Features

- **Responsive design** — works smoothly across desktop, tablet, and mobile
- **Dark / light theme toggle** with preference saved in `localStorage`
- **Typing animation** in the hero section
- **Smooth scroll reveal animations** as sections come into view
- **Animated stat counters** (years of experience, projects, etc.)
- **Mobile-friendly hamburger navigation** with scrollspy (active link highlights as you scroll)
- **Filterable projects section** (filter by category/tech tab)
- **Live GitHub repositories widget** — fetches your latest repos via the GitHub REST API
- **Working contact form** powered by [Formspree](https://formspree.io) — submits via `fetch`, shows success/error state, no page reload
- **Back-to-top button**
- **Dynamic footer year**

---

## 🛠️ Built With

| Category | Technologies |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties / theming) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Icons | [Font Awesome](https://fontawesome.com) |
| Form backend | [Formspree](https://formspree.io) |
| Live data | [GitHub REST API](https://docs.github.com/en/rest) |

---

## 📁 Project Structure

```
├── index.html      # Main markup — all sections (Home, About, Experience,
│                    # Education, GitHub, Projects, Skills, Certifications, Contact)
├── styles.css       # All styling, including light/dark theme variables
├── script.js        # All interactivity (typing effect, theme toggle, nav,
│                    # scroll reveal, GitHub fetch, contact form, etc.)
└── README.md
```

This is a static site — no build step, bundler, or framework required.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PranavEkkaldevi/<repo-name>.git
cd <repo-name>
```

### 2. Open it locally

Just open `index.html` in your browser, or serve it with a simple local server:

```bash
# Python
python3 -m http.server 5500

# Node (with npx)
npx serve .
```

Then visit `http://localhost:5500`.

---

## ⚙️ Configuration

### GitHub username (live repos section)

In `script.js`, update:

```js
const GITHUB_USERNAME = "PranavEkkaldevi";
```

This powers the **GitHub Activity** section, which fetches your 3 most recently updated public repos via the GitHub API.

### Contact form (Formspree)

The contact form submits to a Formspree endpoint set in `index.html`:

```html
<form id="contactForm" action="https://formspree.io/f/xbdnowbp" method="POST">
```

To use your own form:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy your unique endpoint (`https://formspree.io/f/xxxxxxx`)
3. Replace the `action` URL above with your endpoint
4. Verify the destination email Formspree sends you

No backend or server-side code is needed — submissions are handled entirely by Formspree and delivered to your email.

---

## 📦 Deployment

Since this is a static site, it can be deployed for free on any static hosting platform:

- **GitHub Pages** — push to a repo and enable Pages in Settings
- **Netlify** — drag & drop the folder or connect the repo
- **Vercel** — import the repo, no build command needed

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📬 Contact

**Pranav Ekkaldevi**
GitHub: [@PranavEkkaldevi](https://github.com/PranavEkkaldevi)
