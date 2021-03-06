import { contenedorCitas } from '../selectores.js';
import { cargarEdicion, eliminarCita } from '../funciones.js';
import { DB } from '../indexedDB.js';

class UI {
	imprimirAlerta(mensaje, tipo) {
		const alerta = document.createElement('div');
		alerta.classList.add('alert', 'd-block', 'text-center', 'col-12');

		if (tipo) {
			alerta.classList.add('alert-danger');
		} else {
			alerta.classList.add('alert-success');
		}

		alerta.textContent = mensaje;
		const contenido = document.querySelector('#contenido');
		contenido.insertBefore(alerta, document.querySelector('.agregar-cita'));

		setTimeout(() => {
			alerta.remove();
		}, 3000);
	}

	mostrarCitas() {
		this.limpiarHTML();

		//leer los registros de la DB
		const objectStore = DB.transaction('citas').objectStore('citas');

		objectStore.openCursor().onsuccess = function (e) {
			const cursor = e.target.result;

			if (cursor) {
				const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cursor.value;

				const divCita = document.createElement('div');
				divCita.classList.add('cita', 'p-3');
				divCita.dataset.id = id;

				//scripting del componente cita
				const mascotaTitle = document.createElement('h2');
				mascotaTitle.textContent = mascota;
				mascotaTitle.classList.add('card-title', 'font-weight-bolder');

				const propietarioParrafo = document.createElement('p');
				propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario:</span> ${propietario}
      `;

				const telefonoParrafo = document.createElement('p');
				telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Telefono:</span> ${telefono}
      `;

				const fechaParrafo = document.createElement('p');
				fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha:</span> ${fecha}
      `;

				const horaParrafo = document.createElement('p');
				horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora:</span> ${hora}
      `;

				const sintomasParrafo = document.createElement('p');
				sintomasParrafo.innerHTML = `
        <span class="font-weight-bolder">S??ntomas:</span> ${sintomas}
      `;

				//Bot??n de eliminar
				const btnEliminar = document.createElement('button');
				btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
				btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`;

				btnEliminar.onclick = () => eliminarCita(id);

				//Bot??n de editar
				const btnEditar = document.createElement('button');
				btnEditar.classList.add('btn', 'btn-info', 'mr-2');
				btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>`;

				const cita = cursor.value;
				btnEditar.onclick = () => cargarEdicion(cita);

				//agregar cada elemento al componente
				divCita.appendChild(mascotaTitle);
				divCita.appendChild(propietarioParrafo);
				divCita.appendChild(telefonoParrafo);
				divCita.appendChild(fechaParrafo);
				divCita.appendChild(horaParrafo);
				divCita.appendChild(sintomasParrafo);
				divCita.appendChild(btnEliminar);
				divCita.appendChild(btnEditar);

				//agregar el componente al HTML
				contenedorCitas.appendChild(divCita);

				//pasar al siguiente elemento de la DB
				cursor.continue();
			}
		};
	}

	limpiarHTML() {
		while (contenedorCitas.firstChild) {
			contenedorCitas.removeChild(contenedorCitas.firstChild);
		}
	}
}

export default UI;
