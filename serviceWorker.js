const nombreCache = 'apv-v2';
const archivos = [
	'/',
	'/index.html',
	'/error.html',
	'/css/bootstrap.css',
	'/css/styles.css',
	'/js/app.js',
	'/js/swapp.js'
];

//Instalar el SW
self.addEventListener('install', (e) => {
	console.log('SW instalado');

	e.waitUntil(
		caches.open(nombreCache).then((cache) => {
			console.log('cacheando');
			cache.addAll(archivos);
		})
	);
});

//Activar el SW
self.addEventListener('activate', (e) => {
	console.log('SW Activado');

	e.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(keys.filter((key) => key !== nombreCache).map((key) => caches.delete(key)));
		})
	);

	console.log(e);
});

//Fetch para descargar archivos estáticos
self.addEventListener('fetch', (e) => {
	console.log('Fetch ejecutado...', e);

	e.respondWith(
		caches
			.match(e.request)
			.then((respuestaCache) => {
				return respuestaCache;
			})
			.catch(() => {
				return caches.match('/error.html');
			})
	);
});
