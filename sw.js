// Service Worker for Albert Heijn Self-Scanner
const CACHE_NAME = 'ah-scanner-v2';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './products.js',
    './sounds.js',
    './version.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://unpkg.com/quagga@0.12.1/dist/quagga.min.js'
];

self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Cache installation failed:', error);
            })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Take control of all clients immediately
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Skip unsupported schemes (chrome-extension, chrome-search, etc.)
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then((fetchResponse) => {
                    // Check if we received a valid response
                    if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                        return fetchResponse;
                    }
                    
                    // Clone the response since it can only be consumed once
                    const responseToCache = fetchResponse.clone();
                    
                    // Only cache http/https requests to avoid chrome-extension errors
                    if (event.request.url.startsWith('http')) {
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            })
                            .catch((error) => {
                                console.log('Cache put failed:', error);
                            });
                    }
                    
                    return fetchResponse;
                }).catch(() => {
                    // Return a fallback for navigation requests when offline
                    if (event.request.destination === 'document') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});