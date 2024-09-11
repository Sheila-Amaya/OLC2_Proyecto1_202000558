
/**
 * Función para obtener el tipo de un valor dado.
 * @param {any} valor - El valor del cual se debe determinar el tipo.
 * @returns {string} - El tipo del valor como 'int', 'float', 'string', 'boolean', 'char', o 'null'.
 */

export function obtenerTipo(valor) {
    if (typeof valor === 'number') {
        return Number.isInteger(valor) && valor % 1 !== 0 ? 'float' : 'int';
    } else if (typeof valor === 'boolean') {
        return 'bool';
    } else if (typeof valor === 'string') {
        return valor.length === 1 ? 'char' : 'string';
    } else if (valor === null) {
        return 'null';
    } else {
        throw new Error('Tipo de dato no soportado');
    }
}
