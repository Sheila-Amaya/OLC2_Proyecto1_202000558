
/**

 * @typedef {import('./docs/Interprete/nodos.js').Expresion} Expresion


 * @typedef {import('./docs/Interprete/nodos.js').OperacionBinaria} OperacionBinaria


 * @typedef {import('./docs/Interprete/nodos.js').OperacionUnaria} OperacionUnaria


 * @typedef {import('./docs/Interprete/nodos.js').Agrupacion} Agrupacion


 * @typedef {import('./docs/Interprete/nodos.js').Numero} Numero


 * @typedef {import('./docs/Interprete/nodos.js').Booleano} Booleano


 * @typedef {import('./docs/Interprete/nodos.js').String} String


 * @typedef {import('./docs/Interprete/nodos.js').Char} Char


 * @typedef {import('./docs/Interprete/nodos.js').Null} Null


 * @typedef {import('./docs/Interprete/nodos.js').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('./docs/Interprete/nodos.js').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('./docs/Interprete/nodos.js').Print} Print


 * @typedef {import('./docs/Interprete/nodos.js').ExpresionStmt} ExpresionStmt


 * @typedef {import('./docs/Interprete/nodos.js').Asignacion} Asignacion


 * @typedef {import('./docs/Interprete/nodos.js').Bloque} Bloque


 * @typedef {import('./docs/Interprete/nodos.js').If} If


 * @typedef {import('./docs/Interprete/nodos.js').While} While


 * @typedef {import('./docs/Interprete/nodos.js').For} For


 * @typedef {import('./docs/Interprete/nodos.js').Break} Break


 * @typedef {import('./docs/Interprete/nodos.js').Continue} Continue


 * @typedef {import('./docs/Interprete/nodos.js').Return} Return


 * @typedef {import('./docs/Interprete/nodos.js').Llamada} Llamada

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Expresion} node
     * @returns {any}
     */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }
    

    /**
     * @param {OperacionBinaria} node
     * @returns {any}
     */
    visitOperacionBinaria(node) {
        throw new Error('Metodo visitOperacionBinaria no implementado');
    }
    

    /**
     * @param {OperacionUnaria} node
     * @returns {any}
     */
    visitOperacionUnaria(node) {
        throw new Error('Metodo visitOperacionUnaria no implementado');
    }
    

    /**
     * @param {Agrupacion} node
     * @returns {any}
     */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
    }
    

    /**
     * @param {Numero} node
     * @returns {any}
     */
    visitNumero(node) {
        throw new Error('Metodo visitNumero no implementado');
    }
    

    /**
     * @param {Booleano} node
     * @returns {any}
     */
    visitBooleano(node) {
        throw new Error('Metodo visitBooleano no implementado');
    }
    

    /**
     * @param {String} node
     * @returns {any}
     */
    visitString(node) {
        throw new Error('Metodo visitString no implementado');
    }
    

    /**
     * @param {Char} node
     * @returns {any}
     */
    visitChar(node) {
        throw new Error('Metodo visitChar no implementado');
    }
    

    /**
     * @param {Null} node
     * @returns {any}
     */
    visitNull(node) {
        throw new Error('Metodo visitNull no implementado');
    }
    

    /**
     * @param {DeclaracionVariable} node
     * @returns {any}
     */
    visitDeclaracionVariable(node) {
        throw new Error('Metodo visitDeclaracionVariable no implementado');
    }
    

    /**
     * @param {ReferenciaVariable} node
     * @returns {any}
     */
    visitReferenciaVariable(node) {
        throw new Error('Metodo visitReferenciaVariable no implementado');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Metodo visitPrint no implementado');
    }
    

    /**
     * @param {ExpresionStmt} node
     * @returns {any}
     */
    visitExpresionStmt(node) {
        throw new Error('Metodo visitExpresionStmt no implementado');
    }
    

    /**
     * @param {Asignacion} node
     * @returns {any}
     */
    visitAsignacion(node) {
        throw new Error('Metodo visitAsignacion no implementado');
    }
    

    /**
     * @param {Bloque} node
     * @returns {any}
     */
    visitBloque(node) {
        throw new Error('Metodo visitBloque no implementado');
    }
    

    /**
     * @param {If} node
     * @returns {any}
     */
    visitIf(node) {
        throw new Error('Metodo visitIf no implementado');
    }
    

    /**
     * @param {While} node
     * @returns {any}
     */
    visitWhile(node) {
        throw new Error('Metodo visitWhile no implementado');
    }
    

    /**
     * @param {For} node
     * @returns {any}
     */
    visitFor(node) {
        throw new Error('Metodo visitFor no implementado');
    }
    

    /**
     * @param {Break} node
     * @returns {any}
     */
    visitBreak(node) {
        throw new Error('Metodo visitBreak no implementado');
    }
    

    /**
     * @param {Continue} node
     * @returns {any}
     */
    visitContinue(node) {
        throw new Error('Metodo visitContinue no implementado');
    }
    

    /**
     * @param {Return} node
     * @returns {any}
     */
    visitReturn(node) {
        throw new Error('Metodo visitReturn no implementado');
    }
    

    /**
     * @param {Llamada} node
     * @returns {any}
     */
    visitLlamada(node) {
        throw new Error('Metodo visitLlamada no implementado');
    }
    
}
