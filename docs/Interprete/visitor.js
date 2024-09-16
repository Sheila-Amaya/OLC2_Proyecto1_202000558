
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


 * @typedef {import('./docs/Interprete/nodos.js').DeclaracionArray} DeclaracionArray


 * @typedef {import('./docs/Interprete/nodos.js').Funcion} Funcion


 * @typedef {import('./docs/Interprete/nodos.js').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('./docs/Interprete/nodos.js').Print} Print


 * @typedef {import('./docs/Interprete/nodos.js').ExpresionStmt} ExpresionStmt


 * @typedef {import('./docs/Interprete/nodos.js').ArrayAssign} ArrayAssign


 * @typedef {import('./docs/Interprete/nodos.js').ArrayAccess} ArrayAccess


 * @typedef {import('./docs/Interprete/nodos.js').Length} Length


 * @typedef {import('./docs/Interprete/nodos.js').Asignacion} Asignacion


 * @typedef {import('./docs/Interprete/nodos.js').Ternario} Ternario


 * @typedef {import('./docs/Interprete/nodos.js').ParseInt} ParseInt


 * @typedef {import('./docs/Interprete/nodos.js').ParseFloat} ParseFloat


 * @typedef {import('./docs/Interprete/nodos.js').ToString} ToString


 * @typedef {import('./docs/Interprete/nodos.js').ToLowerCase} ToLowerCase


 * @typedef {import('./docs/Interprete/nodos.js').ToUpperCase} ToUpperCase


 * @typedef {import('./docs/Interprete/nodos.js').TypeOf} TypeOf


 * @typedef {import('./docs/Interprete/nodos.js').IndexOf} IndexOf


 * @typedef {import('./docs/Interprete/nodos.js').Join} Join


 * @typedef {import('./docs/Interprete/nodos.js').Bloque} Bloque


 * @typedef {import('./docs/Interprete/nodos.js').If} If


 * @typedef {import('./docs/Interprete/nodos.js').ElseIf} ElseIf


 * @typedef {import('./docs/Interprete/nodos.js').Switch} Switch


 * @typedef {import('./docs/Interprete/nodos.js').While} While


 * @typedef {import('./docs/Interprete/nodos.js').For} For


 * @typedef {import('./docs/Interprete/nodos.js').ForEach} ForEach


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
     * @param {DeclaracionArray} node
     * @returns {any}
     */
    visitDeclaracionArray(node) {
        throw new Error('Metodo visitDeclaracionArray no implementado');
    }
    

    /**
     * @param {Funcion} node
     * @returns {any}
     */
    visitFuncion(node) {
        throw new Error('Metodo visitFuncion no implementado');
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
     * @param {ArrayAssign} node
     * @returns {any}
     */
    visitArrayAssign(node) {
        throw new Error('Metodo visitArrayAssign no implementado');
    }
    

    /**
     * @param {ArrayAccess} node
     * @returns {any}
     */
    visitArrayAccess(node) {
        throw new Error('Metodo visitArrayAccess no implementado');
    }
    

    /**
     * @param {Length} node
     * @returns {any}
     */
    visitLength(node) {
        throw new Error('Metodo visitLength no implementado');
    }
    

    /**
     * @param {Asignacion} node
     * @returns {any}
     */
    visitAsignacion(node) {
        throw new Error('Metodo visitAsignacion no implementado');
    }
    

    /**
     * @param {Ternario} node
     * @returns {any}
     */
    visitTernario(node) {
        throw new Error('Metodo visitTernario no implementado');
    }
    

    /**
     * @param {ParseInt} node
     * @returns {any}
     */
    visitParseInt(node) {
        throw new Error('Metodo visitParseInt no implementado');
    }
    

    /**
     * @param {ParseFloat} node
     * @returns {any}
     */
    visitParseFloat(node) {
        throw new Error('Metodo visitParseFloat no implementado');
    }
    

    /**
     * @param {ToString} node
     * @returns {any}
     */
    visitToString(node) {
        throw new Error('Metodo visitToString no implementado');
    }
    

    /**
     * @param {ToLowerCase} node
     * @returns {any}
     */
    visitToLowerCase(node) {
        throw new Error('Metodo visitToLowerCase no implementado');
    }
    

    /**
     * @param {ToUpperCase} node
     * @returns {any}
     */
    visitToUpperCase(node) {
        throw new Error('Metodo visitToUpperCase no implementado');
    }
    

    /**
     * @param {TypeOf} node
     * @returns {any}
     */
    visitTypeOf(node) {
        throw new Error('Metodo visitTypeOf no implementado');
    }
    

    /**
     * @param {IndexOf} node
     * @returns {any}
     */
    visitIndexOf(node) {
        throw new Error('Metodo visitIndexOf no implementado');
    }
    

    /**
     * @param {Join} node
     * @returns {any}
     */
    visitJoin(node) {
        throw new Error('Metodo visitJoin no implementado');
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
     * @param {ElseIf} node
     * @returns {any}
     */
    visitElseIf(node) {
        throw new Error('Metodo visitElseIf no implementado');
    }
    

    /**
     * @param {Switch} node
     * @returns {any}
     */
    visitSwitch(node) {
        throw new Error('Metodo visitSwitch no implementado');
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
     * @param {ForEach} node
     * @returns {any}
     */
    visitForEach(node) {
        throw new Error('Metodo visitForEach no implementado');
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
