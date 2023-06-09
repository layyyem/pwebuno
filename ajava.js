const form = document.getElementById('contact-form');
const tableBody = document.getElementById('form-data-body');
const propuestaError = document.getElementById('propuesta-error');

function validarFormulario() {
    const propuestaSalarialInput = document.getElementById('propuesta-salarial');
    const propuestaSalarial = parseInt(propuestaSalarialInput.value);

    if (propuestaSalarial < 50000) {
        propuestaError.textContent = 'La propuesta salarial debe ser mayor o igual a 50000 pesos.';
        return false;
    }

    propuestaError.textContent = ''; 


    form.reset();


    const nombre = form.nombre.value;
    const email = form.email.value;
    const propuestaSalarialDolares = convertirAPesosDolares(propuestaSalarial);
    const propuestaSalarialEuros = convertirAPesosEuros(propuestaSalarial);


    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${nombre}</td>
        <td>${email}</td>
        <td>${propuestaSalarial}</td>
        <td>${propuestaSalarialDolares}</td>
        <td>${propuestaSalarialEuros}</td>
    `;


    tableBody.appendChild(newRow);

    return false; 
}


function convertirAPesosDolares(pesos) {
    const tipoCambio = 0.011; 
    const dolares = pesos * tipoCambio;
    return dolares.toFixed(2);
}


function convertirAPesosEuros(pesos) {
    const tipoCambio = 0.0095; // 
    const euros = pesos * tipoCambio;
    return euros.toFixed(2);
}


function ordenarTabla(campo) {
    const rows = Array.from(tableBody.rows);


    let orden = 1; 
    if (tableBody.dataset.sortField === campo && tableBody.dataset.sortOrder === 'asc') {
        orden = -1; 
    }


    rows.sort((a, b) => {
        const valueA = obtenerValorCampo(a, campo);
        const valueB = obtenerValorCampo(b, campo);
        return valueA.localeCompare(valueB) * orden;
    });


    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }


    for (const row of rows) {
        tableBody.appendChild(row);
    }


    tableBody.dataset.sortField = campo;
    tableBody.dataset.sortOrder = orden === 1 ? 'asc' : 'desc';
}


function obtenerValorCampo(row, campo) {
    const columnIndex = Array.from(row.cells).findIndex(cell => cell.textContent.trim() === campo);
    return row.cells[columnIndex].textContent.trim();
}
