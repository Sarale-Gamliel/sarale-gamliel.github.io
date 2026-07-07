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
