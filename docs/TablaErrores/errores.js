document.addEventListener('DOMContentLoaded', () => {
    // Lee los datos de la tabla de errores del localStorage
    const errorTable = JSON.parse(localStorage.getItem('errorTable')) || [];

    const tableBody = document.getElementById('errorTableBody');

    // Agregar las filas a la tabla
    errorTable.forEach(error => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${error.numero}</td>
            <td>${error.descripcion}</td>
            <td>${error.linea}</td>
            <td>${error.columna}</td>
            <td>${error.tipo}</td>
        `;
        tableBody.appendChild(row);
    });
});
