document.addEventListener('DOMContentLoaded', () => {
    // lee los datos de la tabla de simbolos del localStorage
    const symbolTable = JSON.parse(localStorage.getItem('symbolTable')) || [];

    const tableBody = document.getElementById('symbolTableBody');

    // Agregar las filas a la tabla
    symbolTable.forEach(symbol => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${symbol.id}</td>
            <td>${symbol.tipoSimbolo}</td>
            <td>${symbol.tipoDato}</td>
            <td>${symbol.ambito}</td>
            <td>${symbol.linea}</td>
            <td>${symbol.columna}</td>
        `;
        tableBody.appendChild(row);
    });
});
