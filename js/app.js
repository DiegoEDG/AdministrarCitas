//Inputs
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//form
const formulario = document.querySelector('#nueva-cita');

//contenedor citas
const contenedorCitas = document.querySelector('#citas');

//eventListeners
eventListeners();
function eventListeners() {
	mascotaInput.addEventListener('input', datosCita);
	propietarioInput.addEventListener('input', datosCita);
	telefonoInput.addEventListener('input', datosCita);
	fechaInput.addEventListener('input', datosCita);
	horaInput.addEventListener('input', datosCita);
	sintomasInput.addEventListener('input', datosCita);

	formulario.addEventListener('submit', nuevaCita);
}

//Objeto de la cita
const citaObj = {
	mascota: '',
	propietario: '',
	telefono: '',
	fecha: '',
	hora: '',
	sintomas: ''
};

class Citas {
	constructor() {
		this.citas = [];
	}

	registrarCitas(cita) {
		this.citas = [...this.citas, cita];
	}

	removerCita(id) {
		this.citas = this.citas.filter((cita) => cita.id !== id);
	}
}

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

	mostrarCitas({ citas }) {
		this.limpiarHTML();

		citas.forEach((cita) => {
			const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita;

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
        <span class="font-weight-bolder">Síntomas:</span> ${sintomas}
      `;

			//Botón de eliminar
			const btnEliminar = document.createElement('button');
			btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
			btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`;

			btnEliminar.onclick = () => eliminarCita(id);

			//agregar cada elemento al componente
			divCita.appendChild(mascotaTitle);
			divCita.appendChild(propietarioParrafo);
			divCita.appendChild(telefonoParrafo);
			divCita.appendChild(fechaParrafo);
			divCita.appendChild(horaParrafo);
			divCita.appendChild(sintomasParrafo);
			divCita.appendChild(btnEliminar);

			//agregar el componente al HTML
			contenedorCitas.appendChild(divCita);
		});
	}

	limpiarHTML() {
		while (contenedorCitas.firstChild) {
			contenedorCitas.removeChild(contenedorCitas.firstChild);
		}
	}
}

//obtener datos de la cita
function datosCita(e) {
	citaObj[e.target.name] = e.target.value;
}

const ui = new UI();
const citas = new Citas();

//validar y agregar una cita
function nuevaCita(e) {
	e.preventDefault();

	const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

	//validar
	if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
		ui.imprimirAlerta('Todos los campos son requeridos!!', 'Error');
		return;
	}

	//agregar un id a la cita
	citaObj.id = Date.now();

	//Creando una nueva cita
	citas.registrarCitas({ ...citaObj });

	//reiniciar form
	formulario.reset();

	//reiniciar objeto
	reiniciarObjeto();

	ui.mostrarCitas(citas);
}

function reiniciarObjeto() {
	citaObj.mascota = '';
	citaObj.propietario = '';
	citaObj.telefono = '';
	citaObj.fecha = '';
	citaObj.hora = '';
	citaObj.sintomas = '';
}

function eliminarCita(id) {
	//eliminar la cita del objeto
	citas.removerCita(id);
	//mostrar el mensaje
	ui.imprimirAlerta('Se eliminó la cita correctamente');
	//Refrescar citas en el HTML
	ui.mostrarCitas(citas);
}
