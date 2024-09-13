import { obtenerTipo } from "../Util/utils.js";

export class Entorno {

    /**
    * @param {Entorno} padre
    */
    constructor(padre = undefined) {
        this.valores = {};
        this.tipos = {};
        this.padre = padre;
    }

    /**
     * 
     * @param {string} nombre
     * @param {any} valor
     * @param {string} tipo
     * @throws {Error} 
     */
    setVariable(nombre, valor, tipo) {
        if (this.existeVariableLocal(nombre)) {
            throw new Error(`Variable '${nombre}' ya definida en este entorno.`);
        }
        this.valores[nombre] = valor;
        this.tipos[nombre] = tipo;
    }

    /**
     * valor de una variable, buscando en el entorno actual y sus padres
     * @param {string} nombre
     * @returns {any} Valor de la variable
     * @throws {Error} var. no definida
     */
    getVariable(nombre) {
        if (this.valores.hasOwnProperty(nombre)) {
            return this.valores[nombre];
        } else if (this.padre) {
            return this.padre.getVariable(nombre);
        } else {
            throw new Error(`Variable '${nombre}' no definida.`);
        }
    }

    /**
     * tipo de una variable, buscando en el entorno actual y sus padres
     * @param {string} nombre
     * @returns {string} Tipo de la variable
     * @throws {Error} var. no definida
     */
    getTipoVariable(nombre) {
        if (this.tipos.hasOwnProperty(nombre)) {
            return this.tipos[nombre];
        } else if (this.padre) {
            return this.padre.getTipoVariable(nombre);
        }
        throw new Error(`La variable '${nombre}' no está definida.`);
    }

    /**
     * Asigna un valor a una variable existente.
     * @param {string} nombre
     * @param {any} valor
     * @throws {Error} var. no definida
     */
    assignVariable(nombre, valor) {
        if (this.valores.hasOwnProperty(nombre)) {
            const tipoVariable = this.getTipoVariable(nombre);
            const tipoValorAsignado = obtenerTipo(valor);
            
            if (tipoVariable === 'null') {
                // Permite asignar cualquier valor si la variable es null
                this.valores[nombre] = valor;
                this.tipos[nombre] = tipoValorAsignado;
                return;
            }

            if (tipoVariable !== tipoValorAsignado) {
                if (tipoVariable === 'float' && tipoValorAsignado === 'int') {
                    this.valores[nombre] = parseFloat(valor);
                } else {
                    throw new Error(`Tipos incompatibles. No se puede asignar un valor de tipo '${tipoValorAsignado}' a una variable de tipo '${tipoVariable}'.`);
                }
            } else {
                this.valores[nombre] = valor;
            }
        } else if (this.padre) {
            this.padre.assignVariable(nombre, valor);
        } else {
            throw new Error(`Variable '${nombre}' no definida.`);
        }
    }

    /**
     * Verifica si la variable existe en el entorno actual o en los padres
     * @param {string} nombre
     * @returns {boolean} true si la variable existe
     */
    existeVariable(nombre) {
        if (this.valores.hasOwnProperty(nombre)) {
            return true;
        }
        if (this.padre) {
            return this.padre.existeVariable(nombre);
        }
        return false;
    }

    /**
    * Verifica si la variable existe en el entorno actual
    * @param {string} nombre
    * @returns {boolean} 
    */
    existeVariableLocal(nombre) {
        return this.valores.hasOwnProperty(nombre);
    }
    
    /**
     * Obtiene el valor por defecto para un tipo primitivo
     * @param {string} tipo
     * @returns {any} 
     */
    obtenerValorPorDefecto(tipo) {
        switch (tipo) {
            case 'int':
                return 0;
            case 'float':
                return 0.0;
            case 'string':
                return "";
            case 'boolean':
                return true;
            case 'char':
                return '\0';
            default:
                return null;
        }
    }
}
