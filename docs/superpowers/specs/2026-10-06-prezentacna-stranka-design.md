# Prezentačná stránka Kuchárskej knihy – návrh

Stav: návrh na schválenie · Dátum: 2026-10-06 · Repozitár: `cook-book-website` (aplikácia je v `cook-book`)

## Zámer

Samostatná jednostránková prezentácia aplikácie Kuchárska kniha. Kto otvorí README hlavného repozitára, má si pod ňou
vedieť **predstaviť, ako aplikácia vyzerá a čo vie**, a ak sa mu páči, **stiahnuť si ju a nasadiť na vlastnom
Cloudflare zadarmo**.

Publikum: rodiny, ktoré si chcú aplikáciu nasadiť (netechnickí až polotechnickí ľudia). Vývojárske detaily sú len
v krátkosti a odkazom na README.

## Čo je mimo rozsahu

- Samotná aplikácia, jej demo na živo ani registrácia (aplikácia je súkromná, každý si nasadí vlastnú).
- Blog, analytika, cookies, formuláre. Stránka nezbiera žiadne údaje.
- Marketingové sľuby, ktoré aplikácia nespĺňa (napr. synchronizácia medzi rodinami mimo jednej domácnosti).

## Rozhodnutia

| Téma       | Rozhodnutie                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Hosting    | GitHub Pages z vetvy `main` repozitára `cook-book-website` (zadarmo).                                   |
| Technika   | Obyčajné HTML + CSS + malý JS súbor (prepínač jazyka, ukážka tmavej témy). Bez build nástrojov a bez knižníc. |
| Jazyky     | Slovensky a anglicky, prepínač v hlavičke, výber sa pamätá v `localStorage` (so záložným jazykom prehliadača). |
| Obrázky    | Screenshoty z lokálnej ukážkovej databázy (WebP + PNG záloha), žiadne osobné ani rodinné údaje.         |
| Licencia   | Stránka: rovnaká ako aplikácia (PolyForm Noncommercial 1.0.0). Screenshoty ukazujú len vymyslené dáta.  |
| Vzhľad     | Návrh cez `/design`; farby a písmo vychádzajú z aplikácie (terakota `#B4532A`, krémová, Nunito).        |

## Príbeh stránky (od hlavy po pätu)

1. **Hlava (hero):** názov, slogan „Recepty, jedálniček a nákup pre celú rodinu – zadarmo na vlastnom Cloudflare“,
   tlačidlá **Ako si ju nasadiť** (kotva na sekciu 6) a **Zdrojový kód** (GitHub), hlavný screenshot jedálnička
   (desktop + mobil vedľa seba).
2. **Prečo:** otázka „Čo bude dnes na večeru?“ a jedna veta o tom, čo aplikácia rieši: recepty, plán a nákup na
   jednom mieste, s porciami podľa toho, kto sedí pri stole.
3. **Ako to funguje v 3 krokoch:** pridaj recepty (aj z webu jedným klikom) → naplánuj týždeň → nakúp podľa porcií.
4. **Funkcie so screenshotmi** (každá: nadpis, 1–2 vety, obrázok):
   - Recepty a import z webu (zoznam, detail, skupiny ingrediencií, Pravda, Aktuality, Kuchyňa Lidla, Najrecept).
   - Jedálniček (týždeň, presun myšou, šablóny týždňov, návrhy „čo uvariť dnes“).
   - Nákup (generovanie z plánu, odpočet špajze, stále položky, tlač na viac stĺpcov).
   - Špajza („čo viem uvariť“, trvanlivosť, filter podľa kategórie).
   - Pri stole (porcie podľa osôb, alergie, averzie, návštevy a ich pobyty).
   - Domácnosti a verejné recepty (viac domácností, vlastníci a členovia, zdieľanie receptov).
   - Drobnosti v jednom riadku: tmavý režim, mobil a offline (PWA), slovenčina a angličtina, export a zálohy.
5. **Tvoje dáta:** súkromné, beží na vlastnom Cloudflare účte, 0 € na free tier, prihlásenie cez Cloudflare Access,
   žiadne sledovanie.
6. **Nasadenie:** 4 kroky s odhadom času (asi 30 minút): (1) stiahni alebo forkni repozitár, (2) Cloudflare účet a
   Zero Trust Access, (3) D1 databáza a R2 priestor na fotky, (4) `npm run deploy`. Odkaz na podrobný návod v README
   (anglicky aj slovensky) a na rozšírenie do Chromu.
7. **Licencia a časté otázky:** PolyForm Noncommercial 1.0.0: osobné a rodinné použitie je voľné, komerčné len
   s písomným súhlasom autora. FAQ: Koľko to stojí? Potrebujem programovať? Kde sú moje dáta? Môžem to použiť vo firme?
8. **Päta:** odkazy na GitHub (aplikácia a stránka), licencia, prepínač jazyka, rok.

## Obrazový obsah (screenshoty)

Zdroj: lokálna inštancia s oddelenou databázou, ukážkové dáta: 21 základných receptov (bez fotiek, so zástupnou
ikonou hrnca), rodina Mama, Tato, Eva (dieťa), Peter (dieťa), návšteva Babka, naplnený týždeň, nákupný zoznam,
špajza s niekoľkými surovinami. Žiadne reálne mená, e-maily ani domény.

| Súbor                    | Obrazovka                                        | Veľkosť  |
| ------------------------ | ------------------------------------------------ | -------- |
| `hero-plan`              | Jedálniček, týždeň (svetlý) + mobil              | 1440×900 |
| `home-tiles`             | Prehľad, dlaždice typov jedla                    | 1280×800 |
| `recipes-list`           | Zoznam receptov (tabuľka)                        | 1280×800 |
| `recipe-detail`          | Detail receptu so skupinami ingrediencií         | 1280×800 |
| `shopping`               | Nákup po kategóriách                             | 1280×800 |
| `pantry`                 | Špajza s filtrom kategórie                       | 1280×800 |
| `family`                 | Pri stole (porcie, alergie, návšteva)            | 1280×800 |
| `dark-mobile`            | Mobil v tmavej téme (jedálniček alebo nákup)     | 390×844  |

## Obsah a texty

Texty sú v jednom JSON súbore po jazykoch (`i18n/sk.json`, `i18n/en.json`), stránka ich dosadí podľa `data-i18n`
atribútov; bez JavaScriptu sa zobrazí slovenčina zapísaná priamo v HTML. Tón: priateľský, jednoduchý, bez
žargónu, bez prehnaných superlatívov.

## Kvalita a kontrola

- Prístupnosť: sémantické HTML, kontrast aspoň AA, `alt` pri každom obrázku v oboch jazykoch, ovládanie klávesnicou,
  `prefers-reduced-motion` rešpektovaný.
- Výkon: obrázky s `width`/`height`, `loading="lazy"` mimo hero, WebP; celá stránka pod 1,5 MB.
- Zobrazenie: mobil (390 px), tablet (768 px), desktop (1280 px) bez vodorovného posúvania.
- Nesmie obsahovať: osobné údaje, skutočné e-maily, reálne domény, odkazy na súkromné veci.
- Odkazy: README aplikácie bude odkazovať na stránku a stránka na README (overiť, že nie sú mŕtve).

## Postup po schválení

1. Schváliť tento návrh.
2. Vizuálny návrh cez `/design` (spúšťa ho používateľ), z neho vzniknú farby, typografia a rozloženie.
3. Ukážkové dáta a screenshoty (podľa tabuľky), kontrola, že neobsahujú osobné údaje.
4. Implementácia stránky, SK/EN texty, kontrola v troch šírkach a v tmavom režime.
5. Zverejnenie cez GitHub Pages, odkaz v README aplikácie (SK aj EN).
