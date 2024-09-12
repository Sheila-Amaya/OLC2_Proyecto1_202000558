import { obtenerTipo } from "../Util/utils.js";

export class Relacionales {

    /**
     * Mayor que (>)
     */
    static mayorQue(izq, der) {
        const tipoIzq = obtenerTipo(izq);
        const tipoDer = obtenerTipo(der);

        // int > int o float > float o int > float o float > int
        if ((tipoIzq === 'int' || tipoIzq === 'float') && (tipoDer === 'int' || tipoDer === 'float')) {
            return { valor: izq > der, tipo: 'boolean' };
        }

        // char > char, usando comp ASCII
        if (tipoIzq === 'char' && tipoDer === 'char') {
            return { valor: izq > der, tipo: 'boolean' };
        }

        throw new Error(`Tipos incompatibles para la comparacion 'mayor que': '${tipoIzq}' y '${tipoDer}'`);
    }

    /**
     * Mayor o igual que (>=)
     */
    static mayorOIgual(izq, der) {
        const tipoIzq = obtenerTipo(izq);
        const tipoDer = obtenerTipo(der);

        // int >= int o float >= float o int >= float o float >= int
        if ((tipoIzq === 'int' || tipoIzq === 'float') && (tipoDer === 'int' || tipoDer === 'float')) {
            return { valor: izq >= der, tipo: 'boolean' };
        }

        // char >= char, usando comparación ASCII
        if (tipoIzq === 'char' && tipoDer === 'char') {
            return { valor: izq >= der, tipo: 'boolean' };
        }

        throw new Error(`Tipos incompatibles para la comparacion 'mayor o igual que': '${tipoIzq}' y '${tipoDer}'`);
    }

    /**
     * Menor que (<)
     */
    static menorQue(izq, der) {
        const tipoIzq = obtenerTipo(izq);
        const tipoDer = obtenerTipo(der);

        // int < int o float < float o int < float o float < int
        if ((tipoIzq === 'int' || tipoIzq === 'float') && (tipoDer === 'int' || tipoDer === 'float')) {
            return { valor: izq < der, tipo: 'boolean' };
        }

        // char < char, usando comparación ASCII
        if (tipoIzq === 'char' && tipoDer === 'char') {
            return { valor: izq < der, tipo: 'boolean' };
        }

        throw new Error(`Tipos incompatibles para la comparacion 'menor que': '${tipoIzq}' y '${tipoDer}'`);
    }

    /**
     * Menor o igual que (<=)
     */
    static menorOIgual(izq, der) {
        const tipoIzq = obtenerTipo(izq);
        const tipoDer = obtenerTipo(der);

        // int <= int o float <= float o int <= float o float <= int
        if ((tipoIzq === 'int' || tipoIzq === 'float') && (tipoDer === 'int' || tipoDer === 'float')) {
            return { valor: izq <= der, tipo: 'boolean' };
        }

        // char <= char, usando comparacion ASCII
        if (tipoIzq === 'char' && tipoDer === 'char') {
            return { valor: izq <= der, tipo: 'boolean' };
        }

        throw new Error(`Tipos incompatibles para la comparacion 'menor o igual que': '${tipoIzq}' y '${tipoDer}'`);
    }
}