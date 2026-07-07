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
