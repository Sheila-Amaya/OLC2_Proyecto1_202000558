export class Aritmeticas {

    /**
     * 
     * @param {any} izq - Operando izq
     * @param {any} der - Operando der
     * @returns {object} - Objeto con las propiedades `valor` y `tipo`.
     * @throws {Error} - Si se detecta una operación con null o tipos incompatibles.
     */

    // ===== Suma =====
    static suma(izq, der) {
        // int + int = int
        if (typeof izq === 'number' && Number.isInteger(izq) && typeof der === 'number' && Number.isInteger(der)) {
            // int + int = int
            return { valor: izq + der, tipo: 'int' };
        }

        // int + float = float
        if ((typeof izq === 'number' && Number.isInteger(izq) && typeof der === 'number' && !Number.isInteger(der)) ||
            (typeof izq === 'number' && !Number.isInteger(izq) && typeof der === 'number' && Number.isInteger(der))) {
            // int + float = float o float + int = float
            return { valor: izq + der, tipo: 'float' };
        }

        // float + float = float
        if (typeof izq === 'number' && !Number.isInteger(izq) && typeof der === 'number' && !Number.isInteger(der)) {
            // float + float = float
            return { valor: izq + der, tipo: 'float' };
        }

        // string + string = string
        if (typeof izq === 'string' && typeof der === 'string') {
            // string + string = string
            return { valor: izq + der, tipo: 'string' };
        }

        throw new Error(`Tipos incompatibles para la operación de suma: ${typeof izq} + ${typeof der}`);
    }

    // ===== Resta =====
    static resta(izq, der) {
        // int - int = int
        if (typeof izq === 'number' && Number.isInteger(izq) && typeof der === 'number' && Number.isInteger(der)) {
            // int - int = int
            return { valor: izq - der, tipo: 'int' };
        }

        // int - float = float
        if ((typeof izq === 'number' && Number.isInteger(izq) && typeof der === 'number' && !Number.isInteger(der)) ||
            (typeof izq === 'number' && !Number.isInteger(izq) && typeof der === 'number' && Number.isInteger(der))) {
            // int - float = float o float - int = float
            return { valor: izq - der, tipo: 'float' };
        }

        // float - float = float
        if (typeof izq === 'number' && !Number.isInteger(izq) && typeof der === 'number' && !Number.isInteger(der)) {
            // float - float = float
            return { valor: izq - der, tipo: 'float' };
        }

        throw new Error(`Tipos incompatibles para la operación de resta: ${typeof izq} - ${typeof der}`);
    }

    // ===== Multiplicación =====
    static multiplicacion(izq, der) {
        // int * int = int
        if (typeof izq === 'number' && Number.isInteger(izq) && typeof der === 'number' && Number.isInteger(der)) {
            // int * int = int
            return { valor: izq * der, tipo: 'int' };
        }

        // int * float = float o float * int = float
        if ((typeof izq === 'number' && Number.isInteger(izq) && typeof der === 'number' && !Number.isInteger(der)) ||
            (typeof izq === 'number' && !Number.isInteger(izq) && typeof der === 'number' && Number.isInteger(der))) {
            // int * float = float o float * int = float
            return { valor: izq * der, tipo: 'float' };
        }

        // float * float = float
        if (typeof izq === 'number' && !Number.isInteger(izq) && typeof der === 'number' && !Number.isInteger(der)) {
            // float * float = float
            return { valor: izq * der, tipo: 'float' };
        }

        throw new Error(`Tipos incompatibles para la operación de multiplicación: ${typeof izq} * ${typeof der}`);
    }

    // ===== División =====
    static division(izq, der) {
        // int / int = int (con truncamiento)
        if (typeof izq === 'number' && Number.isInteger(izq) && typeof der === 'number' && Number.isInteger(der)) {
            // int / int = int (truncamiento)
            return { valor: Math.trunc(izq / der), tipo: 'int' };
        }

        // int / float = float o float / int = float
        if ((typeof izq === 'number' && Number.isInteger(izq) && typeof der === 'number' && !Number.isInteger(der)) ||
            (typeof izq === 'number' && !Number.isInteger(izq) && typeof der === 'number' && Number.isInteger(der))) {
            // int / float = float o float / int = float
            return { valor: izq / der, tipo: 'float' };
        }

        // float / float = float
        if (typeof izq === 'number' && !Number.isInteger(izq) && typeof der === 'number' && !Number.isInteger(der)) {
            // float / float = float
            return { valor: izq / der, tipo: 'float' };
        }

        throw new Error(`Tipos incompatibles para la operación de división: ${typeof izq} / ${typeof der}`);
    }

    // ===== Módulo =====
    static modulo(izq, der) {

        // Verif. ambos operandos son de tipo int
        if (!Number.isInteger(izq) || !Number.isInteger(der)) {
            throw new Error(`Tipos incompatibles para la operación de módulo: ${typeof izq} % ${typeof der}`);
        }

        // Verificar division por cero
        if (der === 0) {
            console.warn('Advertencia: División por cero detectada en el módulo, el resultado será null.');
            return { valor: null, tipo: 'null' };
        }

        // int % int = int
        return { valor: izq % der, tipo: 'int' };
    }
}
