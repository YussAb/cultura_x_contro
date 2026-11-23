const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// A small browser boundary for testing routing and forms without sending email.
function loadSite(hostname = 'example.com', elements = {}, session = new Map()) {
  const location = new URL(`https://${hostname}/`);
  const entries = [];
  const classList = () => ({ add() {}, remove() {}, toggle() {}, contains() { return false; } });
  const document = {
    querySelectorAll: selector => [].concat(elements[selector] || []), querySelector: selector => elements[selector] || null, getElementById: () => null,
    addEventListener() {}, documentElement: {}, body: { classList: classList() }
  };
  const history = {
    state: {}, replaceState(state, _, url) { this.state = state; if (url) location.href = new URL(url, location).href; },
    pushState(state, _, url) { entries.push(url); this.state = state; location.href = new URL(url, location).href; }
  };
  const window = {
    location, history, scrollX: 0, scrollY: 0, scrollTo() {}, addEventListener() {},
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    setTimeout, clearTimeout
  };
  const calls = [];
  const context = vm.createContext({
    document, history, window, location, URLSearchParams, console,
    sessionStorage: { getItem: key => session.get(key), setItem: (key, value) => session.set(key, value) },
    FormData: class { constructor(form) { this.form = form; } *[Symbol.iterator]() {
      yield ['form-name', this.form.name];
      yield ['email', this.form.email.value];
      yield ['lang', this.form.elements.lang.value];
      yield ['source_section', this.form.elements.source_section.value];
      yield ['company', this.form.elements.company.value];
    } },
    fetch: async (...args) => { calls.push(args); return { ok: true }; }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8'), context);
  const api = vm.runInContext('({handleNewsletterSubmit, getSectionFromLocation, setRoute, resolveSectionAccess, translations, setFeedback, openSection, applyRouteFromLocation, setMenuOpen, applyLanguage})', context);
  return { api, context, calls, location, entries, history };
}

function form(name = 'newsletter', source = 'mixcloud', valid = true) {
  const classes = new Set();
  const feedback = { textContent: '', dataset: {}, classList: { add: x => classes.add(x), remove: (...x) => x.forEach(v => classes.delete(v)) } };
  const email = { value: '  Test@Example.com  ', checkValidity: () => valid, reportValidity() { this.reported = true; } };
  const button = { disabled: false };
  return {
    name, dataset: { newsletterSource: source }, email, feedback, button, classes,
    elements: { lang: { value: '' }, source_section: { value: '' }, company: { value: '' } },
    querySelector(selector) { return selector === '.form-feedback' ? feedback : selector.includes('email') ? email : button; },
    reset() { this.wasReset = true; this.email.value = ''; }
  };
}
const submit = (site, target) => site.api.handleNewsletterSubmit({ preventDefault() {}, currentTarget: target });

test('protected deep links resolve to the pirate entrance before unlocking', () => {
  const site = loadSite();
  for (const hash of ['#visione', '#selezione', '#storie', '#eventi', '#mappa/piemonte/torino']) {
    site.location.hash = hash;
    assert.equal(site.api.getSectionFromLocation(), 'culture', hash);
  }
  site.location.hash = '#artisti';
  assert.equal(site.api.getSectionFromLocation(), 'artists');
  vm.runInContext("unlockedGates.add('culture')", site.context);
  site.location.hash = '#storie';
  assert.equal(site.api.getSectionFromLocation(), 'stories');
});

test('Onasty and Cultura Contro accept separate passwords and remember each unlock', () => {
  function entrance(id) {
    const content = { hidden: true, inert: true, classList: { add() {} } };
    const panel = { id, querySelector: () => content, classList: { contains: () => false } };
    const field = { setAttribute() {}, removeAttribute() {}, focus() {}, select() {}, addEventListener() {} };
    const feedback = { dataset: {} };
    const button = {};
    const form = {
      elements: { password: field }, querySelector: () => button,
      addEventListener(_, listener) { this.submit = listener; }
    };
    const gate = {
      closest: () => panel, classList: { add() {} },
      querySelector: selector => selector === '[data-culture-password-form]' ? form : feedback
    };
    return { gate, content, enter(value) { field.value = value; form.submit({ preventDefault() {} }); } };
  }

  const session = new Map();
  const onasty = entrance('artists'), culture = entrance('culture');
  const site = loadSite('example.com', { '[data-culture-gate]': [onasty.gate, culture.gate] }, session);
  site.context.window.setTimeout = callback => callback();
  onasty.enter('contro');
  culture.enter('cultura');
  assert.equal(onasty.content.hidden, true);
  assert.equal(culture.content.hidden, true);
  onasty.enter('cultura');
  assert.equal(onasty.content.inert, false);
  assert.equal(culture.content.hidden, true);
  assert.equal(site.api.resolveSectionAccess('stories'), 'culture');

  const restoredOnasty = entrance('artists'), restoredCulture = entrance('culture');
  const reloaded = loadSite('example.com', { '[data-culture-gate]': [restoredOnasty.gate, restoredCulture.gate] }, session);
  reloaded.context.window.setTimeout = callback => callback();
  assert.equal(restoredOnasty.content.hidden, false);
  assert.equal(restoredCulture.content.hidden, true);
  restoredCulture.enter('contro');
  assert.equal(restoredCulture.content.inert, false);
  assert.equal(reloaded.api.resolveSectionAccess('stories'), 'stories');
});
test('reopening the same route adds no duplicate Back entry', () => {
  const site = loadSite();
  site.api.setRoute('mixcloud-page'); site.api.setRoute('mixcloud-page');
  assert.deepEqual(site.entries, ['#mixcloud']);
  site.api.setRoute('soundcloud-page'); site.api.setRoute(null);
  assert.equal(site.entries.length, 3);
});
test('invalid email does not send a request', async () => {
  const site = loadSite(), target = form('newsletter', 'home', false);
  await submit(site, target);
  assert.equal(site.calls.length, 0); assert.equal(target.email.reported, true);
  assert.equal(target.feedback.textContent, site.api.translations.it.form_invalid);
});
test('honeypot blocks submission', async () => {
  const site = loadSite(), target = form(); target.elements.company.value = 'spam';
  await submit(site, target); assert.equal(site.calls.length, 0);
});
test('newsletter sends normalized data and resets only after success', async () => {
  const site = loadSite(), target = form(); await submit(site, target);
  assert.equal(site.calls.length, 1);
  const fields = new URLSearchParams(site.calls[0][1].body);
  assert.equal(fields.get('email'), 'test@example.com');
  assert.equal(fields.get('form-name'), 'newsletter');
  assert.equal(fields.get('source_section'), 'mixcloud');
  assert.equal(target.wasReset, true); assert.equal(target.button.disabled, false);
});
test('access requests are separate from newsletter subscriptions', async () => {
  const site = loadSite(), target = form('crew-access', 'onasty-access'); await submit(site, target);
  assert.equal(new URLSearchParams(site.calls[0][1].body).get('form-name'), 'crew-access');
  assert.equal(target.feedback.textContent, site.api.translations.it.gate_request_success);
});
test('server failure preserves email and re-enables submit', async () => {
  const site = loadSite(), target = form(); site.context.fetch = async () => ({ ok: false });
  await submit(site, target); assert.notEqual(target.wasReset, true);
  assert.equal(target.email.value, 'test@example.com'); assert.equal(target.button.disabled, false);
  assert.equal(target.feedback.textContent, site.api.translations.it.form_error);
});
test('network failure is visible and never claims success', async () => {
  const site = loadSite(), target = form(); site.context.fetch = async () => { throw new Error('offline'); };
  await submit(site, target); assert.equal(target.classes.has('is-error'), true);
  assert.equal(target.classes.has('is-success'), false);
});

test('localhost validates without transmitting or claiming a real signup', async () => {
  const site = loadSite('localhost'), target = form('crew-access', 'culture-access');
  await submit(site, target);
  assert.equal(site.calls.length, 0);
  assert.equal(target.wasReset, undefined);
  assert.equal(target.feedback.textContent, site.api.translations.it.form_local_preview);
  assert.equal(target.classes.has('is-preview'), true);
});
test('double submit does not send duplicate requests', async () => {
  const site = loadSite(), target = form();
  await Promise.all([submit(site, target), submit(site, target)]);
  assert.equal(site.calls.length, 1);
});

test('keyboard navigation moves focus out of the hidden source page', () => {
  const site = loadSite();
  let focused = false;
  const heading = { closest: () => null, focus(options) { focused = options.preventScroll; } };
  const panel = { querySelectorAll: () => [heading] };
  site.context.document.getElementById = id => id === 'mixcloud-page' ? panel : null;
  site.api.openSection('mixcloud-page');
  assert.equal(focused, true);
  assert.equal(heading.tabIndex, -1);
  assert.equal(site.location.hash, '#mixcloud');
});

test('new pages start at the top and history restores the scroll of the matching page', () => {
  const site = loadSite();
  let scrollTop;
  site.context.window.scrollY = 540;
  site.context.window.scrollTo = options => { scrollTop = options.top; };

  site.api.openSection('mixcloud-page');
  assert.equal(scrollTop, 0);

  site.history.replaceState({ section: 'home', scrollY: 540 }, '', '/');
  site.api.applyRouteFromLocation();
  assert.equal(scrollTop, 540);

  site.history.replaceState({ section: 'home', scrollY: 540 }, '', '#mixcloud');
  site.api.applyRouteFromLocation();
  assert.equal(scrollTop, 0);
});

test('closing the mobile menu restores focus from its hidden content', () => {
  let focusRestored = false;
  const button = { classList: { toggle() {} }, addEventListener() {}, setAttribute() {}, getAttribute() { return "false"; },
    focus(options) { focusRestored = options.preventScroll; } };
  const child = {};
  const menu = { classList: { toggle() {} }, toggleAttribute() {}, setAttribute() {},
    contains: node => node === child };
  const site = loadSite('example.com', { '[data-menu-toggle]': button, '[data-mobile-menu]': menu });
  site.context.document.activeElement = child;
  vm.runInContext('mobileMenuQuery.matches = true', site.context);
  site.api.setMenuOpen(false);
  assert.equal(focusRestored, true);
});
test('form feedback changes language and does not retain stale messages', async () => {
  const site = loadSite('localhost'), target = form();
  await submit(site, target);
  assert.equal(target.feedback.dataset.i18n, 'form_local_preview');
  site.context.document.querySelectorAll = selector => selector === '[data-i18n]' ? [target.feedback] : [];
  site.api.applyLanguage('en');
  assert.equal(target.feedback.textContent, site.api.translations.en.form_local_preview);
  site.api.setFeedback(target, null, '');
  assert.equal(target.feedback.dataset.i18n, undefined);
});

test('non-brand copy has real English translations', () => {
  const { translations } = loadSite().api;
  for (const key of ['beat_tape_1_description', 'beat_tape_2_description', 'random_jamz_description',
    'entry_resistance', 'entry_connection', 'entry_revolution', 'theme_white', 'theme_black',
    'print_1', 'print_2', 'print_3', 'work_in_progress']) {
    assert.notEqual(translations.it[key], translations.en[key], key);
  }
});
test('language switching translates accessible labels without replacing controls', () => {
  const site = loadSite();
  const text = { dataset: { i18n: 'theme_white' }, textContent: 'Bianco' };
  const arrow = { dataset: { i18nAriaLabel: 'gallery_next_label' }, textContent: '→',
    setAttribute(key, value) { this[key] = value; } };
  site.context.document.querySelectorAll = selector => selector === '[data-i18n]' ? [text] :
    selector === '[data-i18n-aria-label]' ? [arrow] : [];
  site.api.applyLanguage('en');
  assert.equal(text.textContent, 'White');
  assert.equal(arrow['aria-label'], 'Next print');
  assert.equal(arrow.textContent, '→');
  site.api.applyLanguage('it');
  assert.equal(text.textContent, 'Bianco');
  assert.equal(arrow['aria-label'], 'Stampa successiva');
});
