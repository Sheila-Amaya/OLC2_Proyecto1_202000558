

export class Entorno {

    /**
        * @param {Entorno} padre
     */
    constructor(padre = undefined) {
        this.valores = {};
        this.padre = padre;
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(nombre, valor) {
        if (this.valores.hasOwnProperty(nombre)) {
            throw new Error(`Variable '${nombre}' ya definida en este entorno.`);
        }
        this.valores[nombre] = valor;
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
            throw new Error(`Variable '${nombre}' no definida.`);
        }
    }

    /**
   * @param {string} nombre
   * @param {any} valor
   */
    assignVariable(nombre, valor) {
        if (this.valores.hasOwnProperty(nombre)) {
            this.valores[nombre] = valor;
            return;
        } else if (this.padre) {
            // Si no está en el entorno actual, intenta asignar en el entorno padre
            this.padre.assignVariable(nombre, valor);
        } else {
            throw new Error(`Variable '${nombre}' no definida.`);
        }
    }
}