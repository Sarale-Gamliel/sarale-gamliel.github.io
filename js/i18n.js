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
      datePresent: 'Present',
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
      datePresent: 'היום',
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
