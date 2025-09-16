const CACHE_NAME = 'unal-2025-v1';
const urlsToCache = [
    '/',
    'estilos.css',
    'headfooter.css',
    'moviles.css',
    'contadores.js',
    'performance.js',
    'script.js',
    'index.html',
    'horario.html',
    'requisitos.html',
    'bases.html',
    'redes.html',
    'optimizacion.html',
    'metodos.html',
    'simulacion.html',
    'apun.html',
    'ocho.html',
    'servidor.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
