if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('./serviceWorker.js')
		.then((registrado) => console.log('Registrado correctamente... ', registrado))
		.catch((error) => console.log('Falló la instalación...', error));
} else {
	console.log('Service Workers no soportados');
}
