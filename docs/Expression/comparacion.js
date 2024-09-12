import { obtenerTipo } from "../Util/utils.js";

export class Comparaciones {

    /**
     *  (==)
     * @param {any} izq - Operando izquierdo
     * @param {any} der - Operando derecho
     * @returns {object} - tipo y valor de la comp.
     * @throws {Error} - no compatibles para la comparacion
     */

    static igualdad(izq, der) {
        const tipoIzq = obtenerTipo(izq);
        const tipoDer = obtenerTipo(der);

        // Comp. (int y float)
        // int == float o float == int
        if ((tipoIzq === 'int' && tipoDer === 'float') || (tipoIzq === 'float' && tipoDer === 'int')) {
            return { valor: izq == der, tipo: 'boolean' };
        }

        // tipos iguales
        if (tipoIzq === tipoDer) {
            // int == int
            if (tipoIzq === 'int') {
                return { valor: izq === der, tipo: 'boolean' };
            }

            // float == float
            if (tipoIzq === 'float') {
                return { valor: izq === der, tipo: 'boolean' };
            }

            // boolean == boolean
            if (tipoIzq === 'boolean') {
                return { valor: izq === der, tipo: 'boolean' };
            }

            // string == string
            if (tipoIzq === 'string') {
                return { valor: izq === der, tipo: 'boolean' };
            }

            // char == char
            if (tipoIzq === 'char') {
                return { valor: izq === der, tipo: 'boolean' };
            }
        }

        throw new Error(`Tipos incompatibles para la comparacion de igualdad: '${tipoIzq}' y '${tipoDer}'`);
    }

    // !=
    static desigualdad(izq, der) {
        const tipoIzq = obtenerTipo(izq);
        const tipoDer = obtenerTipo(der);

        // Comp. entre (int y float)
        // int != float o float != int
        if ((tipoIzq === 'int' && tipoDer === 'float') || (tipoIzq === 'float' && tipoDer === 'int')) {
            return { valor: izq != der, tipo: 'boolean' };
        }

        // tipos iguales
        if (tipoIzq === tipoDer) {
            // int != int
            if (tipoIzq === 'int') {
                return { valor: izq !== der, tipo: 'boolean' };
            }

            // float != float
            if (tipoIzq === 'float') {
                return { valor: izq !== der, tipo: 'boolean' };
            }

            // boolean != boolean
            if (tipoIzq === 'boolean') {
                return { valor: izq !== der, tipo: 'boolean' };
            }

            // string != string
            if (tipoIzq === 'string') {
                return { valor: izq !== der, tipo: 'boolean' };
            }

            // char != char
            if (tipoIzq === 'char') {
                return { valor: izq !== der, tipo: 'boolean' };
            }
        }

        throw new Error(`Tipos incompatibles para la comparacion de desigualdad: '${tipoIzq}' y '${tipoDer}'`);
    }
}