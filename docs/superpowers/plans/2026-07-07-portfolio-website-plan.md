# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (English/Hebrew) static portfolio site for Sarale Gamliel with a home page (hero, about, skills, experience, 6 project cards) and one shared project-detail page template, deployable to GitHub Pages and maintainable by editing a single data file.

**Architecture:** Static HTML/CSS/vanilla JS, no build tools, no framework. Content lives in `js/data.js` (project facts) and `js/i18n.js` (all displayed strings, en+he). Pure rendering logic lives in `js/render.js` (unit-tested with Node's built-in `node:test`). Thin DOM-glue scripts (`js/main.js`, `js/project.js`) wire the pure functions to `index.html` and `project.html`. Every JS module uses a dual CommonJS/browser-global export so the same file can be `require()`'d in tests and `<script src="...">`'d in the browser with no bundler.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript (ES2017+), Node.js built-in test runner (`node:test` + `node:assert/strict`, zero dependencies), Google Fonts (Inter), GitHub Pages for hosting.

## Global Constraints

- No build step, no npm dependencies, no framework — must stay editable by a non-technical maintainer.
- Every string visible on the page must exist in both `en` and `he` and must render correctly in both `dir="ltr"` and `dir="rtl"`.
- The 3 projects without live links yet (LifeSaver, grocery store, gadgets store) show a "Coming soon" badge instead of dead links; adding their links later is a one-line edit to `js/data.js`, no HTML/CSS changes required.
- Visual theme (locked in during brainstorming): background `#fafafa`, surface `#ffffff`, text `#1a1a1a`, secondary text `#5f6368`, border `#e8e8ec`, accent `#6d5bd0` / accent-dark `#5945b3` / accent-soft `#efeafc`, font Inter.
- Deployment target: new GitHub repo `sarale-gamliel.github.io` under the `Sarale-Gamliel` account — pushing to GitHub is a visible, public action and must be explicitly confirmed with Sarale before it happens (Task 8).

---

### Task 1: Project scaffold

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `css/style.css`
- Create: `index.html` (placeholder shell)
- Create: `project.html` (placeholder shell)

**Interfaces:**
- Produces: CSS custom properties (`--bg`, `--surface`, `--text`, `--text-secondary`, `--border`, `--accent`, `--accent-dark`, `--accent-soft`, `--radius`, `--shadow`, `--shadow-hover`, `--font-sans`, `--max-width`) and a `.container` class that every later task's CSS relies on.

- [ ] **Step 1: Create `.gitignore`**

```
.superpowers/
node_modules/
```

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "sarale-gamliel-portfolio",
  "private": true,
  "scripts": {
    "test": "node --test tests/"
  }
}
```

- [ ] **Step 3: Create `css/style.css` with design tokens and a reset**

```css
:root {
  --bg: #fafafa;
  --surface: #ffffff;
  --text: #1a1a1a;
  --text-secondary: #5f6368;
  --border: #e8e8ec;
  --accent: #6d5bd0;
  --accent-dark: #5945b3;
  --accent-soft: #efeafc;
  --radius: 12px;
  --shadow: 0 2px 10px rgba(20, 20, 40, 0.06);
  --shadow-hover: 0 8px 24px rgba(20, 20, 40, 0.12);
  --font-sans: 'Inter', -apple-system, 'Segoe UI', sans-serif;
  --max-width: 1080px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html, body { height: 100%; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }

a { color: inherit; text-decoration: none; }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

button, .btn {
  font-family: inherit;
  cursor: pointer;
  border: none;
}
```

- [ ] **Step 4: Create a placeholder `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sarale Gamliel — AI Product Developer | Full Stack Developer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <main class="container">
    <h1>Scaffold OK</h1>
  </main>
</body>
</html>
```

- [ ] **Step 5: Create a placeholder `project.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project — Sarale Gamliel</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <main class="container">
    <h1>Scaffold OK</h1>
  </main>
</body>
</html>
```

- [ ] **Step 6: Verify in browser**

Run: open `index.html` in a browser (double-click it, or `start index.html` on Windows).
Expected: page background is a very light grey, heading "Scaffold OK" renders in the Inter font (check DevTools → Elements → computed `font-family` includes "Inter"), no errors in the DevTools console.

- [ ] **Step 7: Commit**

```bash
git add .gitignore package.json css/style.css index.html project.html
git commit -m "Scaffold static site with design tokens"
```

---

### Task 2: Project data module

**Files:**
- Create: `js/data.js`
- Test: `tests/data.test.js`

**Interfaces:**
- Produces: `PROJECTS_DATA` — an array of exactly 6 project objects, each shaped as:
  ```
  {
    id: string,
    name: { en: string, he: string },
    shortDescription: { en: string, he: string },
    fullDescription: { en: string, he: string },
    tech: string[],
    links: { github: string|null, demo: string|null },
    image: string,
    subLinks?: [{ name: { en: string, he: string }, github: string|null, demo: string|null }]
  }
  ```
  Exposed as `module.exports.PROJECTS_DATA` (Node) and `window.Data.PROJECTS_DATA` (browser). Later tasks (`render.js`, `main.js`, `project.js`) read this shape directly.

- [ ] **Step 1: Write the failing test**

Create `tests/data.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { PROJECTS_DATA } = require('../js/data.js');

test('has exactly 6 projects', () => {
  assert.equal(PROJECTS_DATA.length, 6);
});

test('every project has the required bilingual fields', () => {
  for (const p of PROJECTS_DATA) {
    assert.ok(p.id, `project missing id: ${JSON.stringify(p)}`);
    assert.ok(p.name && p.name.en && p.name.he, `project ${p.id} missing bilingual name`);
    assert.ok(p.shortDescription && p.shortDescription.en && p.shortDescription.he, `project ${p.id} missing bilingual shortDescription`);
    assert.ok(p.fullDescription && p.fullDescription.en && p.fullDescription.he, `project ${p.id} missing bilingual fullDescription`);
    assert.ok(Array.isArray(p.tech) && p.tech.length > 0, `project ${p.id} missing tech list`);
    assert.ok(p.links && ('github' in p.links) && ('demo' in p.links), `project ${p.id} missing links object`);
    assert.ok(p.image, `project ${p.id} missing image path`);
  }
});

test('project ids are unique', () => {
  const ids = PROJECTS_DATA.map(p => p.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('cliq-trivia has a live demo and github link', () => {
  const project = PROJECTS_DATA.find(p => p.id === 'cliq-trivia');
  assert.equal(project.links.demo, 'https://cliq-trivia-app.vercel.app/');
  assert.equal(project.links.github, 'https://github.com/Sarale-Gamliel/cliq-trivia');
});

test('mini-games has 3 subLinks', () => {
  const project = PROJECTS_DATA.find(p => p.id === 'mini-games');
  assert.equal(project.subLinks.length, 3);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/data.test.js`
Expected: FAIL with `Cannot find module '../js/data.js'`

- [ ] **Step 3: Write `js/data.js`**

```js
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Data = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  const PROJECTS_DATA = [
    {
      id: 'cliq-trivia',
      name: { en: 'CLIQ Trivia', he: 'CLIQ טריוויה' },
      shortDescription: {
        en: 'AI-powered interactive trivia platform for live events.',
        he: 'פלטפורמת טריוויה אינטראקטיבית מבוססת AI לאירועים חיים.'
      },
      fullDescription: {
        en: 'Interactive live trivia platform designed for engaging events. Built with modern technologies, featuring responsive UX, real-time interaction, and AI-assisted development workflows.',
        he: 'פלטפורמת טריוויה אינטראקטיבית לאירועים חיים. נבנתה עם טכנולוגיות מודרניות, כוללת חוויית משתמש רספונסיבית, אינטראקציה בזמן אמת, ותהליכי פיתוח בסיוע AI.'
      },
      tech: ['React', 'Node.js', 'Supabase', 'Vercel', 'Tailwind CSS', 'Framer Motion'],
      links: { github: 'https://github.com/Sarale-Gamliel/cliq-trivia', demo: 'https://cliq-trivia-app.vercel.app/' },
      image: 'assets/projects/cliq-trivia.svg'
    },
    {
      id: 'lifesaver',
      name: { en: 'LifeSaver', he: 'לייפסייבר' },
      shortDescription: {
        en: 'Real-time first aid support platform for emergency responders.',
        he: 'פלטפורמת תמיכה בזמן אמת למגישי עזרה ראשונה.'
      },
      fullDescription: {
        en: 'Emergency assistance platform featuring responsive design, role-based authentication, and real-time user support capabilities.',
        he: 'פלטפורמת סיוע בשעת חירום, כוללת עיצוב רספונסיבי, הרשאות מבוססות תפקיד, ותמיכה בזמן אמת.'
      },
      tech: ['React', 'Node.js', 'MongoDB'],
      links: { github: null, demo: null },
      image: 'assets/projects/lifesaver.svg'
    },
    {
      id: 'grocery-store',
      name: { en: 'Grocery Store', he: 'חנות מכולת' },
      shortDescription: {
        en: 'AI-enhanced online grocery shopping experience.',
        he: 'חוויית קנייה אונליין חכמה למכולת.'
      },
      fullDescription: {
        en: 'Modern online shopping experience focused on intuitive UX, conversion optimization, and seamless digital ordering. Built with automated workflows, email notifications, and integrated payment solutions.',
        he: 'חוויית קנייה אונליין מודרנית המתמקדת בממשק משתמש אינטואיטיבי, אופטימיזציית המרה, והזמנה דיגיטלית חלקה. נבנתה עם תהליכים אוטומטיים, התראות מייל, ופתרונות תשלום משולבים.'
      },
      tech: ['React', 'Next.js', 'Supabase', 'Vercel', 'Resend', 'Payment Integrations'],
      links: { github: null, demo: null },
      image: 'assets/projects/grocery-store.svg'
    },
    {
      id: 'gadgets-store',
      name: { en: 'Gadgets Store', he: "חנות גאדג'טים" },
      shortDescription: {
        en: 'AI-enhanced online gadget shopping experience.',
        he: "חוויית קנייה אונליין חכמה לגאדג'טים."
      },
      fullDescription: {
        en: 'Modern online shopping experience focused on intuitive UX, conversion optimization, and seamless digital ordering. Built with automated workflows, email notifications, and integrated payment solutions.',
        he: 'חוויית קנייה אונליין מודרנית המתמקדת בממשק משתמש אינטואיטיבי, אופטימיזציית המרה, והזמנה דיגיטלית חלקה. נבנתה עם תהליכים אוטומטיים, התראות מייל, ופתרונות תשלום משולבים.'
      },
      tech: ['React', 'Next.js', 'Supabase', 'Vercel', 'Resend', 'Payment Integrations'],
      links: { github: null, demo: null },
      image: 'assets/projects/gadgets-store.svg'
    },
    {
      id: 'landing-page',
      name: { en: "Brother's Landing Page", he: 'דף נחיתה' },
      shortDescription: {
        en: 'A landing page built for a personal client.',
        he: 'דף נחיתה שנבנה עבור לקוח פרטי.'
      },
      fullDescription: {
        en: 'A responsive landing page built end-to-end with vanilla HTML, CSS, and JavaScript, focused on a clean message and a clear call to action.',
        he: 'דף נחיתה רספונסיבי שנבנה מקצה לקצה ב-HTML, CSS ו-JavaScript, עם מסר ברור וקריאה לפעולה.'
      },
      tech: ['HTML', 'CSS', 'JavaScript'],
      links: { github: 'https://github.com/Sarale-Gamliel/israeldafna', demo: 'https://sarale-gamliel.github.io/israeldafna/' },
      image: 'assets/projects/landing-page.svg'
    },
    {
      id: 'mini-games',
      name: { en: 'Mini Games Collection', he: 'מיני-משחקים' },
      shortDescription: {
        en: 'Three small browser games: Tic-Tac-Toe, Hangman, and more.',
        he: 'שלושה משחקי דפדפן קטנים: איקס עיגול, איש תלוי, ועוד.'
      },
      fullDescription: {
        en: 'A collection of small, self-contained browser games built to practice core JavaScript logic and DOM manipulation.',
        he: 'אוסף משחקי דפדפן קטנים ועצמאיים שנבנו כדי לתרגל לוגיקת JavaScript וטיפול ב-DOM.'
      },
      tech: ['JavaScript', 'HTML', 'CSS'],
      links: { github: null, demo: null },
      image: 'assets/projects/mini-games.svg',
      subLinks: [
        { name: { en: 'Tic-Tac-Toe', he: 'איקס עיגול' }, github: 'https://github.com/Sarale-Gamliel/Tic-Tac-Toe', demo: null },
        { name: { en: 'Hangman', he: 'איש תלוי' }, github: 'https://github.com/Sarale-Gamliel/HangMan', demo: null },
        { name: { en: 'Coming soon', he: 'בקרוב' }, github: null, demo: null }
      ]
    }
  ];

  return { PROJECTS_DATA };
});
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/data.test.js`
Expected: all 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add js/data.js tests/data.test.js
git commit -m "Add bilingual project data module with tests"
```

---

### Task 3: i18n module

**Files:**
- Create: `js/i18n.js`
- Test: `tests/i18n.test.js`

**Interfaces:**
- Consumes: nothing (standalone).
- Produces: `TRANSLATIONS` (object with `en` and `he` keys, each a flat string dictionary), `t(key, lang)` → string, `applyTranslations(lang, root)` → void (walks `[data-i18n]` elements under `root` and sets `textContent`). Exposed as `module.exports` (Node) and `window.I18n` (browser). `main.js` and `project.js` call `I18n.t(...)` and `I18n.applyTranslations(...)`.

- [ ] **Step 1: Write the failing test**

Create `tests/i18n.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { TRANSLATIONS, t } = require('../js/i18n.js');

test('en and he have exactly the same set of keys', () => {
  const enKeys = Object.keys(TRANSLATIONS.en).sort();
  const heKeys = Object.keys(TRANSLATIONS.he).sort();
  assert.deepEqual(enKeys, heKeys);
});

test('t() returns the correct string for a known key and language', () => {
  assert.equal(t('heroName', 'en'), 'Sarale Gamliel');
  assert.equal(t('heroName', 'he'), 'שרהלה גמליאל');
});

test('t() falls back to English for an unknown language', () => {
  assert.equal(t('heroName', 'fr'), 'Sarale Gamliel');
});

test('t() falls back to the key itself when the key is missing', () => {
  assert.equal(t('doesNotExist', 'en'), 'doesNotExist');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/i18n.test.js`
Expected: FAIL with `Cannot find module '../js/i18n.js'`

- [ ] **Step 3: Write `js/i18n.js`**

```js
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.I18n = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  const TRANSLATIONS = {
    en: {
      downloadCv: 'Download CV',
      heroTitle: 'AI Product Developer | Full Stack Developer',
      heroName: 'Sarale Gamliel',
      heroSubtitle: 'Turning ideas into AI-powered products.',
      heroCta: 'View Projects',
      aboutHeading: 'About',
      aboutText: 'Full Stack Developer specializing in AI-powered applications. Experienced in building modern web applications using React, Next.js, and Node.js, with a focus on AI-assisted development, UI/UX, and rapid product delivery. Skilled in leveraging Generative AI tools such as Claude, ChatGPT, Gemini, and Runway to transform ideas into scalable, user-focused digital experiences.',
      skillsHeading: 'Skills',
      skillsFrontendLabel: 'Frontend',
      skillsFrontend: 'React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Responsive Design, UI/UX',
      skillsBackendLabel: 'Backend',
      skillsBackend: 'Node.js, REST APIs',
      skillsDatabasesLabel: 'Databases',
      skillsDatabases: 'Supabase, MongoDB, SQL Server',
      skillsAiToolsLabel: 'AI Tools',
      skillsAiTools: 'Claude, ChatGPT, Google Gemini, Google Antigravity, Runway',
      skillsAiDevLabel: 'AI Development',
      skillsAiDev: 'Generative AI, AI-Assisted Development, Prompt Engineering, AI UI/UX Prototyping, Rapid Prototyping',
      skillsToolsLabel: 'Tools & Platforms',
      skillsTools: 'Git, GitHub, Vercel, VS Code',
      experienceHeading: 'Experience',
      exp1Role: 'Independent Full Stack Developer | AI-Powered Product Development',
      exp1Org: 'Independent',
      exp1Desc: 'Design and develop full-stack web applications from concept to deployment, using React, Next.js, and Node.js with AI-assisted workflows for prototyping, debugging, and UI/UX improvement. Deploy and maintain applications using Vercel and cloud-based services.',
      exp2Role: 'Full Stack Development Instructor',
      exp2Org: '',
      exp2Desc: 'Taught modern web development including React, Node.js, JavaScript, and software engineering principles. Mentored students through practical, real-world projects and introduced AI-assisted development practices.',
      exp3Role: 'Aerospace Systems Integration',
      exp3Org: 'Everest Technologies',
      exp3Desc: 'Led electrical design and system integration for aerospace projects, collaborating with multidisciplinary engineering teams to deliver reliable hardware-software solutions.',
      projectsHeading: 'Projects',
      footerText: "Let's build something great together.",
      comingSoon: 'Coming Soon',
      viewCode: 'View Code',
      viewLiveDemo: 'View Live Demo',
      backToProjects: '← Back to Projects',
      notFoundTitle: 'Project not found',
      notFoundText: "We couldn't find that project."
    },
    he: {
      downloadCv: 'הורדת קו״ח',
      heroTitle: 'מפתחת מוצרי AI | מפתחת פול-סטאק',
      heroName: 'שרהלה גמליאל',
      heroSubtitle: 'הופכת רעיונות למוצרים מבוססי AI.',
      heroCta: 'לצפייה בפרויקטים',
      aboutHeading: 'קצת עליי',
      aboutText: 'מפתחת פול-סטאק המתמחה באפליקציות מבוססות AI. בעלת ניסיון בבניית אפליקציות web מודרניות באמצעות React, Next.js ו-Node.js, עם דגש על פיתוח בסיוע AI, חוויית משתמש (UI/UX), ומסירת מוצר מהירה. בקיאה בשימוש בכלי AI גנרטיביים כמו Claude, ChatGPT, Gemini ו-Runway כדי להפוך רעיונות לחוויות דיגיטליות סקיילביליות וממוקדות משתמש.',
      skillsHeading: 'כישורים',
      skillsFrontendLabel: 'צד לקוח (Frontend)',
      skillsFrontend: 'React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, עיצוב רספונסיבי, UI/UX',
      skillsBackendLabel: 'צד שרת (Backend)',
      skillsBackend: 'Node.js, REST APIs',
      skillsDatabasesLabel: 'בסיסי נתונים',
      skillsDatabases: 'Supabase, MongoDB, SQL Server',
      skillsAiToolsLabel: 'כלי AI',
      skillsAiTools: 'Claude, ChatGPT, Google Gemini, Google Antigravity, Runway',
      skillsAiDevLabel: 'פיתוח מבוסס AI',
      skillsAiDev: 'Generative AI, פיתוח בסיוע AI, הנדסת פרומפטים, פרוטוטייפינג UI/UX עם AI, פרוטוטייפינג מהיר',
      skillsToolsLabel: 'כלים ופלטפורמות',
      skillsTools: 'Git, GitHub, Vercel, VS Code',
      experienceHeading: 'ניסיון תעסוקתי',
      exp1Role: 'מפתחת פול-סטאק עצמאית | פיתוח מוצרים מבוססי AI',
      exp1Org: 'עצמאית',
      exp1Desc: 'מתכננת ומפתחת אפליקציות web מלאות מרעיון ועד השקה, באמצעות React, Next.js ו-Node.js, עם תהליכי עבודה בסיוע AI לפרוטוטייפינג, דיבוג ושיפור חוויית משתמש. פורסת ומתחזקת אפליקציות באמצעות Vercel ושירותי ענן.',
      exp2Role: 'מדריכת פיתוח פול-סטאק',
      exp2Org: '',
      exp2Desc: 'לימדה פיתוח web מודרני הכולל React, Node.js, JavaScript ועקרונות הנדסת תוכנה. הנחתה סטודנטים בפרויקטים מעשיים ושילבה שיטות פיתוח בסיוע AI.',
      exp3Role: 'אינטגרציית מערכות אווירונאוטיות',
      exp3Org: 'Everest Technologies',
      exp3Desc: 'הובילה תכנון חשמלי ואינטגרציית מערכות לפרויקטים אווירונאוטיים, בשיתוף פעולה עם צוותי הנדסה רב-תחומיים לפתרונות חומרה-תוכנה אמינים.',
      projectsHeading: 'פרויקטים',
      footerText: 'בואו נבנה יחד משהו מדהים.',
      comingSoon: 'בקרוב',
      viewCode: 'קוד המקור',
      viewLiveDemo: 'צפייה באתר החי',
      backToProjects: 'חזרה לפרויקטים ←',
      notFoundTitle: 'הפרויקט לא נמצא',
      notFoundText: 'לא הצלחנו למצוא את הפרויקט הזה.'
    }
  };

  function t(key, lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : key;
  }

  function applyTranslations(lang, root) {
    const scope = root || document;
    const elements = scope.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'), lang);
    });
  }

  return { TRANSLATIONS, t, applyTranslations };
});
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/i18n.test.js`
Expected: all 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add js/i18n.js tests/i18n.test.js
git commit -m "Add i18n module with English/Hebrew translations and tests"
```

---

### Task 4: Render module

**Files:**
- Create: `js/render.js`
- Test: `tests/render.test.js`

**Interfaces:**
- Consumes: project objects shaped as defined in Task 2 (does not `require`/depend on `data.js` or `i18n.js` directly — receives `lang` and a `labels` object `{ comingSoon, viewCode, viewLiveDemo }` from the caller, so it stays a pure, standalone, testable module).
- Produces: `escapeHtml(str)`, `renderTechTags(tech)`, `isComingSoon(project)`, `renderProjectCard(project, lang, labels)` → HTML string, `renderProjectDetail(project, lang, labels)` → HTML string, `findProjectById(id, projects)` → project object or `null`. Exposed as `module.exports` (Node) and `window.Render` (browser). Consumed by `js/main.js` and `js/project.js` in Task 5/6.

- [ ] **Step 1: Write the failing test**

Create `tests/render.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { renderProjectCard, renderProjectDetail, isComingSoon, findProjectById, escapeHtml } = require('../js/render.js');

const liveProject = {
  id: 'demo-project',
  name: { en: 'Demo', he: 'דמו' },
  shortDescription: { en: 'Short', he: 'קצר' },
  fullDescription: { en: 'Full description', he: 'תיאור מלא' },
  tech: ['React', 'Node.js'],
  links: { github: 'https://github.com/x/y', demo: 'https://example.com' },
  image: 'assets/projects/demo.svg'
};

const comingSoonProject = {
  ...liveProject,
  id: 'coming-soon-project',
  links: { github: null, demo: null }
};

const labels = { comingSoon: 'Coming Soon', viewCode: 'View Code', viewLiveDemo: 'View Live Demo' };

test('isComingSoon is false when a link exists', () => {
  assert.equal(isComingSoon(liveProject), false);
});

test('isComingSoon is true when there are no links or subLinks', () => {
  assert.equal(isComingSoon(comingSoonProject), true);
});

test('isComingSoon is false when only subLinks exist', () => {
  const project = { ...comingSoonProject, subLinks: [{ name: { en: 'A', he: 'א' }, github: 'https://github.com/x/z', demo: null }] };
  assert.equal(isComingSoon(project), false);
});

test('renderProjectCard includes the project name, tech tags, and detail link', () => {
  const html = renderProjectCard(liveProject, 'en', labels);
  assert.match(html, /Demo/);
  assert.match(html, /React/);
  assert.match(html, /project\.html\?id=demo-project/);
});

test('renderProjectCard shows the coming soon badge when there are no links', () => {
  const html = renderProjectCard(comingSoonProject, 'en', labels);
  assert.match(html, /Coming Soon/);
});

test('renderProjectDetail includes live demo and code buttons when links exist', () => {
  const html = renderProjectDetail(liveProject, 'en', labels);
  assert.match(html, /View Live Demo/);
  assert.match(html, /View Code/);
  assert.match(html, /https:\/\/example\.com/);
});

test('renderProjectDetail escapes HTML in project names', () => {
  const malicious = { ...liveProject, name: { en: '<script>alert(1)</script>', he: 'x' } };
  const html = renderProjectDetail(malicious, 'en', labels);
  assert.doesNotMatch(html, /<script>alert/);
});

test('renderProjectDetail renders subLinks when present', () => {
  const project = {
    ...comingSoonProject,
    subLinks: [
      { name: { en: 'Tic-Tac-Toe', he: 'איקס עיגול' }, github: 'https://github.com/x/tic', demo: null },
      { name: { en: 'Coming soon', he: 'בקרוב' }, github: null, demo: null }
    ]
  };
  const html = renderProjectDetail(project, 'en', labels);
  assert.match(html, /Tic-Tac-Toe/);
  assert.match(html, /https:\/\/github\.com\/x\/tic/);
});

test('findProjectById returns the matching project or null', () => {
  const list = [liveProject, comingSoonProject];
  assert.equal(findProjectById('demo-project', list), liveProject);
  assert.equal(findProjectById('missing', list), null);
});

test('escapeHtml escapes angle brackets and quotes', () => {
  assert.equal(escapeHtml('<a href="x">'), '&lt;a href=&quot;x&quot;&gt;');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/render.test.js`
Expected: FAIL with `Cannot find module '../js/render.js'`

- [ ] **Step 3: Write `js/render.js`**

```js
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Render = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderTechTags(tech) {
    return tech.map((item) => `<span class="tech-tag">${escapeHtml(item)}</span>`).join('');
  }

  function isComingSoon(project) {
    const hasSubLinks = Array.isArray(project.subLinks) && project.subLinks.some((l) => l.github || l.demo);
    return !project.links.github && !project.links.demo && !hasSubLinks;
  }

  function renderProjectCard(project, lang, labels) {
    const name = project.name[lang];
    const desc = project.shortDescription[lang];
    const badge = isComingSoon(project)
      ? `<span class="badge-coming-soon">${escapeHtml(labels.comingSoon)}</span>`
      : '';
    return `
      <a class="project-card" href="project.html?id=${encodeURIComponent(project.id)}">
        <div class="project-card-image"><img src="${project.image}" alt="${escapeHtml(name)}" loading="lazy"></div>
        <div class="project-card-body">
          <div class="project-card-header">
            <h3>${escapeHtml(name)}</h3>
            ${badge}
          </div>
          <p>${escapeHtml(desc)}</p>
          <div class="tech-tags">${renderTechTags(project.tech)}</div>
        </div>
      </a>`;
  }

  function renderProjectDetail(project, lang, labels) {
    const name = project.name[lang];
    const desc = project.fullDescription[lang];
    const techHtml = renderTechTags(project.tech);

    let linksHtml = '';
    if (project.links.demo) {
      linksHtml += `<a class="btn btn-primary" href="${project.links.demo}" target="_blank" rel="noopener">${escapeHtml(labels.viewLiveDemo)}</a>`;
    }
    if (project.links.github) {
      linksHtml += `<a class="btn btn-secondary" href="${project.links.github}" target="_blank" rel="noopener">${escapeHtml(labels.viewCode)}</a>`;
    }
    if (Array.isArray(project.subLinks) && project.subLinks.length) {
      linksHtml += '<div class="sublinks">' + project.subLinks.map((sl) => {
        const slName = sl.name[lang];
        const href = sl.github || sl.demo;
        return href
          ? `<a class="sublink" href="${href}" target="_blank" rel="noopener">${escapeHtml(slName)}</a>`
          : `<span class="sublink sublink-disabled">${escapeHtml(slName)}</span>`;
      }).join('') + '</div>';
    }
    if (isComingSoon(project)) {
      linksHtml += `<span class="badge-coming-soon">${escapeHtml(labels.comingSoon)}</span>`;
    }

    return `
      <div class="project-detail-image"><img src="${project.image}" alt="${escapeHtml(name)}"></div>
      <h1>${escapeHtml(name)}</h1>
      <p class="project-detail-description">${escapeHtml(desc)}</p>
      <div class="tech-tags">${techHtml}</div>
      <div class="project-detail-links">${linksHtml}</div>
    `;
  }

  function findProjectById(id, projects) {
    return projects.find((p) => p.id === id) || null;
  }

  return { escapeHtml, renderTechTags, isComingSoon, renderProjectCard, renderProjectDetail, findProjectById };
});
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/render.test.js`
Expected: all 10 tests PASS

- [ ] **Step 5: Run the whole suite**

Run: `npm test`
Expected: all tests from Tasks 2, 3, and 4 PASS (19 tests total)

- [ ] **Step 6: Commit**

```bash
git add js/render.js tests/render.test.js
git commit -m "Add render module for project cards and detail pages with tests"
```

---

### Task 5: Home page (header, hero, about, skills, experience, projects grid)

**Files:**
- Modify: `index.html` (replace placeholder body)
- Create: `js/main.js`
- Modify: `css/style.css` (append)

**Interfaces:**
- Consumes: `Data.PROJECTS_DATA` (Task 2), `I18n.t` / `I18n.applyTranslations` (Task 3), `Render.renderProjectCard` (Task 4).
- Produces: a working home page; the `#lang-toggle` button and `localStorage` key `portfolio-lang` that Task 6's `project.js` also reads, so the chosen language persists across pages.

- [ ] **Step 1: Replace the body of `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sarale Gamliel — AI Product Developer | Full Stack Developer</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <span class="logo">Sarale Gamliel</span>
      <div class="header-actions">
        <a class="btn-download-cv" data-i18n="downloadCv" href="assets/resume.pdf" download>Download CV</a>
        <button id="lang-toggle" type="button">עברית</button>
      </div>
    </div>
  </header>

  <main>
    <section class="hero container">
      <span class="hero-title-label" data-i18n="heroTitle">AI Product Developer | Full Stack Developer</span>
      <h1 data-i18n="heroName">Sarale Gamliel</h1>
      <p class="hero-subtitle" data-i18n="heroSubtitle">Turning ideas into AI-powered products.</p>
      <div class="hero-links">
        <a href="mailto:saraledafna@gmail.com">saraledafna@gmail.com</a>
        <a href="tel:0542838288">054-283-8288</a>
        <a href="https://linkedin.com/in/sarale-gamliel-il" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://github.com/Sarale-Gamliel" target="_blank" rel="noopener">GitHub</a>
      </div>
      <a class="hero-cta" data-i18n="heroCta" href="#projects">View Projects</a>
    </section>

    <section class="page-section container">
      <h2 data-i18n="aboutHeading">About</h2>
      <p class="about-text" data-i18n="aboutText"></p>
    </section>

    <section class="page-section container">
      <h2 data-i18n="skillsHeading">Skills</h2>
      <div class="skills-grid">
        <div class="skill-card">
          <h3 data-i18n="skillsFrontendLabel">Frontend</h3>
          <p data-i18n="skillsFrontend"></p>
        </div>
        <div class="skill-card">
          <h3 data-i18n="skillsBackendLabel">Backend</h3>
          <p data-i18n="skillsBackend"></p>
        </div>
        <div class="skill-card">
          <h3 data-i18n="skillsDatabasesLabel">Databases</h3>
          <p data-i18n="skillsDatabases"></p>
        </div>
        <div class="skill-card">
          <h3 data-i18n="skillsAiToolsLabel">AI Tools</h3>
          <p data-i18n="skillsAiTools"></p>
        </div>
        <div class="skill-card">
          <h3 data-i18n="skillsAiDevLabel">AI Development</h3>
          <p data-i18n="skillsAiDev"></p>
        </div>
        <div class="skill-card">
          <h3 data-i18n="skillsToolsLabel">Tools &amp; Platforms</h3>
          <p data-i18n="skillsTools"></p>
        </div>
      </div>
    </section>

    <section class="page-section container">
      <h2 data-i18n="experienceHeading">Experience</h2>
      <div class="experience-list">
        <div class="experience-item">
          <span class="exp-role" data-i18n="exp1Role"></span>
          <span class="exp-org" data-i18n="exp1Org"></span>
          <span class="exp-dates">2025 – Present</span>
          <p class="exp-desc" data-i18n="exp1Desc"></p>
        </div>
        <div class="experience-item">
          <span class="exp-role" data-i18n="exp2Role"></span>
          <span class="exp-org" data-i18n="exp2Org"></span>
          <span class="exp-dates">2023 – 2025</span>
          <p class="exp-desc" data-i18n="exp2Desc"></p>
        </div>
        <div class="experience-item">
          <span class="exp-role" data-i18n="exp3Role"></span>
          <span class="exp-org" data-i18n="exp3Org"></span>
          <span class="exp-dates">2025</span>
          <p class="exp-desc" data-i18n="exp3Desc"></p>
        </div>
      </div>
    </section>

    <section id="projects" class="page-section container">
      <h2 data-i18n="projectsHeading">Projects</h2>
      <div id="projects-grid" class="projects-grid"></div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p data-i18n="footerText">Let's build something great together.</p>
      <div class="footer-links">
        <a href="mailto:saraledafna@gmail.com">saraledafna@gmail.com</a>
        <a href="https://linkedin.com/in/sarale-gamliel-il" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://github.com/Sarale-Gamliel" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </footer>

  <script src="js/data.js"></script>
  <script src="js/i18n.js"></script>
  <script src="js/render.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `js/main.js`**

```js
(function () {
  const STORAGE_KEY = 'portfolio-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function labelsFor(lang) {
    return {
      comingSoon: I18n.t('comingSoon', lang),
      viewCode: I18n.t('viewCode', lang),
      viewLiveDemo: I18n.t('viewLiveDemo', lang)
    };
  }

  function renderProjects(lang) {
    const grid = document.getElementById('projects-grid');
    const labels = labelsFor(lang);
    grid.innerHTML = Data.PROJECTS_DATA.map((p) => Render.renderProjectCard(p, lang, labels)).join('');
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    I18n.applyTranslations(lang, document);
    document.getElementById('lang-toggle').textContent = lang === 'he' ? 'EN' : 'עברית';
    renderProjects(lang);
  }

  function init() {
    let lang = getLang();
    applyLang(lang);
    document.getElementById('lang-toggle').addEventListener('click', () => {
      lang = lang === 'he' ? 'en' : 'he';
      setLang(lang);
      applyLang(lang);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
```

- [ ] **Step 3: Append home-page component CSS to `css/style.css`**

```css
.site-header {
  position: sticky;
  top: 0;
  background: rgba(250, 250, 250, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  z-index: 10;
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
}

.site-header .logo { font-weight: 700; font-size: 18px; }

.header-actions { display: flex; align-items: center; gap: 12px; }

#lang-toggle {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

#lang-toggle:hover { border-color: var(--accent); color: var(--accent); }

.btn-download-cv {
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
}

.btn-download-cv:hover { background: var(--accent-dark); }

.hero { padding: 96px 0 64px; text-align: center; }

.hero-title-label {
  display: inline-block;
  color: var(--accent);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.hero h1 { font-size: 42px; font-weight: 800; margin-bottom: 12px; }

.hero-subtitle { font-size: 18px; color: var(--text-secondary); margin-bottom: 32px; }

.hero-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
}

.hero-links a {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  background: var(--surface);
}

.hero-links a:hover { border-color: var(--accent); color: var(--accent); }

.hero-cta {
  display: inline-block;
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  padding: 12px 28px;
  font-weight: 700;
}

.hero-cta:hover { background: var(--accent-dark); }

section.page-section { padding: 56px 0; }

section.page-section h2 { font-size: 28px; font-weight: 800; margin-bottom: 24px; }

.about-text { max-width: 720px; font-size: 16px; color: var(--text-secondary); }

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.skill-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}

.skill-card h3 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  margin-bottom: 8px;
}

.skill-card p { font-size: 14px; color: var(--text-secondary); }

.experience-list { display: flex; flex-direction: column; gap: 24px; }

.experience-item { border-inline-start: 3px solid var(--accent); padding-inline-start: 20px; }

.experience-item .exp-role { font-weight: 700; font-size: 17px; display: block; }

.experience-item .exp-org { color: var(--accent); font-size: 14px; display: block; margin-bottom: 4px; }

.experience-item .exp-dates { color: var(--text-secondary); font-size: 13px; margin-bottom: 8px; display: block; }

.experience-item .exp-desc { color: var(--text-secondary); font-size: 14px; }

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: block;
}

.project-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }

.project-card-image { aspect-ratio: 16 / 9; background: var(--accent-soft); overflow: hidden; }

.project-card-image img { width: 100%; height: 100%; object-fit: cover; }

.project-card-body { padding: 20px; }

.project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.project-card-header h3 { font-size: 18px; font-weight: 700; }

.project-card-body p { color: var(--text-secondary); font-size: 14px; margin-bottom: 12px; }

.tech-tags { display: flex; flex-wrap: wrap; gap: 6px; }

.tech-tag {
  background: var(--accent-soft);
  color: var(--accent-dark);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
}

.badge-coming-soon {
  background: #fff4e5;
  color: #b5690a;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.site-footer {
  border-top: 1px solid var(--border);
  padding: 40px 0;
  margin-top: 64px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
}

.site-footer .footer-links { display: flex; justify-content: center; gap: 16px; margin-top: 12px; }

.site-footer .footer-links a:hover { color: var(--accent); }
```

- [ ] **Step 4: Verify in browser (English)**

Run: open `index.html` in a browser.
Expected: header with "Sarale Gamliel" + "Download CV" button + "עברית" toggle button; hero shows name/title/contact links/"View Projects" button; About/Skills/Experience sections show English text; Projects section shows 6 cards, with "Coming Soon" badges on LifeSaver, Grocery Store, and Gadgets Store cards only.

- [ ] **Step 5: Verify in browser (Hebrew toggle)**

Run: click the "עברית" button.
Expected: entire page flips to Hebrew text and right-to-left layout (`<html dir="rtl">` in DevTools), the toggle button now reads "EN", and clicking it again reverts to English/LTR. Reload the page — the language you left it on should persist (localStorage).

- [ ] **Step 6: Commit**

```bash
git add index.html js/main.js css/style.css
git commit -m "Build home page: hero, about, skills, experience, projects grid"
```

---

### Task 6: Project detail page

**Files:**
- Modify: `project.html` (replace placeholder body)
- Create: `js/project.js`
- Modify: `css/style.css` (append)

**Interfaces:**
- Consumes: `Data.PROJECTS_DATA`, `I18n.t` / `I18n.applyTranslations`, `Render.renderProjectDetail`, `Render.findProjectById` (all from Tasks 2–4); reads the same `portfolio-lang` `localStorage` key Task 5 writes.
- Produces: a working `project.html?id=<id>` page for all 6 ids, plus a graceful "not found" state for unknown/missing ids.

- [ ] **Step 1: Replace the body of `project.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project — Sarale Gamliel</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a class="logo" href="index.html">Sarale Gamliel</a>
      <div class="header-actions">
        <a class="btn-download-cv" data-i18n="downloadCv" href="assets/resume.pdf" download>Download CV</a>
        <button id="lang-toggle" type="button">עברית</button>
      </div>
    </div>
  </header>

  <main class="container">
    <a class="back-link" data-i18n="backToProjects" href="index.html#projects">← Back to Projects</a>
    <div id="project-detail" class="project-detail"></div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p data-i18n="footerText">Let's build something great together.</p>
      <div class="footer-links">
        <a href="mailto:saraledafna@gmail.com">saraledafna@gmail.com</a>
        <a href="https://linkedin.com/in/sarale-gamliel-il" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://github.com/Sarale-Gamliel" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </footer>

  <script src="js/data.js"></script>
  <script src="js/i18n.js"></script>
  <script src="js/render.js"></script>
  <script src="js/project.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `js/project.js`**

```js
(function () {
  const STORAGE_KEY = 'portfolio-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function labelsFor(lang) {
    return {
      comingSoon: I18n.t('comingSoon', lang),
      viewCode: I18n.t('viewCode', lang),
      viewLiveDemo: I18n.t('viewLiveDemo', lang)
    };
  }

  function getProjectId() {
    return new URLSearchParams(window.location.search).get('id');
  }

  function renderDetail(lang) {
    const container = document.getElementById('project-detail');
    const id = getProjectId();
    const project = Render.findProjectById(id, Data.PROJECTS_DATA);
    if (!project) {
      container.innerHTML = `
        <h1>${I18n.t('notFoundTitle', lang)}</h1>
        <p>${I18n.t('notFoundText', lang)}</p>`;
      return;
    }
    container.innerHTML = Render.renderProjectDetail(project, lang, labelsFor(lang));
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    I18n.applyTranslations(lang, document);
    document.getElementById('lang-toggle').textContent = lang === 'he' ? 'EN' : 'עברית';
    renderDetail(lang);
  }

  function init() {
    let lang = getLang();
    applyLang(lang);
    document.getElementById('lang-toggle').addEventListener('click', () => {
      lang = lang === 'he' ? 'en' : 'he';
      setLang(lang);
      applyLang(lang);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
```

- [ ] **Step 3: Append project-detail page CSS to `css/style.css`**

```css
.back-link {
  display: inline-block;
  margin: 32px 0 24px;
  color: var(--accent);
  font-weight: 600;
  font-size: 14px;
}

.project-detail { padding-bottom: 80px; }

.project-detail-image {
  aspect-ratio: 16 / 9;
  background: var(--accent-soft);
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 24px;
}

.project-detail-image img { width: 100%; height: 100%; object-fit: cover; }

.project-detail h1 { font-size: 32px; font-weight: 800; margin-bottom: 16px; }

.project-detail-description { color: var(--text-secondary); font-size: 16px; margin-bottom: 20px; }

.project-detail .tech-tags { margin-bottom: 24px; }

.project-detail-links { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }

.btn { display: inline-block; border-radius: 8px; padding: 10px 20px; font-weight: 700; font-size: 14px; }

.btn-primary { background: var(--accent); color: #fff; }

.btn-primary:hover { background: var(--accent-dark); }

.btn-secondary { background: var(--surface); color: var(--text); border: 1px solid var(--border); }

.btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

.sublinks { display: flex; flex-wrap: wrap; gap: 8px; width: 100%; }

.sublink { border: 1px solid var(--border); border-radius: 8px; padding: 8px 14px; font-size: 13px; font-weight: 600; }

a.sublink:hover { border-color: var(--accent); color: var(--accent); }

.sublink-disabled { color: var(--text-secondary); opacity: 0.7; }
```

- [ ] **Step 4: Verify each project page in the browser**

Run: open `project.html?id=cliq-trivia`, then `project.html?id=lifesaver`, `project.html?id=grocery-store`, `project.html?id=gadgets-store`, `project.html?id=landing-page`, and `project.html?id=mini-games`.
Expected: each shows the correct name/description/tech tags; `cliq-trivia` and `landing-page` show working "View Live Demo" and "View Code" buttons that open in a new tab; `lifesaver`, `grocery-store`, `gadgets-store` show a "Coming Soon" badge and no dead buttons; `mini-games` shows the Tic-Tac-Toe and Hangman sub-links (working) plus a disabled "Coming soon" sub-link. The Hebrew toggle works identically to the home page and flips this page's content too.

- [ ] **Step 5: Verify the not-found case**

Run: open `project.html?id=does-not-exist`.
Expected: page shows "Project not found" (English) / "הפרויקט לא נמצא" (Hebrew after toggling) instead of a blank or broken page.

- [ ] **Step 6: Commit**

```bash
git add project.html js/project.js css/style.css
git commit -m "Build shared project detail page template"
```

---

### Task 7: Assets and responsive polish

**Files:**
- Create: `assets/favicon.svg`
- Create: `assets/projects/cliq-trivia.svg`
- Create: `assets/projects/lifesaver.svg`
- Create: `assets/projects/grocery-store.svg`
- Create: `assets/projects/gadgets-store.svg`
- Create: `assets/projects/landing-page.svg`
- Create: `assets/projects/mini-games.svg`
- Modify: `css/style.css` (append)

**Interfaces:**
- Produces: the image files referenced by `js/data.js`'s `image` field (Task 2) and `index.html`'s `<link rel="icon">` (Tasks 5–6), so the site has no broken image links. These are placeholders — Sarale can replace any of them later by overwriting the same filename.

- [ ] **Step 1: Create `assets/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="32" fill="#6d5bd0"/>
  <text x="32" y="42" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#ffffff" text-anchor="middle">SG</text>
</svg>
```

- [ ] **Step 2: Create the 6 project placeholder images**

`assets/projects/cliq-trivia.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
  <rect width="400" height="225" fill="#efeafc"/>
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#6d5bd0" text-anchor="middle">CLIQ Trivia</text>
</svg>
```

`assets/projects/lifesaver.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
  <rect width="400" height="225" fill="#efeafc"/>
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#6d5bd0" text-anchor="middle">LifeSaver</text>
</svg>
```

`assets/projects/grocery-store.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
  <rect width="400" height="225" fill="#efeafc"/>
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#6d5bd0" text-anchor="middle">Grocery Store</text>
</svg>
```

`assets/projects/gadgets-store.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
  <rect width="400" height="225" fill="#efeafc"/>
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#6d5bd0" text-anchor="middle">Gadgets Store</text>
</svg>
```

`assets/projects/landing-page.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
  <rect width="400" height="225" fill="#efeafc"/>
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#6d5bd0" text-anchor="middle">Landing Page</text>
</svg>
```

`assets/projects/mini-games.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
  <rect width="400" height="225" fill="#efeafc"/>
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#6d5bd0" text-anchor="middle">Mini Games</text>
</svg>
```

- [ ] **Step 3: Append responsive breakpoint CSS to `css/style.css`**

```css
@media (max-width: 640px) {
  .hero { padding: 64px 0 48px; }
  .hero h1 { font-size: 30px; }
  .hero-subtitle { font-size: 16px; }
  section.page-section { padding: 40px 0; }
  section.page-section h2 { font-size: 22px; }
  .site-header .logo { font-size: 16px; }
  .btn-download-cv { display: none; }
}
```

- [ ] **Step 4: Verify in browser**

Run: open `index.html`, confirm the 6 project card thumbnails and the browser tab favicon all render (no broken-image icons). Resize the browser window to under 640px wide (or open DevTools device toolbar) and confirm the hero/heading text shrinks and the "Download CV" button hides in the header without the layout breaking.

- [ ] **Step 5: Commit**

```bash
git add assets/ css/style.css
git commit -m "Add placeholder assets and responsive breakpoint styles"
```

---

### Task 8: Deploy to GitHub Pages

**Files:** none (git/GitHub operations only)

**Interfaces:** none — this is the final, user-facing deployment step.

> **STOP: this task pushes a new public repository to Sarale's GitHub account. Confirm explicitly with her — repo name and that she's ready to make it public — before running Step 1.**

- [ ] **Step 1: Confirm and create the GitHub repository**

After explicit confirmation, run from the project root:

```bash
gh repo create sarale-gamliel.github.io --public --source=. --remote=origin --push
```

Expected: a new public repo appears at `https://github.com/Sarale-Gamliel/sarale-gamliel.github.io`, and the command output shows the push succeeding.

- [ ] **Step 2: Verify the Pages deployment**

Run: wait 1–2 minutes, then check `https://sarale-gamliel.github.io` in a browser (a `<username>.github.io` repo publishes automatically from the default branch — no separate "enable Pages" step is needed).
Expected: the live home page loads with the same content verified in Task 5, and clicking a project card leads to a working `project.html?id=...` page on the live domain.

- [ ] **Step 3: Tell Sarale what she can edit herself**

Confirm with her that she understands: adding a link for LifeSaver, the grocery store, the gadgets store, or the third mini-game later means editing the matching entry's `links` (or `subLinks`) field in `js/data.js`, committing, and pushing — no other file needs to change. Dropping her resume file at `assets/resume.pdf` (exact filename) makes the "Download CV" button work.
