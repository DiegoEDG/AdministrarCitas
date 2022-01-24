//Inputs
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//Objeto de la cita
const citaObj = {
	nombreMascota: '',
	nombrePropietario: '',
	telefono: '',
	fecha: '',
	hora: '',
	sitoma: ''
};

//eventListeners
eventListeners();
function eventListeners() {
	mascotaInput.addEventListener('input', datosCita);
	propietarioInput.addEventListener('input', datosCita);
	telefonoInput.addEventListener('input', datosCita);
	fechaInput.addEventListener('input', datosCita);
	horaInput.addEventListener('input', datosCita);
	sintomasInput.addEventListener('input', datosCita);
}

//obtener datos de la cita
function datosCita(e) {
	console.log(e.target.value);
	citaObj[e.target.name] = e.target.value;
}
