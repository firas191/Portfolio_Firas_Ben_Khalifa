'use strict';

/**
 * Portfolio — Firas Ben Khalifa
 * Vanilla JS. No build step, no dependencies.
 *
 * Sections below, in order:
 *   1. helpers
 *   2. sidebar (mobile contacts toggle)
 *   3. project filtering
 *   4. contact form
 *   5. page navigation (hash-routed)
 *   6. CV: language-aware files + preview modal
 *   7. language switching (EN / FR)
 *   8. theme switching (dark / light)
 */


/* ------------------------------------------------------------------ *
 * 1. helpers
 * ------------------------------------------------------------------ */

const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

const store = {
  get(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }
};

const currentLang = () => (document.documentElement.lang === 'fr' ? 'fr' : 'en');


/* ------------------------------------------------------------------ *
 * 2. sidebar — contacts toggle on small screens
 * ------------------------------------------------------------------ */

const sidebar = $('[data-sidebar]');
const sidebarBtn = $('[data-sidebar-btn]');

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', function () {
    const open = sidebar.classList.toggle('active');
    sidebarBtn.setAttribute('aria-expanded', String(open));
  });
}


/* ------------------------------------------------------------------ *
 * 3. project filtering
 * ------------------------------------------------------------------ */

const filterItems = $$('[data-filter-item]');
const filterBtns = $$('[data-filter-btn]');
const selectBox = $('[data-select]');
const selectItems = $$('[data-select-item]');
const selectValue = $('[data-select-value]');

let activeFilter = 'all';

const applyFilter = function (value) {
  activeFilter = value;

  filterItems.forEach(function (item) {
    item.classList.toggle('active', value === 'all' || value === item.dataset.category);
  });

  filterBtns.forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.filterValue === value);
  });

  // keep the mobile select label in sync, in the current language
  if (selectValue) {
    const source = filterBtns.find(function (btn) { return btn.dataset.filterValue === value; });
    if (source) {
      const label = currentLang() === 'fr' ? source.dataset.fr : source.dataset.en;
      selectValue.textContent = label || source.textContent;
    }
  }
};

if (selectBox) {
  selectBox.addEventListener('click', function () {
    const open = selectBox.classList.toggle('active');
    selectBox.setAttribute('aria-expanded', String(open));
  });
}

selectItems.forEach(function (item) {
  item.addEventListener('click', function () {
    applyFilter(this.dataset.filterValue);
    selectBox.classList.remove('active');
    selectBox.setAttribute('aria-expanded', 'false');
  });
});

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () { applyFilter(this.dataset.filterValue); });
});


/* ------------------------------------------------------------------ *
 * 4. contact form — opens the visitor's mail client
 * ------------------------------------------------------------------ */

const form = $('[data-form]');
const formBtn = $('[data-form-btn]');

if (form && formBtn) {

  const syncFormBtn = function () {
    if (form.checkValidity()) formBtn.removeAttribute('disabled');
    else formBtn.setAttribute('disabled', '');
  };

  $$('[data-form-input]', form).forEach(function (input) {
    input.addEventListener('input', syncFormBtn);
  });

  syncFormBtn();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) return;

    const name = form.elements.fullname.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');

    window.location.href = 'mailto:firasbenkhellifa@gmail.com?subject=' + subject + '&body=' + body;
  });
}


/* ------------------------------------------------------------------ *
 * 5. page navigation — hash-routed so sections are linkable
 * ------------------------------------------------------------------ */

const navLinks = $$('[data-nav-link]');
const pages = $$('[data-page]');
const validPages = pages.map(function (p) { return p.dataset.page; });

const showPage = function (target, updateHash) {
  if (validPages.indexOf(target) === -1) target = validPages[0];

  pages.forEach(function (page) {
    page.classList.toggle('active', page.dataset.page === target);
  });

  navLinks.forEach(function (link) {
    const isActive = link.dataset.navTarget === target;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (updateHash && window.location.hash.slice(1) !== target) {
    history.pushState(null, '', '#' + target);
  }

  window.scrollTo(0, 0);
};

navLinks.forEach(function (link) {
  link.addEventListener('click', function () { showPage(this.dataset.navTarget, true); });
});

window.addEventListener('popstate', function () {
  showPage(window.location.hash.slice(1), false);
});

if (window.location.hash) showPage(window.location.hash.slice(1), false);


/* ------------------------------------------------------------------ *
 * 6. CV — the selected language decides which PDF is used
 * ------------------------------------------------------------------ */

const CV_FILES = {
  en: { file: './Resume_Firas_Ben_Khalifa.pdf', download: 'Firas_Ben_Khalifa_Resume.pdf' },
  fr: { file: './Curriculum_Vitae_Firas_Ben_Khalifa.pdf', download: 'Firas_Ben_Khalifa_CV.pdf' }
};

const CV_LABELS = {
  en: { en: 'English version', fr: 'Version anglaise' },
  fr: { en: 'French version', fr: 'Version française' }
};

const cvModal = $('[data-cv-modal]');
const cvFrame = $('[data-cv-frame]');
const cvLangLabel = $('[data-cv-lang-label]');
const cvLangBtns = $$('[data-cv-lang]');

// which CV is currently selected; follows the site language until the
// visitor overrides it inside the modal
let cvLang = currentLang();

const applyCvLanguage = function (lang) {
  cvLang = CV_FILES[lang] ? lang : 'en';
  const cv = CV_FILES[cvLang];

  // sidebar + contact download buttons
  $$('[data-cv-download], [data-cv-download-modal]').forEach(function (el) {
    el.setAttribute('href', cv.file);
    el.setAttribute('download', cv.download);
  });

  $$('[data-cv-newtab]').forEach(function (el) { el.setAttribute('href', cv.file); });

  // only load the PDF while the modal is actually open
  if (cvFrame && cvModal && !cvModal.hidden) cvFrame.setAttribute('src', cv.file);

  if (cvLangLabel) cvLangLabel.textContent = CV_LABELS[cvLang][currentLang()];

  cvLangBtns.forEach(function (btn) {
    const isActive = btn.dataset.cvLang === cvLang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
};

let cvLastFocus = null;

const openCvModal = function () {
  if (!cvModal) return;
  cvLastFocus = document.activeElement;
  cvModal.hidden = false;
  document.body.classList.add('no-scroll');
  if (cvFrame) cvFrame.setAttribute('src', CV_FILES[cvLang].file);
  const closeBtn = $('.cv-modal-close', cvModal);
  if (closeBtn) closeBtn.focus();
};

const closeCvModal = function () {
  if (!cvModal || cvModal.hidden) return;
  cvModal.hidden = true;
  document.body.classList.remove('no-scroll');
  // release the PDF so it is not kept in memory behind the page
  if (cvFrame) cvFrame.setAttribute('src', 'about:blank');
  if (cvLastFocus && cvLastFocus.focus) cvLastFocus.focus();
};

$$('[data-cv-open]').forEach(function (btn) { btn.addEventListener('click', openCvModal); });
$$('[data-cv-close]').forEach(function (btn) { btn.addEventListener('click', closeCvModal); });

cvLangBtns.forEach(function (btn) {
  btn.addEventListener('click', function () { applyCvLanguage(this.dataset.cvLang); });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeCvModal();
});


/* ------------------------------------------------------------------ *
 * 7. language switching (EN / FR)
 * ------------------------------------------------------------------ */

const langToggle = $('[data-lang-toggle]');
const langOpts = $$('[data-lang-opt]');

const applyLanguage = function (lang) {

  document.documentElement.lang = lang;

  // text content
  $$('[data-en]').forEach(function (el) {
    const value = lang === 'fr' ? el.dataset.fr : el.dataset.en;
    if (value === undefined) return;
    if (el.tagName === 'META') el.setAttribute('content', value);
    else el.innerHTML = value;
  });

  // input placeholders
  $$('[data-en-ph]').forEach(function (el) {
    el.placeholder = lang === 'fr' ? el.dataset.frPh : el.dataset.enPh;
  });

  // accessible labels
  $$('[data-en-label]').forEach(function (el) {
    el.setAttribute('aria-label', lang === 'fr' ? el.dataset.frLabel : el.dataset.enLabel);
  });

  langOpts.forEach(function (opt) {
    opt.classList.toggle('active', opt.dataset.langOpt === lang);
  });

  // dependent UI that is not a simple text swap
  applyFilter(activeFilter);
  applyCvLanguage(lang);

  store.set('portfolio-lang', lang);
};

if (langToggle) {
  langToggle.addEventListener('click', function () {
    applyLanguage(currentLang() === 'fr' ? 'en' : 'fr');
  });
}


/* ------------------------------------------------------------------ *
 * 8. theme switching (dark / light)
 * ------------------------------------------------------------------ */

const themeToggle = $('[data-theme-toggle]');
const themeIcon = $('[data-theme-icon]');
const themeMeta = $('[data-theme-color]');

const THEME_LABELS = {
  dark: { en: 'Switch to light mode', fr: 'Passer en mode clair' },
  light: { en: 'Switch to dark mode', fr: 'Passer en mode sombre' }
};

const applyTheme = function (theme) {
  const isLight = theme === 'light';

  document.documentElement.classList.toggle('light', isLight);
  if (themeIcon) themeIcon.setAttribute('name', isLight ? 'sunny-outline' : 'moon-outline');
  if (themeMeta) themeMeta.setAttribute('content', isLight ? '#f0ece3' : '#121212');

  if (themeToggle) {
    const labels = THEME_LABELS[isLight ? 'light' : 'dark'];
    themeToggle.dataset.enLabel = labels.en;
    themeToggle.dataset.frLabel = labels.fr;
    themeToggle.setAttribute('aria-label', labels[currentLang()]);
  }

  store.set('portfolio-theme', theme);
};

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    applyTheme(document.documentElement.classList.contains('light') ? 'dark' : 'light');
  });
}


/* ------------------------------------------------------------------ *
 * boot — the inline <head> script already set the class/lang, so this
 * only syncs the rest of the UI to that state
 * ------------------------------------------------------------------ */

applyTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
applyLanguage(currentLang());

