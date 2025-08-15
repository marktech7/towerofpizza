const CACHE_NAME = 'tower-pizza-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/bootstrap.min.css',
  '/css/font-awesome.css',
  '/css/plugin.css',
  '/css/main.css',
  '/js/jquery-1.11.2.min.js',
  '/js/bootstrap.min.js',
  '/js/main.js',
  '/images/Untitled-removebg-preview.png',
  '/images/Main.jpeg',
  '/images/interior2.jpg',
  '/favicon.ico'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle any pending form submissions when back online
  return Promise.resolve();
}