const CACHE_NAME = 'merch-kw-v3.1';
const ASSETS = [
  '/amazon-merch-keyword-generator/',
  '/amazon-merch-keyword-generator/index.html',
  '/amazon-merch-keyword-generator/manifest.json',
  '/amazon-merch-keyword-generator/icon-192.png',
  '/amazon-merch-keyword-generator/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js'
];

// Install ‚Äî cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate ‚Äî clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch ‚Äî network first, fallback to cache
self.addEventListener('fetch', e => {
  // Skip non-GET and API calls (AI APIs, Supabase)
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  if (url.includes('api.openai.com') ||
      url.includes('api.anthropic.com') ||
      url.includes('openrouter.ai') ||
      url.includes('generativelanguage.googleapis.com') ||
      url.includes('supabase.co')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        retur&W3∞¢“ê¢Ê6F6ÇÇÇí”‚66ÜW2Ê÷F6ÇÜRÁ&WVW7Bíê¢ì∞ß“ì∞