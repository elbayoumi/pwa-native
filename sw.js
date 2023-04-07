// const CACHE_NAME = 'my-pwa-cache-v1';
// const urlsToCache = [
//   '/',
//   'index.html',
//   'assets/css/templatemo-softy-pinko.css',
//   'assets/js/custom.js',
//   'assets/css/bootstrap.min.css',
//   'assets/js/bootstrap.min.js',
//   'assets/js/popper.js',
//   'assets/images/logo.png'
// ];

// // Install Service Worker
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(urlsToCache))
//       .then(() => self.skipWaiting())
//   );
// });

// // Activate Service Worker

// // Fetch Event Listener
// self.addEventListener('fetch', event => {
//   event.respondWith(
//  caches.match(event.request).then(response=>{
//   if (response){
//     return response;
//   }
//   return fetch(event.request);
//  })
//   );
// });

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.filter(name => name !== CACHE_NAME)
//           .map(name => caches.delete(name))
//       );
//     })
//   );
// });



// 

const CACHE_NAME = 'my-pwa-cache';
const urlsToCache = [
  '/',
  'index.html',
  'assets/css/templatemo-softy-pinko.css',
  'assets/js/custom.js',
  'assets/css/bootstrap.min.css',
  'assets/js/bootstrap.min.js',
  'assets/js/popper.js',
  'assets/images/logo.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Fetch Event Listener
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});
