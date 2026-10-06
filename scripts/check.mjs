// Kontrola stránky pred zverejnením: preklady, obrázky, zakázané reťazce a veľkosť. Spustenie: npm run check
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const errors = []
const fail = (msg) => errors.push(msg)

const html = existsSync(join(root, 'index.html')) ? readFileSync(join(root, 'index.html'), 'utf8') : null
if (!html) fail('Chýba index.html.')

const load = (lang) => {
  const path = join(root, 'i18n', `${lang}.json`)
  if (!existsSync(path)) {
    fail(`Chýba i18n/${lang}.json.`)
    return {}
  }
  return JSON.parse(readFileSync(path, 'utf8'))
}
const sk = load('sk')
const en = load('en')

// (a) každý kľúč v HTML je v oboch jazykoch a nie je prázdny
const keys = html ? [...html.matchAll(/data-i18n(?:-alt|-aria)?="([^"]+)"/g)].map((m) => m[1]) : []
if (html && keys.length === 0) fail('index.html nemá žiadne data-i18n kľúče.')
for (const key of new Set(keys)) {
  for (const [lang, dict] of [
    ['sk', sk],
    ['en', en],
  ]) {
    if (typeof dict[key] !== 'string' || !dict[key].trim()) fail(`Kľúč „${key}“ chýba alebo je prázdny v ${lang}.json.`)
  }
}
// (b) rovnaké kľúče v oboch jazykoch
for (const key of Object.keys(sk)) if (!(key in en)) fail(`Kľúč „${key}“ je v sk.json, ale nie v en.json.`)
for (const key of Object.keys(en)) if (!(key in sk)) fail(`Kľúč „${key}“ je v en.json, ale nie v sk.json.`)

// (c) obrázky: alt, rozmery a súbor
if (html) {
  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    const src = /src="([^"]+)"/.exec(tag)?.[1]
    if (!/\balt="/.test(tag)) fail(`Obrázok bez alt: ${src}`)
    if (!/\bwidth="\d+"/.test(tag) || !/\bheight="\d+"/.test(tag)) fail(`Obrázok bez width/height: ${src}`)
    if (src && !/^https?:/.test(src) && !existsSync(join(root, src))) fail(`Obrázok neexistuje: ${src}`)
  }
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    const file = m[1].split(' ')[0]
    if (!/^https?:/.test(file) && !existsSync(join(root, file))) fail(`Obrázok v srcset neexistuje: ${file}`)
  }
}

// (d) žiadne osobné údaje ani súkromné adresy
const FORBIDDEN = ['@kros.sk', 'jakub-matisak.workers.dev', 'peaceinkitchen', 'Romana', 'matisak@']
const texts = [html ?? '', JSON.stringify(sk), JSON.stringify(en)]
for (const word of FORBIDDEN) if (texts.some((t) => t.includes(word))) fail(`Zakázaný reťazec na stránke: ${word}`)

// (e) veľkosť stránky (bez docs, scripts a .git)
let total = 0
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'docs', 'scripts', 'node_modules'].includes(entry.name)) continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path)
    else if (!/\.png$/.test(entry.name)) total += statSync(path).size // PNG sú len záloha pre staré prehliadače
  }
}
walk(root)
if (total > 1.5 * 1024 * 1024) fail(`Stránka má ${(total / 1024 / 1024).toFixed(2)} MB, limit je 1,5 MB.`)

if (errors.length) {
  console.error(`Kontrola zlyhala (${errors.length}):\n- ` + errors.join('\n- '))
  process.exit(1)
}
console.log(`Kontrola prešla: ${new Set(keys).size} textov, ${(total / 1024).toFixed(0)} kB.`)
