const CACHE_NAME = 'tdah-ebook-v4';
const ASSETS = [
    './',
    'index.html',
    'css/style.css',
    'js/app.js',
    'js/illustrations.js',
    'manifest.json',
    'images/ch01.jpeg',
    'images/ch02.jpeg',
    'images/ch03.jpeg',
    'images/ch04.jpeg',
    'images/ch05.jpeg',
    'images/ch06.jpeg',
    'images/ch07.jpeg',
    'images/ch08.jpeg',
    'images/ch09.jpeg',
    'images/ch10.jpeg',
    'chapters/ch01.json',
    'chapters/ch02.json',
    'chapters/ch03.json',
    'chapters/ch04.json',
    'chapters/ch05.json',
    'chapters/ch06.json',
    'chapters/ch07.json',
    'chapters/ch08.json',
    'chapters/ch09.json',
    'chapters/ch10.json',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(c => c.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});
