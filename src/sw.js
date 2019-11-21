const CACHE_NAME = 'static-v1';
const ASSET_URLS = [
    '/',
    '/bundle.js',
    '/sw.js',
];

self.addEventListener('install', handleInstall);
self.addEventListener('activate', handleActivate);
self.addEventListener('fetch',  handleFetch);



function handleInstall(e) {
    e.waitUntil(
        cacheAssets()
    );
}

function handleActivate(e) {
    e.waitUntil(
        Promise.all([
            invalidateForeignCaches(),
            invalidateForeignAssets(),
        ])
    );
}

function handleFetch(e) {
    e.respondWith(
        doFetch(e.request)
    );
}



async function cacheAssets() {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSET_URLS);
}

async function invalidateForeignCaches() {
    let promises;

    const cacheNames = await caches.keys();
    promises = cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName));

    await Promise.all(promises);
}

async function invalidateForeignAssets() {
    let promises;

    const cache = await caches.open(CACHE_NAME);
    const responses = await cache.matchAll();
    promises = responses
        .map((response) => response.url.replace(location.origin, ''))
        .filter((url) => !ASSET_URLS.includes(url))
        .map((url) => cache.delete(url));

    await Promise.all(promises);
}

async function doFetch(req) {
    let response, isResponseOk;

    try {
        response = await fetch(req);
        isResponseOk = response.ok;
    } catch {
        isResponseOk = false;
    }

    if (isResponseOk) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(req, response.clone());
    } else {
        const cachedResponse = await caches.match(req);
        if (cachedResponse) {
            return cachedResponse;
        }
    }

    return response;
}
