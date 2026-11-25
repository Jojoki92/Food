// Baut die eigenständige Web-App für Netlify in site/: node tools/build-site.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), out = path.join(root, 'site'), w = (f, s) => fs.writeFileSync(path.join(out, f), s);
const src = fs.readFileSync(path.join(root, 'index.html'), 'utf8'), cut = src.indexOf('<svg hidden>');
const files = ['index.html', 'start.jpg', 'rezepte.txt', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon-32.png'];

w('index.html', `<!doctype html>
<html lang="de"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Meine Rezepte: suchen, filtern, Zutaten abhaken, neue Rezepte hochladen.">
<meta property="og:title" content="Meal Prep"><meta property="og:image" content="icon-512.png">
<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="favicon-32.png"><link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Meal Prep"><meta name="theme-color" content="#16251c">
<style>:root{padding-block:env(safe-area-inset-top,0px) env(safe-area-inset-bottom,0px)}img{max-width:100%}</style>
${src.slice(0, cut).trim()}
</head><body>
${src.slice(cut).trim()}
<script>navigator.serviceWorker?.register("sw.js")</script>
</body></html>
`);
for (const f of ['start.jpg', 'rezepte.txt']) fs.copyFileSync(path.join(root, f), path.join(out, f));
w('manifest.webmanifest', JSON.stringify({
  name: 'Meal Prep', short_name: 'Meal Prep', lang: 'de', start_url: './', display: 'standalone', background_color: '#eef1eb', theme_color: '#16251c',
  icons: [192, 512].map(s => ({ src: `icon-${s}.png`, sizes: `${s}x${s}`, type: 'image/png', purpose: 'any maskable' }))
}, null, 1));
// Offline: Seite zuerst aus dem Netz, sonst aus dem Speicher; Bilder/Schriften aus dem Speicher und im Hintergrund erneuern
w('sw.js', `const C = "mealprep-${Date.now()}";
self.oninstall = e => e.waitUntil(caches.open(C).then(c => c.addAll(${JSON.stringify(['./', ...files.slice(1)])})).then(() => self.skipWaiting()));
self.onactivate = e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x != C).map(x => caches.delete(x)))).then(() => self.clients.claim()));
self.onfetch = e => {
  const r = e.request, u = new URL(r.url);
  if (r.method != "GET" || (u.origin != location.origin && !u.hostname.startsWith("fonts."))) return;
  const net = fetch(r).then(res => { const c = res.clone(); caches.open(C).then(x => x.put(r, c)); return res; });
  net.catch(() => {});
  e.respondWith(r.mode == "navigate" || u.pathname.endsWith(".txt") ? net.catch(() => caches.match(r, { ignoreSearch: true }).then(h => h || caches.match("./"))) : caches.match(r).then(h => h || net));
};
`);
w('_headers', '/sw.js\n  Cache-Control: no-cache\n');
console.log('site/ gebaut');
