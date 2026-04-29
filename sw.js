const CACHE_NAME = 'mach1-v34';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );

  // Notify all open tabs that there's an update
  self.clients.matchAll({ type: 'window' }).then(function(clients) {
    clients.forEach(function(client) {
      client.postMessage({ type: 'APP_UPDATED', version: CACHE_NAME });
    });
  });
});

self.addEventListener('fetch', function(e) {
  // Always fetch fresh from network for the HTML file
  if (e.request.url.endsWith('/') || e.request.url.endsWith('index.html')) {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(fetch(e.request));
});
