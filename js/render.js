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
    const demoAction = project.links.demo
      ? `<div class="project-card-actions"><a class="project-card-demo-link" href="${project.links.demo}" target="_blank" rel="noopener">${escapeHtml(labels.viewLiveDemo)}</a></div>`
      : `<div class="project-card-actions"><span class="project-card-demo-link project-card-demo-link-disabled">${escapeHtml(labels.comingSoon)}</span></div>`;
    return `
      <div class="project-card">
        <a class="project-card-link" href="project.html?id=${encodeURIComponent(project.id)}">
          <div class="project-card-image"><img src="${project.image}" alt="${escapeHtml(name)}" loading="lazy"></div>
          <div class="project-card-body">
            <div class="project-card-header">
              <h3>${escapeHtml(name)}</h3>
              ${badge}
            </div>
            <p>${escapeHtml(desc)}</p>
            <div class="tech-tags">${renderTechTags(project.tech)}</div>
          </div>
        </a>
        ${demoAction}
      </div>`;
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
