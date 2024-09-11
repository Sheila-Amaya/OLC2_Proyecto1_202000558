import { Entorno } from "../Entorno/entorno.js";
import { BaseVisitor } from "../Interprete/visitor.js";
import nodos, { Expresion } from './nodos.js'
import { BreakException, ContinueException, ReturnException } from "../Interprete/transferencia.js";
import { Invocable } from "../Interprete/invocable.js";
import { embebidas } from "../Entorno/embebidas.js";
import { obtenerTipo } from "../Util/utils.js";

export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();

        // funciones embebidas
        Object.entries(embebidas).forEach(([nombre, funcion]) => {
            this.entornoActual.setVariable(nombre, funcion);
        });


        this.salida = '';

        /**
         * @type {Expresion | null}
        */
        this.prevContinue = null;
    }

    interpretar(nodo) {
        return nodo.accept(this);
    }

    /**
      * @type {BaseVisitor['visitOperacionBinaria']}
      */
    visitOperacionBinaria(node) {
        const izq = node.izq.accept(this);
        const der = node.der.accept(this);

        if (izq === null || der === null) {
            console.error(`operacion con null detectada en '${node.op}'`);
            return null;
        }

        switch (node.op) {
            case '+':
                return izq + der;
            case '-':
                return izq - der;
            case '*':
                return izq * der;
            case '/':
                if (der === 0) throw new Error('division por cero');
                return izq / der;
            case '<=':
                return izq <= der;
            case '==':
                return izq === der;
            default:
                throw new Error(`operador no soportado: ${node.op}`);
        }
    }

    /**
      * @type {BaseVisitor['visitOperacionUnaria']}
      */
    visitOperacionUnaria(node) {
        const exp = node.exp.accept(this);

        switch (node.op) {
            case '-':
                return -exp;
            default:
                throw new Error(`operador no soportado: ${node.op}`);
        }
    }

    /**
      * @type {BaseVisitor['visitAgrupacion']}
      */
    visitAgrupacion(node) {
        return node.exp.accept(this);
    }

    /**
      * @type {BaseVisitor['visitNumero']}
      */
    visitNumero(node) {
        return node.valor;
    }

    /**
     *  
     * @type {BaseVisitor['visitBooleano']}
     *  
     * */
    visitBooleano(node) {
        return node.valor;
    }

    /**
     *    
     * @type {BaseVisitor['visitString']}
     *  
     * */
    visitString(node) {
        return node.valor;
    }


    /**
     *  
     * @type {BaseVisitor['visitChar']}
     * 
     * */
    visitChar(node) {
        return node.valor;
    }

    /**
     *  
     * @type {BaseVisitor['visitNull']}
     *  
     * */
    visitNull(node) {
        return null;
    }


    /**
     * @type {BaseVisitor['visitDeclaracionVariable']}
     */    
    visitDeclaracionVariable(node) {
        const nombreVariable = node.id;
        const tipoDefinido = node.tipo; // 'var'
        let valorInicial = node.exp ? node.exp.accept(this) : null; // Asignar null 
        
        // Verifica si la variable ya está definida
        if (this.entornoActual.existeVariable(nombreVariable)) {
            throw new Error(`la variable '${nombreVariable}' ya esta definida en este entorno.`);
        }
        
        // infiere el tipo en var
        if (tipoDefinido === 'var') {
            if (valorInicial === null) {
                node.tipo = 'null'; // Asignar tipo null si no hay inicialización
            } else {
                const tipoInferido = obtenerTipo(valorInicial);
                node.tipo = tipoInferido; // Actualiza el tipo del nodo con el tipo inferido
            }
        } else {
            const tipoValor = obtenerTipo(valorInicial);
            
            // Verifica la compatibilidad de tipos
            if (tipoDefinido !== tipoValor && valorInicial !== null) {
                if (tipoDefinido === 'float' && tipoValor === 'int') {
                    valorInicial = parseFloat(valorInicial); // conversion permitida de int a float
                } else {
                    throw new Error(`Tipo incompatible en variable '${nombreVariable}'. Se esperaba '${tipoDefinido}', pero se recibió '${tipoValor}'.`);
                }
            }
        }
        
        // Almacena la variable en el entorno actual
        this.entornoActual.setVariable(nombreVariable, valorInicial, node.tipo);
        console.log(`Variable '${nombreVariable}' declarada con valor ${valorInicial} y tipo ${node.tipo}`);
    }

    /**
      * @type {BaseVisitor['visitReferenciaVariable']}
      */
    visitReferenciaVariable(node) {
        const nombreVariable = node.id;
        return this.entornoActual.getVariable(nombreVariable);
    }


    /**
      * @type {BaseVisitor['visitPrint']}
      */
    visitPrint(node) {
        const valor = node.exp.accept(this);
        this.salida += `${valor}\n`;
    }


    /**
      * @type {BaseVisitor['visitExpresionStmt']}
      */
    visitExpresionStmt(node) {
        node.exp.accept(this);
    }

    /**
     * @type {BaseVisitor['visitAsignacion']}
     */
    visitAsignacion(node) {
        const nombreVariable = node.id;
        const valorAsignado = node.asgn.accept(this);
        const tipoValorAsignado = obtenerTipo(valorAsignado);
    
        // Verifica si la variable ya esta definida
        if (!this.entornoActual.existeVariable(nombreVariable)) {
            throw new Error(`La variable '${nombreVariable}' no está definida.`);
        }
    
        const tipoVariable = this.entornoActual.getTipoVariable(nombreVariable);
        // Permite asignar null a cualquier tipo
        if (tipoVariable === 'null') {
            this.entornoActual.assignVariable(nombreVariable, valorAsignado);
            console.log(`Variable '${nombreVariable}' asignada con valor ${valorAsignado} y tipo ${obtenerTipo(valorAsignado)}`);
            return;
        }
    
        // Verifica la compatibilidad de tipos
        if (tipoVariable !== tipoValorAsignado) {
            if (tipoVariable === 'float' && tipoValorAsignado === 'int') {
                this.entornoActual.assignVariable(nombreVariable, parseFloat(valorAsignado));
                console.log(`Variable '${nombreVariable}' asignada con valor convertido ${parseFloat(valorAsignado)} de tipo 'float'`);
            } else {
                throw new Error(`Tipo incompatible. Se esperaba '${tipoVariable}', pero se recibió '${tipoValorAsignado}'.`);
            }
        } else {
            this.entornoActual.assignVariable(nombreVariable, valorAsignado);
            console.log(`Variable '${nombreVariable}' asignada con valor ${valorAsignado} y tipo ${tipoVariable}`);
        }
    }

    /**
     * @type {BaseVisitor['visitBloque']}
     */
    visitBloque(node) {

        const entornoAnterior = this.entornoActual;
        this.entornoActual = new Entorno(entornoAnterior);

        node.dcls.forEach(dcl => dcl.accept(this));

        this.entornoActual = entornoAnterior;
    }

    /**
     * @type {BaseVisitor['visitIf']}
     */
    visitIf(node) {
        const cond = node.cond.accept(this);

        if (cond) {
            node.stmtTrue.accept(this);
            return;
        }

        if (node.stmtFalse) {
            node.stmtFalse.accept(this);
        }

    }

    /**
     * @type {BaseVisitor['visitWhile']}
     */
    visitWhile(node) {
        const entornoConElQueEmpezo = this.entornoActual;

        try {
            while (node.cond.accept(this)) {
                node.stmt.accept(this);
            }
        } catch (error) {
            this.entornoActual = entornoConElQueEmpezo;

            if (error instanceof BreakException) {
                console.log('break');
                return
            }

            if (error instanceof ContinueException) {
                return this.visitWhile(node);
            }

            throw error;

        }
    }

    /**
     * @type {BaseVisitor['visitFor']}
     */
    visitFor(node) {
        // this.prevContinue = node.inc;
        const incrementoAnterior = this.prevContinue;
        this.prevContinue = node.inc;

        const forTraducido = new nodos.Bloque({
            dcls: [
                node.init,
                new nodos.While({
                    cond: node.cond,
                    stmt: new nodos.Bloque({
                        dcls: [
                            node.stmt,
                            node.inc
                        ]
                    })
                })
            ]
        })

        forTraducido.accept(this);

        this.prevContinue = incrementoAnterior;
    }

    /**
     * @type {BaseVisitor['visitBreak']}
     */
    visitBreak(node) {
        throw new BreakException();
    }

    /**
     * @type {BaseVisitor['visitContinue']}
     */
    visitContinue(node) {

        if (this.prevContinue) {
            this.prevContinue.accept(this);
        }

        throw new ContinueException();
    }

    /**
     * @type {BaseVisitor['visitReturn']}
     */
    visitReturn(node) {
        let valor = null
        if (node.exp) {
            valor = node.exp.accept(this);
        }
        throw new ReturnException(valor);
    }

    /**
    * @type {BaseVisitor['visitLlamada']}
    */
    visitLlamada(node) {
        const funcion = node.callee.accept(this);

        const argumentos = node.args.map(arg => arg.accept(this));

        if (!(funcion instanceof Invocable)) {
            throw new Error('No es invocable');
            // 1() "sdalsk"()
        }

        if (funcion.aridad() !== argumentos.length) {
            throw new Error('Aridad incorrecta');
        }

        return funcion.invocar(this, argumentos);
    }

}