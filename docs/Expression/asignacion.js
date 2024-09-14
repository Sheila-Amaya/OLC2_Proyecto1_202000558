import { Aritmeticas } from "../Expression/aritmeticas.js";
import { obtenerTipo } from "../Util/utils.js";
import { Entorno } from "../Entorno/entorno.js";

export class Asignacion {
    static entorno = new Entorno(); 

    static setEntorno(nuevoEntorno) {
        this.entorno = nuevoEntorno;
    }

    /**
     * Maneja la asignacion '='.
     */
    static AsignacionEstandar(nombreVariable, valorAsignado) {
        const tipoVariable = this.entorno.getTipoVariable(nombreVariable);
        const tipoValorAsignado = obtenerTipo(valorAsignado);

        // Permitir asignacion de cualquier tipo si la variable es null
        if (tipoVariable === 'null') {
            this.entorno.assignVariable(nombreVariable, valorAsignado);
            this.entorno.tipos[nombreVariable] = tipoValorAsignado; // Actualiza el tipo
            console.log(`Variable '${nombreVariable}' asignada con valor ${valorAsignado} y tipo ${tipoValorAsignado}`);
            return;
        }

        // Validacion de tipos
        if (tipoVariable !== tipoValorAsignado) {
            if (tipoVariable === 'float' && tipoValorAsignado === 'int') {
                this.entorno.assignVariable(nombreVariable, parseFloat(valorAsignado));
                console.log(`Variable '${nombreVariable}' asignada con valor convertido ${parseFloat(valorAsignado)} de tipo 'float'`);
            } else {
                throw new Error(`Tipo incompatible. Se esperaba '${tipoVariable}', pero se recibio '${tipoValorAsignado}'.`);
            }
        } else {
            this.entorno.assignVariable(nombreVariable, valorAsignado);
            console.log(`Variable '${nombreVariable}' asignada con valor ${valorAsignado} y tipo ${tipoVariable}`);
        }
    }

    /**
     * Maneja la asignacion '+='.
     */
    static AsignacionSuma(nombreVariable, valorAsignado) {
        const valorActual = this.entorno.getVariable(nombreVariable);
        const tipoVariable = this.entorno.getTipoVariable(nombreVariable);
        const tipoValorAsignado = obtenerTipo(valorAsignado);
        
        console.log(`Tipos antes de la suma: variable '${nombreVariable}' es de tipo '${tipoVariable}', valor asignado es de tipo '${tipoValorAsignado}'`);

        // Validar si valorAsignado es null
        if (valorAsignado === null) {
            throw new Error(`Error: No se puede sumar 'null' a la variable '${nombreVariable}'.`);
        }

        // Realizar la conversión implícita de int a float si es necesario
        if (tipoVariable === 'float' && tipoValorAsignado === 'int') {
            valorAsignado = parseFloat(valorAsignado);
        }

        if (tipoVariable === 'int' && tipoValorAsignado === 'float') {
            throw new Error(`No se puede asignar un valor de tipo 'float' a un 'int'.`);
        }

        if (tipoVariable === 'string' && tipoValorAsignado !== 'string') {
            throw new Error(`No se puede sumar un '${tipoValorAsignado}' a un 'string'.`);
        }

        if ((tipoVariable === 'int' || tipoVariable === 'float') && (tipoValorAsignado !== 'int' && tipoValorAsignado !== 'float')) {
            throw new Error(`Suma no compatible entre '${tipoVariable}' y '${tipoValorAsignado}'.`);
        }

        const resultado = Aritmeticas.suma(valorActual, valorAsignado);
        this.entorno.assignVariable(nombreVariable, resultado.valor);
        console.log(`Variable '${nombreVariable}' actualizada con +=, nuevo valor ${resultado.valor}`);
    }

    /**
     * Maneja la asignacion  '-='.
     */
    static AsignacionResta(nombreVariable, valorAsignado) {
        const valorActual = this.entorno.getVariable(nombreVariable);
        const tipoVariable = this.entorno.getTipoVariable(nombreVariable);
        const tipoValorAsignado = obtenerTipo(valorAsignado);
        
        console.log(`Tipos antes de la resta: variable '${nombreVariable}' es de tipo '${tipoVariable}', valor asignado es de tipo '${tipoValorAsignado}'`);
        
        // Validar si valorAsignado es null
        if (valorAsignado === null) {
            throw new Error(`Error: No se puede restar 'null' a la variable '${nombreVariable}'.`);
        }

        // Realizar la conversión implícita de int a float si es necesario
        if (tipoVariable === 'float' && tipoValorAsignado === 'int') {
            valorAsignado = parseFloat(valorAsignado);
        }

        // Verificar si se intenta asignar un float a un int
        if (tipoVariable === 'int' && tipoValorAsignado === 'float') {
            throw new Error(`Error: No se puede asignar un valor de tipo 'float' a un 'int'.`);
        }

        // Verificar otros tipos incompatibles
        if ((tipoVariable === 'int' || tipoVariable === 'float') && (tipoValorAsignado !== 'int' && tipoValorAsignado !== 'float')) {
            throw new Error(`Resta no compatible entre '${tipoVariable}' y '${tipoValorAsignado}'.`);
        }

        // Realizar la operación.
        const resultado = Aritmeticas.resta(valorActual, valorAsignado);
        
        // Asigna validando tipos
        if (tipoVariable === 'int' && obtenerTipo(resultado.valor) === 'float') {
            throw new Error(`Error: No se puede asignar un valor de tipo 'float' a un 'int'.`);
        }
        
        this.entorno.assignVariable(nombreVariable, resultado.valor);
        console.log(`Variable '${nombreVariable}' actualizada con -=, nuevo valor ${resultado.valor}`);
    }

}
