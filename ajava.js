document.addEventListener('DOMContentLoaded', function() {
    // obtener el formulario y los campos del formulario
    const form = document.getElementById('contact-form');
    const propuestaSalarialInput = document.getElementById('propuesta-salarial');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const informacionFormulario = document.getElementById('informacion-formulario');

    // variable para almacenar el campo y la dirección de ordenamiento 
    let campoOrdenamiento = null;
    let ordenAscendente = true;

    // array para almacenar los datos del formulario
    let datosFormulario = [];

    // agregar un envio al formulario
    form.addEventListener('submit', function(event) {
    event.preventDefault();

    // obtener el valor de la propuesta salarial
    const propuestaSalarial = propuestaSalarialInput.value;

    // validar si el valor es menor a 70000
    if (propuestaSalarial < 70000) {
    // mostrar un mensaje de error
        alert('La propuesta salarial es baja. El mínimo es de $70000.');
        return;
    }

    // calcular el valor en dolares y reales brasileños
    const propuestaSalarialUSD = (propuestaSalarial / 250).toFixed(2);
    const propuestaSalarialBRL = (propuestaSalarial / 1320).toFixed(2);

    // obtener valores de los campos del formulario
    const nombre = nombreInput.value;
    const email = emailInput.value;
    const mensaje = mensajeInput.value;

    // crear objeto para almacenar la informacion del formulario
    const formData = {
        propuestaSalarial: propuestaSalarial,
        propuestaSalarialUSD: propuestaSalarialUSD,
        propuestaSalarialBRL: propuestaSalarialBRL,
        nombre: nombre,
        email: email,
        mensaje: mensaje
    };

    // agregar la informacion del formulario al array de datos
    datosFormulario.push(formData);

    // ordenar los datos del formulario
    ordenarDatosFormulario(campoOrdenamiento, ordenAscendente);

    // vaciar los campos del formulario
    propuestaSalarialInput.value = '';
    nombreInput.value = '';
    emailInput.value = '';
    mensajeInput.value = '';
    });

    // ordenar datos del formulario
    function ordenarDatosFormulario(campo, ascendente) {
    datosFormulario.sort((a, b) => {
        let valorA = a[campo];
        let valorB = b[campo];

        // convertir valores a minusculas para ordenamiento de texto
        if (typeof valorA === 'string') {
        valorA = valorA.toLowerCase();
        }
        if (typeof valorB === 'string') {
        valorB = valorB.toLowerCase();
        }

        if (valorA < valorB) return ascendente ? -1 : 1;
        if (valorA > valorB) return ascendente ? 1 : -1;
        return 0;
    });

    // cenderizar datos ordenados  HTML
    renderizarDatosFormulario();
    }

    // renderizar datos formulario 
    function renderizarDatosFormulario() {
    const tablaFormulario = document.getElementById('informacion-formulario');
    tablaFormulario.innerHTML = '';

    datosFormulario.forEach(data => {
        const fila = document.createElement('tr');

        const propuestaCelda = document.createElement('td');
        propuestaCelda.textContent = `${data.propuestaSalarial} ($${data.propuestaSalarialUSD} USD / R$${data.propuestaSalarialBRL} BRL)`;
        propuestaCelda.classList.add('center'); 

        const nombreCelda = document.createElement('td');
        nombreCelda.textContent = data.nombre;
        nombreCelda.classList.add('center'); 

        const emailCelda = document.createElement('td');
        emailCelda.textContent = data.email;
        emailCelda.classList.add('center'); 

        const mensajeCelda = document.createElement('td');
        mensajeCelda.textContent = data.mensaje;
        mensajeCelda.classList.add('center'); 

        fila.appendChild(nombreCelda);
        fila.appendChild(emailCelda);
        fila.appendChild(propuestaCelda);
        fila.appendChild(mensajeCelda);
        tablaFormulario.appendChild(fila);
    });
    }

    // cambiar el campo de ordenamiento y dirección
    function cambiarOrden(campo) {
    if (campo === campoOrdenamiento) {
        ordenAscendente = !ordenAscendente;
    } else {
        campoOrdenamiento = campo;
        ordenAscendente = true;
    }

    // ordenar datos
    ordenarDatosFormulario(campoOrdenamiento, ordenAscendente);
    }

    // click para ordenar
    const encabezadosColumnas = document.getElementsByTagName('th');
    for (let i = 0; i < encabezadosColumnas.length; i++) {
    encabezadosColumnas[i].addEventListener('click', function() {
        const campo = this.textContent.toLowerCase().replace(' ', '-');
        cambiarOrden(campo);
    });
    }
});
