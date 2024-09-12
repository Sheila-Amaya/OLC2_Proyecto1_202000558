import { obtenerTipo } from "../Util/utils.js";

export class Logicos {

    /**
     * AND (&&)
     * Devuelve t si ambos operandos son t, de lo contrario devuelve f
     */
    static and(izq, der) {
        const tipoIzq = obtenerTipo(izq);
        const tipoDer = obtenerTipo(der);

        // boolean && boolean
        if (tipoIzq === 'boolean' && tipoDer === 'boolean') {
            return { valor: izq && der, tipo: 'boolean' };
        }

        throw new Error(`Tipos incompatibles para la operacion 'AND': '${tipoIzq}' y '${tipoDer}'`);
    }

    /**
     * OR (||)
     * Devuelve true si alguno de los operandos es t, de lo contrario devuelve f
     */
    static or(izq, der) {
        const tipoIzq = obtenerTipo(izq);
        const tipoDer = obtenerTipo(der);

        // Validar que ambos sean booleanos
        if (tipoIzq === 'boolean' && tipoDer === 'boolean') {
            return { valor: izq || der, tipo: 'boolean' };
        }

        throw new Error(`Tipos incompatibles para la operacion 'OR': '${tipoIzq}' y '${tipoDer}'`);
    }

    /**
     * NOT (!)
     * valor opuesto del operando
     */
    static not(exp) {
        const tipoExp = obtenerTipo(exp);

        // Val. que el operando sea booleano
        if (tipoExp === 'boolean') {
            return { valor: !exp, tipo: 'boolean' };
        }

        throw new Error(`El operador 'NOT' solo es aplicable a expresiones booleanas, pero se recibió '${tipoExp}'`);
    }
}