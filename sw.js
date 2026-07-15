// v1.4: bumped cache name from dl3-v1.3 -> dl3-v1.4 so the fetch handler's
// cache-first strategy doesn't keep serving the old (pre-tare-fix) index.html
// forever to users who already have the PWA installed. The activate handler
// below deletes any cache whose name no longer matches CACHE, which only
// happens if CACHE itself changes between deployed versions.
const CACHE = 'dl3-v1.4';
const ASSETS = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html'))));
});
