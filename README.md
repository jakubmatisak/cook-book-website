# Kuchárska kniha – prezentačná stránka

Stránka o rodinnej aplikácii [Kuchárska kniha](https://github.com/jakubmatisak/cook-book): recepty, jedálniček
a nákupný zoznam, ktoré si rodina nasadí zadarmo na vlastný účet Cloudflare.

Naživo: <https://jakubmatisak.github.io/cook-book-website/>

## Ako je postavená

- Čisté HTML, CSS a malý skript na prepínanie jazyka, bez buildu a bez závislostí.
- Texty sú po slovensky priamo v `index.html`; preklady sú v `i18n/sk.json` a `i18n/en.json`
  (atribúty `data-i18n`, `data-i18n-alt`, `data-i18n-aria`).
- Screenshoty v `assets/screens/` sú z ukážkovej inštancie s vymyslenými dátami (WebP, PNG ako záloha).
- GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Kontrola

```bash
npm run check
```

Overí, že každý text má preklad v oboch jazykoch, obrázky majú `alt`, rozmery a existujú, a že stránka nemá viac
ako 1,5 MB.

## Lokálne

```bash
npx serve .
```

---

# Family Cookbook – website

The website for the family app [Kuchárska kniha](https://github.com/jakubmatisak/cook-book) (Family Cookbook):
recipes, a weekly meal plan and a shopping list that a family deploys for free on its own Cloudflare account.
Plain HTML and CSS, Slovak and English, hosted on GitHub Pages. Run `npm run check` before committing.

## License

[PolyForm Noncommercial 1.0.0](LICENSE). Commercial use only with the author's written permission.
