
/**
 * Obtiene el tipo de un valor.
 * @param {any} valor - El valor a evaluar.
 * @returns {string} - El tipo del valor (int, float, string, boolean, etc.).
 */

export function obtenerTipo(valor) {
    if (typeof valor === 'number') {
        return Number.isInteger(valor) ? 'int' : 'float';
    } else if (typeof valor === 'string') {
        return 'string';
    } else if (typeof valor === 'boolean') {
        return 'boolean';
    } else if (valor === null) {
        return 'null';
    }
    return 'undefined';
}