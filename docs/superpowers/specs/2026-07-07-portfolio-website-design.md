# Portfolio Website — Design

## Purpose

A personal portfolio website for Sarale Gamliel (שרהלה גמליאל) to send to recruiters, technical hiring managers, and potential freelance clients. A visitor lands on a home page introducing her, sees her projects as cards, and clicks into any project for full details.

## Audience

Mixed: HR/recruiters (need quick, clear signal), technical interviewers/CTOs (want to dig into stack and code), and freelance/private clients (want to see finished, polished work).

## Content

### Personal info (from CV)

- **Name / title:** Sarale Gamliel — AI Product Developer | Full Stack Developer
- **Contact:** 054-283-8288, saraledafna@gmail.com, Central District, Israel
- **Links:** linkedin.com/in/sarale-gamliel-il, github.com/Sarale-Gamliel
- **Summary:** Full Stack Developer specializing in AI-powered applications — React, Next.js, Node.js, AI-assisted development, UI/UX, rapid product delivery, Generative AI tools (Claude, ChatGPT, Gemini, Runway).
- **Experience:** Independent Full Stack Developer (2025–present), Full Stack Development Instructor (2023–2025), Aerospace Systems Integration @ Everest Technologies (2025).
- **Skills:** grouped as in the CV — Frontend, Backend, Databases, AI Tools, AI Development, Tools & Platforms.
- **Resume download:** a "Download CV" button linking to a PDF she'll supply and drop into the assets folder.

### Projects (6 cards, each with its own detail page)

| # | Project | Tech | Status |
|---|---------|------|--------|
| 1 | **CLIQ Trivia** — AI-powered interactive trivia platform | React, Node.js, Supabase, Vercel, Tailwind CSS, Framer Motion | Live demo + public GitHub repo (`cliq-trivia`) |
| 2 | **LifeSaver** — real-time first aid support platform | React, Node.js, MongoDB | Code is private by choice — no GitHub link shown. No live demo yet (she wants to deploy it later); shows a "בקרוב" (coming soon) badge until she supplies a live link |
| 3 | **חנות מכולת** (grocery e-commerce store) | React, Next.js, Supabase, Vercel, Resend, payment integrations | Not deployed/pushed yet — "בקרוב" badge, link added later by editing the data file |
| 4 | **חנות גאדג'טים** (gadgets e-commerce store) | React, Next.js, Supabase, Vercel, Resend, payment integrations | Same as above — "בקרוב" badge |
| 5 | **דף נחיתה** — landing page built for her brother (ישראל דפנה) | HTML, CSS, JavaScript | Live demo + public GitHub repo (`israeldafna`) |
| 6 | **מיני-משחקים** — small game collection (Tic-Tac-Toe, Hangman, + a third game to add later) | JavaScript | Public GitHub repos (`Tic-Tac-Toe`, `HangMan`), no live demo yet — shown as one combined project card/page listing all games |

Note: items 3, 4, and the third mini-game are placeholders for now. Sarale will send links later; adding them is a one-line edit to `data/projects.js`, no HTML changes needed.

### Language

Bilingual — English and Hebrew — with a toggle button in the header. Toggling swaps all text and flips direction (RTL for Hebrew, LTR for English) without a page reload, driven by one shared data file so nothing needs to be maintained twice per page.

## Visual Design

**Chosen direction (confirmed via visual mockup comparison): light, clean, purple-blue accent.**

- Background: white / very light grey (#fafafa)
- Text: near-black (#1a1a1a)
- Accent color: soft purple-blue (~#6d5bd0) for buttons, links, tag highlights, and headings
- Typography: clean sans-serif (Inter or similar via Google Fonts)
- Subtle entrance animations (fade/slide-in on scroll) and hover effects on project cards
- Project cards show small colored tech tags (React, Node.js, etc.)

## Architecture

Static site, no build tools, so Sarale can maintain it herself without technical knowledge:

- **`index.html`** — home page: hero (name, title, contact buttons, CV download), about/summary, skills, experience timeline, projects grid (6 cards)
- **`project.html`** — one generic detail-page template shared by all 6 projects. Reads an `id` from the URL and fills in content from the data file. From the visitor's perspective each project has its own page; behind the scenes it's a single file, so adding a 7th project later never requires a new HTML page.
- **`data/projects.js`** — single source of truth: array of project objects (id, name, description, tech list, links, status) in both languages. This is the *only* file Sarale needs to touch to add a link, change a description, or add a new project.
- **`data/translations.js`** — static UI strings (nav labels, section headings, buttons) in English/Hebrew for the language toggle.
- **`css/style.css`** — shared styling (light/purple-blue theme described above).
- **`js/main.js`** — renders the home page sections and project cards from the data file, handles the language toggle.
- **`js/project.js`** — renders the project detail page from the data file based on the URL id.
- **`assets/`** — CV PDF, project images/screenshots (placeholder images used until Sarale supplies real screenshots).

## Deployment

GitHub Pages, via a new repository named **`sarale-gamliel.github.io`** in her existing GitHub account (`Sarale-Gamliel`) — this gives the cleanest possible URL with no path suffix. Creating the repo and pushing to GitHub will be confirmed with Sarale explicitly before it happens, since it's a public, visible action.

## Out of scope for v1

- Deploying LifeSaver, the grocery store, the gadgets store, or the third mini-game live — those links get added later once Sarale has them.
- A CMS or admin panel — content changes happen by editing `data/projects.js` directly.
- Backend/contact form — contact happens via the existing email/phone/LinkedIn links.
