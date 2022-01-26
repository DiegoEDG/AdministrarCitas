import { ui } from './funciones.js';

export let DB;
export function crearDB() {
	const crearDB = window.indexedDB.open('citas', 1);

	//error
	crearDB.onerror = function () {
		console.log('Hubo un error al crear la DB');
	};

	crearDB.onsuccess = function () {
		console.log('DB creada correctamente');

		DB = crearDB.result;

		ui.mostrarCitas();
	};

	crearDB.onupgradeneeded = function (e) {
		const db = e.target.result;

		const objectStore = db.createObjectStore('citas', {
			keyPath: 'id',
			autoIncrement: true
		});

		//definir columnas
		objectStore.createIndex('id', 'id', { unique: true });
		objectStore.createIndex('mascota', 'mascota', { unique: false });
		objectStore.createIndex('propietario', 'propietario', { unique: false });
		objectStore.createIndex('telefono', 'telefono', { unique: false });
		objectStore.createIndex('fecha', 'fecha', { unique: false });
		objectStore.createIndex('hora', 'hora', { unique: false });
		objectStore.createIndex('sintomas', 'sintomas', { unique: false });

		console.log('schema creado');
	};
}
