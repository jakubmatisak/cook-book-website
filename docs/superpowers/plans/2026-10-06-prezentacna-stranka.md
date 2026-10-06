# Prezentačná stránka – plán implementácie

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Kroky používajú zaškrtávanie (`- [ ]`).

**Cieľ:** Jednostránková prezentácia Kuchárskej knihy (SK/EN) so screenshotmi z ukážkových dát, nasadená na GitHub Pages
a prepojená z README aplikácie.

**Architektúra:** Statická stránka bez build nástrojov: `index.html` (slovenčina priamo v HTML), `styles.css` (tokeny
dizajn systému Kuchárka ako CSS premenné), `site.js` (prepínač jazyka podľa `data-i18n`), `i18n/sk.json` a `i18n/en.json`.
Screenshoty vznikajú z lokálnej inštancie aplikácie s oddelenou databázou a vymyslenými dátami (Playwright), WebP + PNG.

**Tech Stack:** HTML, CSS, vanilla JS, Node.js skripty (kontrola, prevod obrázkov cez `sharp` z repozitára aplikácie),
Playwright MCP na screenshoty.

**Spec:** `docs/superpowers/specs/2026-10-06-prezentacna-stranka-design.md`; vizuál:
https://claude.ai/artifact/XrwketV7oYqoMGKUyB1MfC (dizajn systém Kuchárka).

## Global Constraints

- Žiadne osobné údaje: na stránke ani v obrázkoch žiadne skutočné mená, e-maily, domény (okrem odkazov na GitHub repozitáre).
- Farby a písmo len z dizajn systému Kuchárka: `paper #F5EFE4`, `paper-raised #FBF8F2`, `paper-sunk #ECE3D3`, `ink #2B211A`,
  `ink-muted #65574B`, `line #DDD2C0`, `line-strong #8F7E6B`, `paprika #B23A21`, `paprika-deep #8F2C16`, `herb-deep #3E5636`;
  Fraunces (nadpisy), Instrument Sans (text); žiadne tiene, hĺbku robia linky.
- Bez build nástrojov a knižníc; celá stránka do 1,5 MB; obrázky s `width`/`height`, mimo hero `loading="lazy"`.
- Prístupnosť: kontrast AA, `alt` v oboch jazykoch, ovládanie klávesnicou, `prefers-reduced-motion`.
- Licencia stránky aj obsahu: PolyForm Noncommercial 1.0.0 (ako aplikácia).

## Review Focus

1. Prepínač jazyka bez JavaScriptu: stránka musí byť celá čitateľná po slovensky.
2. Kľúč `data-i18n`, ktorý chýba v jednom z jazykov: stránka nesmie ukázať prázdny text (kontrolný skript ho nájde).
3. Úzky mobil (320–390 px): žiadne vodorovné posúvanie, tlačidlá ≥ 44 px.
4. Screenshot s osobným údajom (meno, e-mail, doména): kontrola zoznamom zakázaných reťazcov a pohľadom na každý obrázok.
5. Mŕtvy odkaz medzi README aplikácie a stránkou.

---

### Task 1: Kontrolný skript stránky (najprv padá)

**Files:** Create `scripts/check.mjs`, `package.json` (len `"type": "module"` a skript `check`).

- [ ] Skript overí: (a) každý `data-i18n` kľúč v `index.html` je v `i18n/sk.json` aj `i18n/en.json` a nie je prázdny,
  (b) oba JSON majú rovnaké kľúče, (c) každý `<img>` má `alt`, `width`, `height` a súbor existuje, (d) `index.html` ani JSON
  neobsahujú zakázané reťazce (`@kros.sk`, `jakub-matisak.workers.dev`, `peaceinkitchen`, rodinné mená zo zoznamu v skripte),
  (e) celková veľkosť súborov stránky ≤ 1,5 MB.
- [ ] `node scripts/check.mjs` → FAIL (chýba `index.html`).

### Task 2: Ukážková inštancia a dáta (repozitár aplikácie, nič z toho sa necommituje)

**Files:** `vite.demo.config.ts` (už je, v `.git/info/exclude`), `.superpowers/seed/demo.mjs` (gitignored).

- [ ] Oddelená databáza `.wrangler/demo` s migráciami; server `npx vite --config vite.demo.config.ts` na porte 5190.
- [ ] `demo.mjs` cez API: základné suroviny, 21 ukážkových receptov (SQL z `gen.mjs`), ľudia pri stole Mama, Tato,
  Eva (dieťa 0,5), Peter (dieťa 0,7), návšteva Babka s alergiou na orechy, jedálniček na aktuálny týždeň (10 jedál),
  4 obľúbené, 9 surovín v špajzi (2 s trvanlivosťou), vygenerovaný nákup.
- [ ] Kontrola: `/api/v1/recipes` vráti 21 receptov, `/api/v1/plan` aktuálneho týždňa aspoň 10 jedál.

### Task 3: Screenshoty

**Files:** `assets/screens/<názov>.png` a `.webp` podľa tabuľky v spec.

- [ ] Playwright: 1440×900 a 1280×800 svetlý režim, mobil 390×844 tmavý; súbory `hero-plan`, `home-tiles`, `recipes-list`,
  `recipe-detail`, `shopping`, `pantry`, `family`, `dark-mobile`.
- [ ] Prevod na WebP (kvalita 82) skriptom so `sharp`; PNG ostáva ako záloha.
- [ ] Pozrieť každý obrázok: žiadne osobné údaje.

### Task 4: Stránka

**Files:** `index.html`, `styles.css`, `site.js`, `i18n/sk.json`, `i18n/en.json`, `favicon.svg`, `.nojekyll`, `README.md`, `LICENSE`.

- [ ] `index.html` podľa vizuálneho návrhu (8 sekcií), slovenské texty priamo v HTML, `data-i18n` na každom texte,
  `<picture>` s WebP a PNG, `lang` sa mení s jazykom.
- [ ] `styles.css`: premenné z tokenov, rozloženie flex/grid s `flex-wrap`, žiadne tiene, focus obrys 2 px `ink`.
- [ ] `site.js`: jazyk z `localStorage`, inak z `navigator.language` (sk/cs → sk, inak en), dosadí texty a `alt`, prepne
  `aria-current` na prepínači; bez JS ostáva slovenčina.
- [ ] `node scripts/check.mjs` → PASS.

### Task 5: Overenie v prehliadači

- [ ] Lokálne (statický server) v šírkach 390, 768, 1280: bez vodorovného posúvania, prepínač jazyka funguje, odkazy na GitHub.

### Task 6: Zverejnenie

- [ ] Commit a push `cook-book-website` (main). GitHub Pages zapne vlastník v Settings → Pages (Deploy from branch, `main`, `/`).
- [ ] README aplikácie (EN aj SK): odkaz na stránku `https://jakubmatisak.github.io/cook-book-website/`; commit v aplikácii,
  push až so súhlasom (push spúšťa nasadenie aplikácie).
