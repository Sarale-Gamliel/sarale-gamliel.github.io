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
