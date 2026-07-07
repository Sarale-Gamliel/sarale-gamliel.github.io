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
