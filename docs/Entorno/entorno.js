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
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(nombre, valor, tipo) {
        if (this.valores.hasOwnProperty(nombre)) {
            throw new Error(`variable '${nombre}' ya definida en este entorno.`);
        }
        this.valores[nombre] = valor;
        this.tipos[nombre] = tipo;
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        if (this.valores.hasOwnProperty(nombre)) {
            return this.valores[nombre];
        } else if (this.padre) {
            return this.padre.getVariable(nombre);
        } else {
            throw new Error(`variable '${nombre}' no definida.`);
        }
    }


    /**
   * @param {string} nombre
   * @returns {string} Tipo de la variable
   * @throws {Error} Si la variable no está definida
   * */
    getTipoVariable(nombre) {
        if (this.tipos.hasOwnProperty(nombre)) {
            return this.tipos[nombre];
        }
        if (this.padre) {
            return this.padre.getTipoVariable(nombre);
        }
        throw new Error(`La variable '${nombre}' no esta definida.`);
    }

    /**
   * @param {string} nombre
   * @param {any} valor
   */
    assignVariable(nombre, valor) {
        if (this.valores.hasOwnProperty(nombre)) {
            // Actualizar el tipo si el valor actual es null y se asigna un nuevo valor
            if (this.tipos[nombre] === 'null') {
                this.tipos[nombre] = obtenerTipo(valor); // Actualiza el tipo al del nuevo valor
            }
            this.valores[nombre] = valor;
            return;
        } else if (this.padre) {
            this.padre.assignVariable(nombre, valor);
        } else {
            throw new Error(`variable '${nombre}' no definida.`);
        }
    }

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
    * Verifica si la variable existe en el entorno actual, no en los padres
    * @param {string} nombre
    * @returns {boolean} true si la variable existe en el entorno actual
    */
    existeVariableLocal(nombre) {
        return this.valores.hasOwnProperty(nombre);
    }

}
