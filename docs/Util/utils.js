
/**
 * Función para obtener el tipo de un valor dado.
 * @param {any} valor - El valor del cual se debe determinar el tipo.
 * @returns {string} - El tipo del valor como 'int', 'float', 'string', 'boolean', 'char', o 'null'.
 */

export function obtenerTipo(valor) {
    if (typeof valor === 'number') {
        return Number.isInteger(valor) ? 'int' : 'float';
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

/**
 * obtiene el valor por defecto segun el tipo de dato
 * @param {string} tipo
 * @returns {any} Val. defecto para el tipo especificado
 */
export function valorPorDefecto(tipo) {
    switch (tipo) {
        case 'int': return 0;
        case 'float': return 0.0;
        case 'string': return "";
        case 'bool': return false;
        case 'char': return '\0';   // char nulo
        default: return null;       // Para otros tipos o null
    }
}