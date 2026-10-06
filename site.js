// Prepínač jazyka: slovenčina je priamo v HTML, angličtina (a návrat do slovenčiny) sa dosadí z i18n/*.json.
// Bez JavaScriptu ostane stránka po slovensky.
const STORAGE_KEY = 'kucharska-kniha-web-lang'
const LANGS = ['sk', 'en']

function preferredLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGS.includes(saved)) return saved
  } catch {
    // úložisko nie je dostupné (súkromné okno)
  }
  const browser = (navigator.language || 'sk').toLowerCase()
  return browser.startsWith('sk') || browser.startsWith('cs') ? 'sk' : 'en'
}

const cache = {}
async function dictionary(lang) {
  cache[lang] ??= fetch(`i18n/${lang}.json`).then((res) => (res.ok ? res.json() : {}))
  return cache[lang]
}

async function applyLang(lang, remember) {
  const dict = await dictionary(lang)
  document.documentElement.lang = lang
  for (const el of document.querySelectorAll('[data-i18n]')) {
    const text = dict[el.dataset.i18n]
    if (text) el.textContent = text
  }
  for (const el of document.querySelectorAll('[data-i18n-alt]')) {
    const text = dict[el.dataset.i18nAlt]
    if (text) el.alt = text
  }
  for (const el of document.querySelectorAll('[data-i18n-aria]')) {
    const text = dict[el.dataset.i18nAria]
    if (text) el.setAttribute('aria-label', text)
  }
  for (const button of document.querySelectorAll('[data-lang]')) {
    button.setAttribute('aria-pressed', String(button.dataset.lang === lang))
  }
  if (remember) {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // nevadí, len sa nezapamätá
    }
  }
}

for (const button of document.querySelectorAll('[data-lang]')) {
  button.addEventListener('click', () => applyLang(button.dataset.lang, true))
}

const initial = preferredLang()
if (initial !== 'sk') applyLang(initial, false)
