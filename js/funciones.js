import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import { DB } from './indexedDB.js';
import {
	formulario,
	mascotaInput,
	propietarioInput,
	telefonoInput,
	fechaInput,
	horaInput,
	sintomasInput
} from './selectores.js';

//Instancias de las clases
export const ui = new UI();
const citas = new Citas();

let editando;

//Objeto de la cita
const citaObj = {
	mascota: '',
	propietario: '',
	telefono: '',
	fecha: '',
	hora: '',
	sintomas: ''
};

//obtener datos de la cita
export function datosCita(e) {
	citaObj[e.target.name] = e.target.value;
}

//validar y agregar una cita
export function nuevaCita(e) {
	e.preventDefault();

	const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

	//validar
	if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
		ui.imprimirAlerta('Todos los campos son requeridos!!', 'Error');
		return;
	}

	if (editando) {
		citas.editarCita({ ...citaObj });

		ui.imprimirAlerta('Se editó la cita de manera correcta');

		formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

		editando = false;
	} else {
		//agregar un id a la cita
		citaObj.id = Date.now();

		//Creando una nueva cita
		citas.registrarCitas({ ...citaObj });

		//crear la transacción
		const transaction = DB.transaction(['citas'], 'readwrite');

		//habilitar el object store
		const objetStore = transaction.objectStore('citas');

		//agregar el registro a la DB
		objetStore.add(citaObj);

		//si la transacción se completo
		transaction.oncomplete = function () {
			ui.imprimirAlerta('La cita se agregó correctamente!');
		};
	}
	//reiniciar form
	formulario.reset();

	//reiniciar objeto
	reiniciarObjeto();

	ui.mostrarCitas();
}

export function reiniciarObjeto() {
	citaObj.mascota = '';
	citaObj.propietario = '';
	citaObj.telefono = '';
	citaObj.fecha = '';
	citaObj.hora = '';
	citaObj.sintomas = '';
}

export function eliminarCita(id) {
	//eliminar la cita del objeto
	citas.removerCita(id);
	//mostrar el mensaje
	ui.imprimirAlerta('Se eliminó la cita correctamente');
	//Refrescar citas en el HTML
	ui.mostrarCitas();
}

export function cargarEdicion(cita) {
	const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita;

	mascotaInput.value = mascota;
	propietarioInput.value = propietario;
	telefonoInput.value = telefono;
	fechaInput.value = fecha;
	horaInput.value = hora;
	sintomasInput.value = sintomas;

	citaObj.id = id;
	citaObj.mascota = mascota;
	citaObj.propietario = propietario;
	citaObj.telefono = telefono;
	citaObj.fecha = fecha;
	citaObj.hora = hora;
	citaObj.sintomas = sintomas;

	formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

	editando = true;
}
