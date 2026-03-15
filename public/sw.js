self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('app-cache').then(cache => {
      return cache.addAll(['/', '/index.html', '/style.css', '/main.js'])
    }),
  )
})

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)

  // Deixa passar direto (sem cache) arquivos que precisam do content-type correto
  // ou que não devem ser interceptados pelo service worker
  const bypass = ['/manifest.webmanifest', '/manifest.json']

  if (bypass.includes(url.pathname)) {
    return // não chama event.respondWith — browser busca direto na rede
  }

  // Para navegação (HTML), sempre busca na rede primeiro
  // Fallback para cache só se offline — evita devolver index.html pra tudo
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/index.html')))
    return
  }

  // Para assets (js, css, imagens) — cache first
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    }),
  )
})
