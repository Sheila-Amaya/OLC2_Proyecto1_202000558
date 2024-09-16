import { Entorno   } from "../Entorno/entorno.js";
import { Invocable } from "./invocable.js";
import { Funcion   } from "./nodos.js";
import { ReturnException } from "./transferencia.js";
import { obtenerTipo } from "../Util/utils.js";

export class FuncionDef extends Invocable {

    constructor(nodo, clousure) {  // clousure entorno padre de la funcion
        super();
        /**
         * @type {Funcion}
         */
        this.nodo = nodo;

        /**
         * @type {Entorno}
         */
        this.clousure = clousure;
    }

    aridad() {  // aridad = cantidad de parametros que recibe la funcion
        return this.nodo.params.length;
    }

    /**
    * @type {Invocable['invocar']}
    */
    invocar(interprete, args) {
        const entornoNuevo = new Entorno(this.clousure); // Crea un nuevo entorno con el entorno de cierre
    
        // Asigna los argumentos a los parametros definidos
        this.nodo.params.forEach((param, i) => {
            const nombre = param.id;
            const tipo = param.tipo;
            const valor = args[i];
            entornoNuevo.setVariable(nombre, valor, tipo);
        });
    
        const entornoAntesDeLaLlamada = interprete.entornoActual;
        interprete.entornoActual = entornoNuevo;
    
        try {
            // Ejecuta el cuerpo(bloque) de la función
            this.nodo.cuerpo.accept(interprete);
        } catch (error) {
            interprete.entornoActual = entornoAntesDeLaLlamada; // Restaura el entorno anterior
    
            if (error instanceof ReturnException) {
                if (error.value === null && this.nodo.tipoRetorno === 'void') {
                    // Maneja el caso de funciones sin retorno 
                    return null;
                }
                if (this.nodo.tipoRetorno !== obtenerTipo(error.value)) {
                    throw new Error(`Tipo de retorno incorrecto. Se esperaba '${this.nodo.tipoRetorno}', pero se obtuvo '${obtenerTipo(error.value)}'.`);
                }
                return error.value; // Retorna el valor de la funcion
            }
    
            throw error; // Propaga otros errores no manejados
        } finally {
            interprete.entornoActual = entornoAntesDeLaLlamada; // Asegura la restauracion del entorno
        }
    
        return null; // Si no hay retorno explicito, retorna null
    }

    atar(instancia) {
        const entornoOculto = new Entorno(this.clousure);
        entornoOculto.set('this', instancia);
        return new FuncionDef(this.nodo, entornoOculto);
    }

}