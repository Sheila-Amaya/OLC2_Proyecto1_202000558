import { Entorno } from "../Entorno/entorno.js";
import { BaseVisitor } from "../Interprete/visitor.js";
import nodos, { Expresion } from './nodos.js'
import { BreakException, ContinueException, ReturnException } from "../Interprete/transferencia.js";
import { Invocable } from "../Interprete/invocable.js";
import { embebidas } from "../Entorno/embebidas.js";
import { obtenerTipo } from "../Util/utils.js";
import { Aritmeticas } from "../Expression/aritmeticas.js";
import { Asignacion } from "../Expression/asignacion.js";
import { Comparaciones } from "../Expression/comparacion.js";
import { Relacionales } from "../Expression/relacionales.js";
import { Logicos } from "../Expression/logicos.js";

export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();

        this.entornoActual.setVariable('true', true, 'boolean');
        this.entornoActual.setVariable('false', false, 'boolean');

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
        console.log(izq, der);
    
        if (izq === null || der === null) {
            console.error(`Operacion con null detectada en '${node.op}'`);
            return null;
        }
    
        switch (node.op) {
            case '+':
                const resultadoSuma = Aritmeticas.suma(izq, der);
                if (resultadoSuma.tipo) {
                    node.tipo = resultadoSuma.tipo; // Actualiza el tipo del nodo 
                }
                return resultadoSuma.valor;
            case '-':
                const resultadoResta = Aritmeticas.resta(izq, der);
                if (resultadoResta.tipo) {
                    node.tipo = resultadoResta.tipo; 
                }
                return resultadoResta.valor;
            case '*':
                const resultadoMultiplicacion = Aritmeticas.multiplicacion(izq, der);
                if (resultadoMultiplicacion.tipo) {
                    node.tipo = resultadoMultiplicacion.tipo;
                }
                return resultadoMultiplicacion.valor;
            case '/':
                if (der === 0) throw new Error('division por cero');
                
                const resultadoDivision = Aritmeticas.division(izq, der);
                if (resultadoDivision.tipo) {
                    node.tipo = resultadoDivision.tipo; 
                }
                return resultadoDivision.valor;

            case '%':
                const resultadoModulo = Aritmeticas.modulo(izq, der);
                if (resultadoModulo.tipo) {
                    node.tipo = resultadoModulo.tipo; 
                }
                return resultadoModulo.valor;

            // Operadores de comparacion
            case '==':
                const resultadoIgual = Comparaciones.igualdad(izq, der);
                if (resultadoIgual.tipo) {
                    node.tipo = resultadoIgual.tipo;
                }
                return resultadoIgual.valor;
            case '!=':
                const resultadoDiferente = Comparaciones.desigualdad(izq, der);
                if (resultadoDiferente.tipo) {
                    node.tipo = resultadoDiferente.tipo;
                }
            // Operadores relacionales
            case '>':
                const resultadoMayorQue = Relacionales.mayorQue(izq, der);
                if (resultadoMayorQue.tipo) {
                    node.tipo = resultadoMayorQue.tipo; 
                }
                return resultadoMayorQue.valor;
            case '>=':
                const resultadoMayorOIgual = Relacionales.mayorOIgual(izq, der);
                if (resultadoMayorOIgual.tipo) {
                    node.tipo = resultadoMayorOIgual.tipo; 
                }
                return resultadoMayorOIgual.valor;
            case '<':
                const resultadoMenorQue = Relacionales.menorQue(izq, der);
                if (resultadoMenorQue.tipo) {
                    node.tipo = resultadoMenorQue.tipo; 
                }
                return resultadoMenorQue.valor;
            case '<=':
                const resultadoMenorOIgual = Relacionales.menorOIgual(izq, der);
                if (resultadoMenorOIgual.tipo) {
                    node.tipo = resultadoMenorOIgual.tipo; 
                }
            // Operadores logicos
            case '&&':
                const resultadoAnd = Logicos.and(izq, der);
                if (resultadoAnd.tipo) {
                    node.tipo = resultadoAnd.tipo; 
                }
                return resultadoAnd.valor;
            case '||':
                const resultadoOr = Logicos.or(izq, der);
                if (resultadoOr.tipo) {
                    node.tipo = resultadoOr.tipo; 
                }
                return resultadoOr.valor;
            default:
                throw new Error(`Operador no soportado: ${node.op}`);
        }
    }


    /**
      * @type {BaseVisitor['visitOperacionUnaria']}
      */
    visitOperacionUnaria(node) {
        const exp = node.exp.accept(this);
    
        switch (node.op) {
            case '-':
                const resultado = Aritmeticas.negacionUnaria(exp);
                node.tipo = resultado.tipo; // Actualiza el tipo del nodo
                return resultado.valor;
            // Operador logico NOT
            case '!':
                const resultadoNot = Logicos.not(exp);
                node.tipo = resultadoNot.tipo; 
                return resultadoNot.valor;
            default:
                throw new Error(`Operador unario no soportado: ${node.op}`);
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
     *  
     * @type {BaseVisitor['visitTernario']}
     *  
     * */
    visitTernario(node) {
        const condicion = node.cond.accept(this);
    
        // val. tipo booleano
        if (typeof condicion !== 'boolean') {
            throw new Error(`La condición en el operador ternario debe ser booleana, pero se encontro: ${typeof condicion}`);
        }

        //eval. t o f
        if (condicion) {
            if (!node.stmtTrue) throw new Error('Expresion true esta indefinida en el operador ternario');
            return node.stmtTrue.accept(this);
        } else {
            if (!node.stmtFalse) throw new Error('Expresio n false esta indefinida en el operador ternario');
            return node.stmtFalse.accept(this);
        }
    }
    

    /**
     * @type {BaseVisitor['visitDeclaracionVariable']}
     */    
    visitDeclaracionVariable(node) {
        const nombreVariable = node.id;
        const tipoDefinido = node.tipo;
        let valorInicial = node.exp ? node.exp.accept(this) : null;
    
        if (this.entornoActual.existeVariableLocal(nombreVariable)) {
            throw {
                message: `La variable '${nombreVariable}' ya está definida en este entorno.`,
                location: node.location
            };
        }
    
        const tipoInferido = valorInicial === null ? 'null' : obtenerTipo(valorInicial);
    
        if (tipoDefinido !== 'var' && tipoDefinido !== tipoInferido && tipoInferido !== 'null') {
            if (tipoDefinido === 'float' && tipoInferido === 'int') {
                valorInicial = parseFloat(valorInicial);
            } else {
                console.log(`Tipo incompatible en la variable '${nombreVariable}'. Se esperaba '${tipoDefinido}', pero se recibió '${tipoInferido}'. Asignando null.`);
                valorInicial = null;  // Asigna null si hay incompatibilidad
            }
        } else if (tipoDefinido === 'var') {
            node.tipo = tipoInferido;
        }
    
        this.entornoActual.setVariable(nombreVariable, valorInicial, node.tipo || tipoDefinido);
        console.log(`Variable '${nombreVariable}' declarada con valor ${valorInicial} y tipo ${node.tipo || tipoDefinido}`);
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
        const expresiones = Array.isArray(node.listaExpresiones) ? node.listaExpresiones : []; // Si no hay expresiones, se asigna un arreglo vacío
        const resultados = expresiones.map(exp => {
            const valor = exp.accept(this);
            
            // Verifica si el valor es null y lo convierte a 'null' en string
            return valor === null ? 'null' : valor;
        });
        
        this.salida += resultados.join(' ') + '\n'; // Concatena los resultados y añade un salto de línea
    }

    /**
     * @type {BaseVisitor['visitParseInt']}
     */
    visitParseInt(node) {
        const valor = node.exp.accept(this);
        
        if (typeof valor === 'string') {
            const numero = parseInt(valor, 10);
            if (isNaN(numero)) {
                throw new Error(`Error: no se puede convertir '${valor}' a entero.`);
            }
            return numero;
        } else {
            throw new Error(`Error: tipo de dato incorrecto para parseInt, se esperaba un string pero se recibió '${typeof valor}'.`);
        }
    }

    /**
     * @type {BaseVisitor['visitParseFloat']}
     *  
     * */
    visitParseFloat(node) {
        const valor = node.exp.accept(this);
        
        if (typeof valor !== 'string') {
            throw new Error(`se esperaba un string, pero se recibió ${typeof valor}`);
        }
    
        const floatValue = parseFloat(valor);
    
        // no es un numero
        if (isNaN(floatValue)) {
            throw new Error(`no se puede convertir '${valor}' a un float`);
        }

        return floatValue;
    }

    /**
     * @type {BaseVisitor['visitToString']}
     */
    visitToString(node) {
        const valor = node.exp.accept(this);
        return valor.toString();
    }

    /** 
     * @type {BaseVisitor['visitToLowerCase']}
     */
    visitToLowerCase(node) {
        const valor = node.exp.accept(this);
    
        // Verf. si el valor es de tipo string
        if (typeof valor !== 'string') {
            throw new Error(`toLowerCase solo es aplicable a expresiones de tipo string, se recibio ${typeof valor}`);
        }
        return valor.toLowerCase();
    }
    

    /**
     * @type {BaseVisitor['visitToUpperCase']}
     *  
     * */
    visitToUpperCase(node) {
        const valor = node.exp.accept(this);
    
        // Verf. si el valor es de tipo string
        if (typeof valor !== 'string') {
            throw new Error(`toUpperCase solo es aplicable a expresiones de tipo string, se recibio ${typeof valor}`);
        }
    
        return valor.toUpperCase();
    }

    /**
     * @type {BaseVisitor['visitTypeOf']}
     */
    visitTypeOf(node) {
        const valor = node.exp.accept(this);
        const tipo = obtenerTipo(valor);
        return tipo;
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
    
        // Obtener tipo de la variable antes de asignar
        const tipoVariable = this.entornoActual.getTipoVariable(nombreVariable);
    
        Asignacion.setEntorno(this.entornoActual);
    
        // Verificar si la variable es de tipo null y aceptar cualquier tipo
        if (tipoVariable === 'null') {
            this.entornoActual.assignVariable(nombreVariable, valorAsignado);
            this.entornoActual.tipos[nombreVariable] = tipoValorAsignado; // Actualiza el tipo a partir del valor asignado
            console.log(`Variable '${nombreVariable}' asignada con valor ${valorAsignado} y tipo ${tipoValorAsignado}`);
            return;
        }
    
        if (tipoVariable !== tipoValorAsignado) {
            throw new Error(`Tipos incompatibles. No se puede asignar un valor de tipo '${tipoValorAsignado}' a una variable de tipo '${tipoVariable}'`);
        }
    
        switch (node.op) {
            case "=":
                Asignacion.AsignacionEstandar(nombreVariable, valorAsignado);
                break;
    
            case "+=":
                Asignacion.AsignacionSuma(nombreVariable, valorAsignado);
                break;
    
            case "-=":
                Asignacion.AsignacionResta(nombreVariable, valorAsignado);
                break;
    
            default:
                throw new Error(`Operador de asignación no soportado: ${node.op}`);
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