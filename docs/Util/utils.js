
/**
 * Función para obtener el tipo de un valor dado.
 * @param {any} valor - El valor del cual se debe determinar el tipo.
 * @returns {string} - El tipo del valor como 'int', 'float', 'string', 'boolean', 'char', o 'null'.
 */

export function obtenerTipo(valor) {
    if (typeof valor === 'number') {
        return (valor % 1 === 0) ? 'int' : 'float'; 
    } else if (typeof valor === 'boolean') {
        return 'boolean';
    } else if (typeof valor === 'string') {
        return valor.length === 1 ? 'char' : 'string';
    } else if (valor === null) {
        return 'null';
    } else {
        throw new Error('Tipo de dato no soportado');
    }
}


