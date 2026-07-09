'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.dataset.filterValue;
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.dataset.filterValue;
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// open the visitor's mail client with the message pre-filled
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.elements["fullname"].value;
    const email = form.elements["email"].value;
    const message = form.elements["message"].value;
    const subject = encodeURIComponent("Portfolio contact from " + name);
    const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
    window.location.href = "mailto:firasbenkhellifa@gmail.com?subject=" + subject + "&body=" + body;
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const target = this.dataset.navTarget;

    for (let j = 0; j < pages.length; j++) {
      if (target === pages[j].dataset.page) {
        pages[j].classList.add("active");
      } else {
        pages[j].classList.remove("active");
      }
    }

    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }
    this.classList.add("active");
    window.scrollTo(0, 0);

  });
}



// ---- language toggle (EN / FR) ----
const langToggle = document.querySelector("[data-lang-toggle]");
const langOpts = document.querySelectorAll("[data-lang-opt]");

const applyLanguage = function (lang) {

  document.documentElement.lang = lang;

  // swap text content
  document.querySelectorAll("[data-en]").forEach(function (el) {
    const value = lang === "fr" ? el.dataset.fr : el.dataset.en;
    if (value !== undefined) el.innerHTML = value;
  });

  // swap placeholders
  document.querySelectorAll("[data-en-ph]").forEach(function (el) {
    el.placeholder = lang === "fr" ? el.dataset.frPh : el.dataset.enPh;
  });

  // highlight active option
  langOpts.forEach(function (opt) {
    opt.classList.toggle("active", opt.dataset.langOpt === lang);
  });

  try { localStorage.setItem("portfolio-lang", lang); } catch (e) { /* private mode */ }
};

if (langToggle) {
  langToggle.addEventListener("click", function () {
    const next = document.documentElement.lang === "fr" ? "en" : "fr";
    applyLanguage(next);
  });
}

// restore saved language
(function () {
  let saved = "en";
  try { saved = localStorage.getItem("portfolio-lang") || "en"; } catch (e) { /* ignore */ }
  if (saved === "fr") applyLanguage("fr");
})();



// ---- theme toggle (dark / light) ----
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");

const applyTheme = function (theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  if (themeIcon) themeIcon.setAttribute("name", theme === "light" ? "sunny-outline" : "moon-outline");
  try { localStorage.setItem("portfolio-theme", theme); } catch (e) { /* private mode */ }
};

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    const next = document.documentElement.classList.contains("light") ? "dark" : "light";
    applyTheme(next);
  });
}

// restore saved theme (default: dark)
(function () {
  let saved = "dark";
  try { saved = localStorage.getItem("portfolio-theme") || "dark"; } catch (e) { /* ignore */ }
  if (saved === "light") applyTheme("light");
})();
