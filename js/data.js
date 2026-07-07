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
