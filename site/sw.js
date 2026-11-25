const C = "mealprep-1795619112563";
self.oninstall = e => e.waitUntil(caches.open(C).then(c => c.addAll(["./","start.jpg","rezepte.txt","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","favicon-32.png"])).then(() => self.skipWaiting()));
self.onactivate = e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x != C).map(x => caches.delete(x)))).then(() => self.clients.claim()));
self.onfetch = e => {
  const r = e.request, u = new URL(r.url);
  if (r.method != "GET" || (u.origin != location.origin && !u.hostname.startsWith("fonts."))) return;
  const net = fetch(r).then(res => { const c = res.clone(); caches.open(C).then(x => x.put(r, c)); return res; });
  net.catch(() => {});
  e.respondWith(r.mode == "navigate" || u.pathname.endsWith(".txt") ? net.catch(() => caches.match(r, { ignoreSearch: true }).then(h => h || caches.match("./"))) : caches.match(r).then(h => h || net));
};
