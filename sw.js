/* CREATEZ Control Center – Service Worker
   Ermöglicht Installation "Zum Startbildschirm hinzufügen" und Offline-Betrieb.

   Wichtig: HTML wird NETWORK-FIRST ausgeliefert. Vorher galt cache-first für
   alles, wodurch installierte Geräte dauerhaft eine alte App-Version bekamen
   und Updates (z. B. der PIN-Reset) nie ankamen. Der Cache dient jetzt nur
   noch als Offline-Reserve. */
const CACHE = 'createz-portal-v9';
const ASSETS = [
  './app.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-maskable.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

const isHtml = (req) =>
  req.mode === 'navigate' ||
  req.destination === 'document' ||
  (req.headers.get('accept') || '').includes('text/html');

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;     // Fremd-Hosts nicht anfassen
  if (url.pathname.endsWith('/sw.js')) return;         // Service Worker nie cachen

  const store = (res) => {
    if (res && res.status === 200 && res.type === 'basic') {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
    }
    return res;
  };

  // HTML: immer erst das Netz, Cache nur wenn offline.
  if (isHtml(req)) {
    e.respondWith(
      fetch(req)
        .then(store)
        .catch(() => caches.match(req).then((c) => c || caches.match('./app.html')))
    );
    return;
  }

  // Statisches (Icons, Manifest): Cache zuerst, im Hintergrund aktualisieren.
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then(store).catch(() => cached);
      return cached || network;
    })
  );
});
