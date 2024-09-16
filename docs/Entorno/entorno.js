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
            throw new Error(`variable '${nombre}' ya definida en este entorno.`);
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
                return (0.0).toFixed(1);
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

    /**
     * para arrays
     * @param {string} tipo
     * @returns {any}
     */

    getDefaultValue(tipo) {
        switch(tipo) {
            case 'int':    
                return 0;
            case 'float': 
                return (0.0).toFixed(1);
            case 'string': 
                return '';
            case 'boolean':     
                return false;
            case 'char':    
                return '\0';
            default:    
                return null; 
        }
    }

    /**
     * Inicializa un array en el entorno
     * @param {string} nombre
     * @param {Array} valores
     * @param {string} tipo
     */
    setArray(nombre, valores, tipo) {
        if (this.existeVariableLocal(nombre)) {
            throw new Error(`array '${nombre}' ya definido en este entorno.`);
        }
        // Verifica que todos los elementos en 'valores' coincidan con el tipo del array
        if (!valores.every(valor => obtenerTipo(valor) === tipo)) {
            throw new Error(`los valores del array '${nombre}' no coinciden con el tipo '${tipo}'.`);
        }
        this.valores[nombre] = valores;
        this.tipos[nombre] = `array of ${tipo}`;
    }

    /**
     * Inicializa un array reservando tamaño
     * @param {string} nombre
     * @param {number} tamano
     * @param {string} tipo
     */
    setArrayConTamano(nombre, tamano, tipo) {
        if (this.existeVariableLocal(nombre)) {
            throw new Error(`array '${nombre}' ya definido en este entorno.`);
        }
        if (tamano < 0) {
            throw new Error(`el tamaño del array '${nombre}' no puede ser negativo.`);
        }
        const valorPorDefecto = this.obtenerValorPorDefecto(tipo);
        const valores = Array(tamano).fill(valorPorDefecto);
        this.valores[nombre] = valores;
        this.tipos[nombre] = `array of ${tipo}`;
    }
    
    /**
     * Obtiene un array desde el entorno, buscando en el entorno actual y sus padres.
     * @param {string} nombre
     * @returns {Array} Array encontrado
     * @throws {Error} Si el array no está definido
     */
    getArray(nombre) {
        if (this.valores.hasOwnProperty(nombre) && Array.isArray(this.valores[nombre])) {
            return this.valores[nombre];
        } else if (this.padre) {
            return this.padre.getArray(nombre);
        } else {
            throw new Error(`array '${nombre}' no definido.`);
        }
    }

    setArrayComoCopia(nombre, idExistente) {
        if (!this.existeVariable(idExistente)) {
            throw new Error(`el array '${idExistente}' no está definido.`);
        }
        const arrayOriginal = this.getVariable(idExistente);
        const tipoOriginal = this.getTipoVariable(idExistente);
        
        if (!Array.isArray(arrayOriginal)) {
            throw new Error(`'${idExistente}' no es un array y no se puede copiar.`);
        }
        
        // Realizar una copia profunda del array
        this.valores[nombre] = JSON.parse(JSON.stringify(arrayOriginal));
        this.tipos[nombre] = tipoOriginal;  // Mantener el tipo original del array
    }
    

}