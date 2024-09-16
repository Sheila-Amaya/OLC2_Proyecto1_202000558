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
import { FuncionDef } from "../Interprete/funcionDef.js";

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
                return resultadoDiferente.valor;
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
                return resultadoMenorOIgual.valor;
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
     * declacion array :D
     *  @type {BaseVisitor['visitDeclaracionArray']}
     */
    visitDeclaracionArray(node) {
        const nombreArray = node.id;
        const tipoArray = node.tipo;
    
        if (node.copyFrom) {
            // permite copiar un array
            try {
                this.entornoActual.setArrayComoCopia(nombreArray, node.copyFrom);
                const valoresCopia = this.entornoActual.getVariable(nombreArray);
                console.log(`Declarando array ${nombreArray} como copia de ${node.copyFrom}, con valores: ${JSON.stringify(valoresCopia)}.`); //para pruebas
            } catch (error) {
                console.error(`Error copiando array: ${error.message}`);
            }
        } else if (node.arrayInit) {
            this.entornoActual.setArray(nombreArray, node.arrayInit.map(v => v.valor), tipoArray); // Inicializacion con valores por defecto
            console.log(`Declarando array ${nombreArray} de tipo ${tipoArray} con valores iniciales: ${JSON.stringify(node.arrayInit.map(v => v.valor))}.`);
        } else if (node.tam !== null && node.tam.valor !== undefined) {
            // Inicializacion con tamaño
            const tamano = node.tam.valor;  // Acceder al valor numerico [5]
            const defaultValue = this.entornoActual.getDefaultValue(tipoArray);
            const arrayInicializado = Array(tamano).fill(defaultValue);
            this.entornoActual.setArray(nombreArray, arrayInicializado, tipoArray);
            console.log(`Declarando array ${nombreArray} de tipo ${tipoArray} con tamaño ${tamano}, llenado con valores por defecto: ${defaultValue}.`);
        } else {
            throw new Error(`Error en la declaración del array '${nombreArray}': se debe definir con inicializacion, tamaño o copia.`);
        }
    }

    /**
     * @type {BaseVisitor['visitFuncion']}
     */
    visitFuncion(node) {
        // node.params es un array de parametros con la forma { id: string, tipo: string } puede venir vacio
        const params = Array.isArray(node.params) ? node.params : [];
        const funcionDef = new FuncionDef(node, this.entornoActual);
        
        // def. el tipo de la funcion
        const tipoFuncion = `function (${params.map(param => param.tipo).join(', ')}) -> ${node.tipoRetorno}`;
        
        // def. la funcion en el entorno actual
        this.entornoActual.setVariable(node.id, funcionDef, tipoFuncion);
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
      * @type {BaseVisitor['visitExpresionStmt']}
      */
    visitExpresionStmt(node) {
        node.exp.accept(this);
    }

    /**
     * @type {BaseVisitor['visitArrayAccess']}
     */
    visitArrayAccess(node) {
        const array = this.entornoActual.getVariable(node.id);
        const index = node.indice.accept(this);
    
        // val. que el array sea un array
        if (!Array.isArray(array)) {
            throw new Error(`'${node.id}' no es un array.`);
        }
    
        // val. que el indice sea un numero
        if (typeof index !== 'number' || index < 0 || index >= array.length) {
            throw new Error(`indice '${index}' fuera de rango para el array '${node.id}'.`);
        }
    
        const valor = array[index];
        console.log(`Acceso a array '${node.id}' en la posicion [${index}], valor obtenido: ${valor}.`);
        return valor; // Retorna el valor del indice
    }

    /**
     * @type {BaseVisitor['visitArrayAssign']}
     */
    visitArrayAssign(node) {
        const array = this.entornoActual.getVariable(node.id);
        
        if (!Array.isArray(array)) {
            throw new Error(`'${node.id}' no es un array.`);
        }
        
        // evalua el indice
        const index = node.indice.accept(this);
        
        // verf. que el indice sea un numero
        if (typeof index !== 'number' || !Number.isInteger(index)) {
            throw new Error(`el indice debe ser un entero, pero se encontro '${typeof index}'.`);
        }
        
        // Verf. que el indice este en rango
        if (index < 0 || index >= array.length) {
            throw new Error(`indice fuera de rango. El índice debe estar entre 0 y ${array.length - 1}.`);
        }
        
        const valor = node.valor.accept(this);
        
        // verf. que el tipo del valor sea el mismo que el tipo del array
        const tipoArray = this.entornoActual.getTipoVariable(node.id).split(' ')[2]; // Obtiene el tipo del array
        const tipoValor = obtenerTipo(valor);
        
        if (tipoArray !== tipoValor) {
            throw new Error(`tipo de dato no soportado. Se esperaba '${tipoArray}' pero se encontró '${tipoValor}'.`);
        }
        
        // asigna el valor al array
        array[index] = valor;
        console.log(`Asignacion a array '${node.id}' en la posicion [${index}], nuevo valor: ${valor}.`);
    }

    /**
     * @type {BaseVisitor['visitAsignacion']}
     */
    visitAsignacion(node) {
        const nombreVariable = node.id;
        const valorAsignado = node.asgn.accept(this);
        const tipoValorAsignado = obtenerTipo(valorAsignado);
    
        // obtiene el tipo de la variable
        const tipoVariable = this.entornoActual.getTipoVariable(nombreVariable);
    
        Asignacion.setEntorno(this.entornoActual);
    
        // Verif. si la variable es null y asifna el valor
        if (tipoVariable === 'null') {
            this.entornoActual.assignVariable(nombreVariable, valorAsignado);
            this.entornoActual.tipos[nombreVariable] = tipoValorAsignado; 
            console.log(`Variable '${nombreVariable}' asignada con valor ${valorAsignado} y tipo ${tipoValorAsignado}`);
            return;
        }
    
        if (tipoVariable !== tipoValorAsignado) {
            throw new Error(`tipos incompatibles. No se puede asignar un valor de tipo '${tipoValorAsignado}' a una variable de tipo '${tipoVariable}'`);
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
     * @type {BaseVisitor['visitIndexOf']}
     */
    visitIndexOf(node) {
        const nombreArray = node.array; // node.array debe ser un identificador
    
        // obt. el array desde el entorno actual con el id
        const array = this.entornoActual.getVariable(nombreArray);
    
        // val. si es un array
        if (!Array.isArray(array)) {
            throw new Error(`'${nombreArray}' no es un array o no está definido.`);
        }
    
        if (!node.argumento) {
            throw new Error(`El argumento para 'indexOf' en el array '${nombreArray}' es indefinido.`);
        }
    
        // eval. el argumento para buscar en el array (elemento)
        const argumento = node.argumento.accept(this);
    
        // indice del primer elemento encontrado que coincida con el elemento
        const index = array.indexOf(argumento);
    
        console.log(`IndexOf: Buscando '${argumento}' en el array '${nombreArray}', índice encontrado: ${index}.`);
    
        return index;
    }

    /**
     * @type {BaseVisitor['visitJoin']}
     */
    visitJoin(node) {
        const array = this.entornoActual.getVariable(node.array);

        if (!Array.isArray(array)) {
            throw new Error(`'${node.array}' no es un array o no está definido.`);
        }

        // Une los elementos del array en un string separado por comas
        const resultado = array.join(',');

        console.log(`Join: Uniendo elementos del array '${node.array}', resultado: '${resultado}'.`);
        return resultado;
    }

    /**
     * @type {BaseVisitor['visitLength']}
     */
    visitLength(node) {
        const array = this.entornoActual.getVariable(node.array);

        if (!Array.isArray(array)) {
            throw new Error(`'${node.array}' no es un array.`);
        }

        return array.length;
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

        // condiciones verdaderas, ejecutar stmt
        if (cond) {
            node.stmtTrue.accept(this);
            return;
        }

        for (const elseIfBranch of node.elseIfBranches) {
            const elseIfCond = elseIfBranch.cond.accept(this);

            // condiciones verdaderas, ejecutar stmt
            if (elseIfCond) {
                elseIfBranch.stmt.accept(this);
                return;
            }
        }

        // no se cumple ninguna condicion , ejec. stmtFalse si existe
        if (node.stmtFalse) {
            node.stmtFalse.accept(this);
        }
    }

    /**
     * @type {BaseVisitor['visitElseIf']}
     *  
     * */
    visitElseIf(node) {
        const cond = node.cond.accept(this);
        // condicion verdadera, eval stmt
        if (cond) {
            node.stmt.accept(this);
        }
    }

    /**
     * @type {BaseVisitor['visitSwitch']}
     */
    visitSwitch(node) {
        const switchExp = node.exp.accept(this);
        let ejecutar = false;
    
        // Iterar a traves de los casos
        for (const caseNode of node.cases) {
            const caseExp = caseNode.exp.accept(this);
    
            // Si se ha encontrado un caso que coincide con la expresión switch
            if (ejecutar || switchExp.valor === caseExp.valor) {
                ejecutar = true;
                try {
                    // Ejecutar las instrucciones del caso
                    for (const stmt of caseNode.stmt) {
                        stmt.accept(this);
                    }
                } catch (error) {
                    // sale del switch si hay una excepción de tipo Break
                    if (error instanceof BreakException) {
                        return; // Termina la ejecucion del switch
                    } else {
                        throw error;
                    }
                }
            }
        }
    
        // Si no hubo coincidencia y existe un caso por defecto
        if (!ejecutar && node.defau) {
            try {
                for (const stmt of node.defau.stmt) {
                    stmt.accept(this);
                }
            } catch (error) {
                // Si hay una excepción de tipo Break, salir del switch
                if (!(error instanceof BreakException)) {
                    throw error; 
                }
            }
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

            if (error instanceof BreakException) { // Maneja el break y terminar el bucle
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
        // Guardar el incremento anterior
        const incrementoAnterior = this.prevContinue;
        this.prevContinue = node.inc;
    
        const forTraducido = new nodos.Bloque({
            dcls: [
                node.init,
                new nodos.While({
                    cond: node.cond, 
                    stmt: new nodos.Bloque({
                        dcls: [
                            node.stmt, // Cuerpo del for
                            node.inc   // Incremento del for
                        ]
                    })
                })
            ]
        });
    
        try {
            forTraducido.accept(this); 
        } catch (error) {
            if (error instanceof BreakException) {
                // maneja el break y termina el bucle
                console.log('break');
                return;
            } else if (error instanceof ContinueException) {
                // Maneja el continue y continua con la siguiente ite.
                node.inc.accept(this);
                return this.visitFor(node);
            } else {
                throw error; 
            }
        } finally {
            this.prevContinue = incrementoAnterior;
        }
    }

    /**
     * @type {BaseVisitor['visitForEach']}
     * 
     */
    visitForEach(node) {
        // obtiene el array en el entorno actual con name para iterar
        const array = this.entornoActual.getVariable(node.arr);
    
        // verf. si es un array
        if (!Array.isArray(array)) {
            throw new Error(`'${node.arr}' no es un array.`);
        }
    
        const entornoAnterior = this.entornoActual;
    
        // itera sobre cada elemento del array
        for (const elemento of array) {
            this.entornoActual = new Entorno(entornoAnterior);
    
            try {
                // variable que se asigna en cada iteracion
                this.entornoActual.setVariable(node.id, elemento, node.tipo);
    
                // ejecuta las instrucciones del bucle
                node.stmt.accept(this);
            } catch (error) {
                if (error instanceof BreakException) { // break
                    break;
                } else if (error instanceof ContinueException) { // continue
                    continue;
                } else {
                    throw error;
                }
            }
        }
        this.entornoActual = entornoAnterior;
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
    
        if (!(funcion instanceof Invocable)) {
            throw new Error(`'${node.callee}' no es invocable`);
        }
    
        const argumentos = node.args.map(arg => arg.accept(this));
    
        if (funcion.aridad() !== argumentos.length) {
            throw new Error(`Aridad incorrecta. Se esperaban ${funcion.aridad()} argumentos, pero se recibieron ${argumentos.length}`);
        }
    
        return funcion.invocar(this, argumentos);
    }

}