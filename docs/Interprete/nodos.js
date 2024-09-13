
/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
*/
    

/**
 * @typedef {import('./docs/Interprete/visitor.js').BaseVisitor} BaseVisitor
 */

export class Expresion  {

    /**
    * @param {Object} options
    * @param {Location|null} options.location Ubicacion del nodo en el codigo fuente
    */
    constructor() {
        
        
        /**
         * Ubicacion del nodo en el codigo fuente
         * @type {Location|null}
        */
        this.location = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresion(this);
    }
}
    
export class OperacionBinaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq Expresion izquierda de la operacion
 * @param {Expresion} options.der Expresion derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionBinaria(this);
    }
}
    
export class OperacionUnaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ exp, op }) {
        super();
        
        /**
         * Expresion de la operacion
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionUnaria(this);
    }
}
    
export class Agrupacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion agrupada
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion agrupada
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAgrupacion(this);
    }
}
    
export class Numero extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo del numero
 * @param {number} options.valor Valor del numero
    */
    constructor({ tipo, valor }) {
        super();
        
        /**
         * Tipo del numero
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Valor del numero
         * @type {number}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitNumero(this);
    }
}
    
export class Booleano extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo del booleano
 * @param {boolean} options.valor Valor del booleano
    */
    constructor({ tipo, valor }) {
        super();
        
        /**
         * Tipo del booleano
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Valor del booleano
         * @type {boolean}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBooleano(this);
    }
}
    
export class String extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de la cadena
 * @param {string} options.valor Valor de la cadena
    */
    constructor({ tipo, valor }) {
        super();
        
        /**
         * Tipo de la cadena
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Valor de la cadena
         * @type {string}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitString(this);
    }
}
    
export class Char extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo del char
 * @param {string} options.valor Valor del char
    */
    constructor({ tipo, valor }) {
        super();
        
        /**
         * Tipo del char
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Valor del char
         * @type {string}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitChar(this);
    }
}
    
export class Null extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo del null
 * @param {null} options.valor Valor del null
    */
    constructor({ tipo, valor }) {
        super();
        
        /**
         * Tipo del null
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Valor del null
         * @type {null}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitNull(this);
    }
}
    
export class DeclaracionVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de la variable
 * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.exp Expresion de la variable
    */
    constructor({ tipo, id, exp }) {
        super();
        
        /**
         * Tipo de la variable
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion de la variable
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVariable(this);
    }
}
    
export class ReferenciaVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
    */
    constructor({ id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReferenciaVariable(this);
    }
}
    
export class Print extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.listaExpresiones Expresiones a imprimir
    */
    constructor({ listaExpresiones }) {
        super();
        
        /**
         * Expresiones a imprimir
         * @type {Expresion[]}
        */
        this.listaExpresiones = listaExpresiones;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class ExpresionStmt extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresionStmt(this);
    }
}
    
export class Asignacion extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {string} options.op Operador de la asignacion
 * @param {Expresion} options.asgn Expresion a asignar
    */
    constructor({ id, op, asgn }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Operador de la asignacion
         * @type {string}
        */
        this.op = op;


        /**
         * Expresion a asignar
         * @type {Expresion}
        */
        this.asgn = asgn;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacion(this);
    }
}
    
export class Ternario extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del ternario
 * @param {Expresion} options.stmtTrue Cuerpo del verdadero
 * @param {Expresion} options.stmtFalse Cuerpo del falso
    */
    constructor({ cond, stmtTrue, stmtFalse }) {
        super();
        
        /**
         * Condicion del ternario
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Cuerpo del verdadero
         * @type {Expresion}
        */
        this.stmtTrue = stmtTrue;


        /**
         * Cuerpo del falso
         * @type {Expresion}
        */
        this.stmtFalse = stmtFalse;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTernario(this);
    }
}
    
export class ParseInt extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a parsear
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a parsear
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitParseInt(this);
    }
}
    
export class ParseFloat extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a parsear
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a parsear
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitParseFloat(this);
    }
}
    
export class ToString extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a convertir
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a convertir
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitToString(this);
    }
}
    
export class ToLowerCase extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a convertir
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a convertir
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitToLowerCase(this);
    }
}
    
export class ToUpperCase extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a convertir
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a convertir
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitToUpperCase(this);
    }
}
    
export class Bloque extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.dcls Sentencias del bloque
    */
    constructor({ dcls }) {
        super();
        
        /**
         * Sentencias del bloque
         * @type {Expresion[]}
        */
        this.dcls = dcls;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBloque(this);
    }
}
    
export class If extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del if
 * @param {Expresion} options.stmtTrue Cuerpo del if
 * @param {Expresion|undefined} options.stmtFalse Cuerpo del else
    */
    constructor({ cond, stmtTrue, stmtFalse }) {
        super();
        
        /**
         * Condicion del if
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Cuerpo del if
         * @type {Expresion}
        */
        this.stmtTrue = stmtTrue;


        /**
         * Cuerpo del else
         * @type {Expresion|undefined}
        */
        this.stmtFalse = stmtFalse;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
    
export class While extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del while
 * @param {Expresion} options.stmt Cuerpo del while
    */
    constructor({ cond, stmt }) {
        super();
        
        /**
         * Condicion del while
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Cuerpo del while
         * @type {Expresion}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitWhile(this);
    }
}
    
export class For extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.init Inicializacion del for
 * @param {Expresion} options.cond Condicion del for
 * @param {Expresion} options.inc Incremento del for
 * @param {Expresion} options.stmt Cuerpo del for
    */
    constructor({ init, cond, inc, stmt }) {
        super();
        
        /**
         * Inicializacion del for
         * @type {Expresion}
        */
        this.init = init;


        /**
         * Condicion del for
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Incremento del for
         * @type {Expresion}
        */
        this.inc = inc;


        /**
         * Cuerpo del for
         * @type {Expresion}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
    }
}
    
export class Break extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBreak(this);
    }
}
    
export class Continue extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitContinue(this);
    }
}
    
export class Return extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion|undefined} options.exp Expresion a retornar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a retornar
         * @type {Expresion|undefined}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReturn(this);
    }
}
    
export class Llamada extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.callee Expresion a llamar
 * @param {Expresion[]} options.args Argumentos de la llamada
    */
    constructor({ callee, args }) {
        super();
        
        /**
         * Expresion a llamar
         * @type {Expresion}
        */
        this.callee = callee;


        /**
         * Argumentos de la llamada
         * @type {Expresion[]}
        */
        this.args = args;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLlamada(this);
    }
}
    
export default { Expresion, OperacionBinaria, OperacionUnaria, Agrupacion, Numero, Booleano, String, Char, Null, DeclaracionVariable, ReferenciaVariable, Print, ExpresionStmt, Asignacion, Ternario, ParseInt, ParseFloat, ToString, ToLowerCase, ToUpperCase, Bloque, If, While, For, Break, Continue, Return, Llamada }
