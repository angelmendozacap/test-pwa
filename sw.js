;
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1',
  FILES_TO_CACHE = [
    './',
    'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js',
    './css/main.css',
    './js/main.js',
    './img/ProgramadorFitness.png',
    './img/favicon.png'
  ]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE)
        .then(() => self.skipWaiting());
    })
    .catch(err => console.log('Fallo registro de cache', err))
  )
  console.log('[ServiceWorker] Install');
})

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');
  const cacheWhiteList = [CACHE_NAME]
  e.waitUntil(
    caches.keys()
    .then(cachesNames => {
      cachesNames.map(cacheName => {
        if (cacheWhiteList.indexOf(cacheName) === -1) {
          return caches.delete(cacheName)
        }
      })
    })
    .then(() => self.clients.claim())
  )

})

self.addEventListener('fetch', e => {
  console.log('[ServiceWorker] Fetch', e.request.url);

  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res
        }

        return fetch(e.request)
      })
  )
})