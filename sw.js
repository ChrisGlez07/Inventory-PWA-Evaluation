const CACHE_NAME = 'Version1';
const ASSETS = [
    './',
    './inventario.html',
    './css/inventario.css',
    './app.js',
    './db-inventario.js' 
];



// 1 Install 

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('SW: Pre-cacheando App Shell');
            return cache.addAll(ASSETS);
        })
    )
    console.log('Service Worker Installed');
    self.skipWaiting();
});

// 2 Evento Activación

self.addEventListener('activate', event => {
    console.log('Sw: Service worker activo y listo para controlar la App');
});

// 3 Evento Fetch: Interceptar cada peticion al servidor

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Si existe en cache, lo devolvemos; si no, vamos a la red
            return response || fetch(event.request);
        })
    );
    console.log('Sw: Interceptando peticiones, ejemplo ', event.request.url);
    if(event.request.url.includes('inventario.css')){{
        console.log('El SW ha detectado que pides el CSS, Podemos bloquearlo o cambiarlo');
    }}
});



