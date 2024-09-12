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
        if (valor === null) {
            valor = this.obtenerValorPorDefecto(tipo); 
        }
        this.valores[nombre] = valor;
        this.tipos[nombre] = tipo;
        //console.log(`Variable '${nombre}' declarada con valor ${valor} y tipo ${tipo}`);
    }
    

    /**
     * valor de una variable, buscando en el entorno actual y sus padres
     * @param {string} nombre
     * @returns {any} Valor de la variable.
     * @throws {Error} Si la variable no está definida o no ha sido inicializada.
     */
    getVariable(nombre) {
        if (this.valores.hasOwnProperty(nombre)) {
            if (this.valores[nombre] === undefined) {
                throw new Error(`La variable '${nombre}' ha sido declarada pero no ha sido inicializada.`);
            }
            return this.valores[nombre];
        } else if (this.padre) {
            return this.padre.getVariable(nombre);
        } else {
            throw new Error(`Variable '${nombre}' no definida.`);
        }
    }

    /**
     * tipo de una variable, buscando en el entorno actual y sus padres.
     * @param {string} nombre
     * @returns {string} Tipo de la variable.
     * @throws {Error} Si la variable no está definida.
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
     * @throws {Error} Si la variable no está definida.
     */
    assignVariable(nombre, valor) {
        if (this.valores.hasOwnProperty(nombre)) {
            if (valor === null) {
                throw new Error(`Error: No se puede asignar 'null' a la variable '${nombre}'.`);
            }
            // Actualiza la variable en el entorno actual
            this.valores[nombre] = valor;
            return;
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
