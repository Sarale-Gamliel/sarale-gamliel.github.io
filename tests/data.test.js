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
