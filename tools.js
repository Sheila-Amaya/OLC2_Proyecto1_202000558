/**
 * DISCLAIMER:
 * Este código fue desarrollado con fines puramente didácticos.
 * Su objetivo principal es demostrar la implementación del patrón de diseño Visitor 
 * utilizando peggy.js como generador de analizadores y agregando anotaciones JSDoc 
 * para mejorar la comprensión y la documentación del código.
 * 
 * La estructura y los conceptos presentados en este archivo tienen la intención de 
 * facilitar el aprendizaje y la enseñanza de patrones de diseño y documentación en 
 * JavaScript. No se recomienda su uso en entornos de producción.
 * 
 * @autor: 
 * 
 */


// import fs from 'fs';
const fs = require('fs')

const types = [
    `
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
    `
]

const configuracionNodos = [
    // Configuracion del nodo inicial
    {
        name: 'Expresion',
        base: true,
        props: [
            {
                name: 'location',
                type: 'Location|null',
                description: 'Ubicacion del nodo en el codigo fuente',
                default: 'null'
            }
        ]
    },
    // Configuracion de los nodos secundarios
    {
        name: 'OperacionBinaria',
        extends: 'Expresion',
        props: [
            {
                name: 'izq',
                type: 'Expresion',
                description: 'Expresion izquierda de la operacion'
            },
            {
                name: 'der',
                type: 'Expresion',
                description: 'Expresion derecha de la operacion'
            },
            {
                name: 'op',
                type: 'string',
                description: 'Operador de la operacion'
            }
        ]
    },
    {
        name: 'OperacionUnaria',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion de la operacion'
            },
            {
                name: 'op',
                type: 'string',
                description: 'Operador de la operacion'
            }
        ]
    },
    {
        name: 'Agrupacion',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion agrupada'
            }
        ]
    },
    {
        name: 'Numero',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'string',
                description: 'Tipo del numero'
            },
            {
                name: 'valor',
                type: 'number',
                description: 'Valor del numero'
            }

        ]
    },
    // booleano
    {
        name: 'Booleano',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'string',
                description: 'Tipo del booleano'
            },
            {
                name: 'valor',
                type: 'boolean',
                description: 'Valor del booleano'
            }
        ]
    },
    // Cadena
    {   name: 'String',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'string',
                description: 'Tipo de la cadena'
            },
            {
                name: 'valor',
                type: 'string',
                description: 'Valor de la cadena'
            }
        ]
    },
    // char
    {
        name: 'Char',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'string',
                description: 'Tipo del char'
            },
            {
                name: 'valor',
                type: 'string',
                description: 'Valor del char'
            }
        ]
    },
    // null 
    {
        name: 'Null',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'string',
                description: 'Tipo del null'
            },
            {
                name: 'valor',
                type: 'null',
                description: 'Valor del null'
            }
        ]
    },
    //     DeclaracionVariable
    {
        name: 'DeclaracionVariable',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'string',
                description: 'Tipo de la variable'
            },
            {
                name: 'id',
                type: 'string',
                description: 'Identificador de la variable'
            },
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion de la variable'
            }
        ]
    },
    //     DeclaracionArray
    {
        name: 'DeclaracionArray',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'string',
                description: 'Tipo del array'
            },
            {
                name: 'id',
                type: 'string',
                description: 'Identificador del array'
            },
            {
                name: 'arrayInit',
                type: 'Expresion[]|null',
                description: 'Expresion del array',
                default: null
            },
            {
                name: 'tam',
                type: 'number|null',
                description: 'Tamano del array especifico',
                default: null
            },
            {
                name: 'copyFrom',
                type: 'string|null',
                description: 'Identificador del array a copiar',
                default: null
            }
        ]
    },
    // Funcion
    {
        name: 'Funcion',
        extends: 'Expresion',
        props: [
            {
                name: 'tipoRetorno',
                type: 'string',
                description: 'Tipo de retorno de la funcion'
            },
            {
                name: 'id',
                type: 'string',
                description: 'Identificador de la funcion'
            },
            {
                name: 'params',
                type: 'string[]',
                description: 'Parametros de la funcion'
            },
            {
                name: 'cuerpo',
                type: 'Bloque',
                description: 'Cuerpo de la funcion'
            }
        ]
    },
    // struct declaracion
    {
        name: 'Struct',
        extends: 'Expresion',
        props: [
            {
                name: 'id',
                type: 'string',
                description: 'Identificador del struct'
            },
            {
                name: 'atributos',
                type: 'Array<{tipo: string, nombre: string}>',
                description: 'lista de atributos del struct'
            }
        ]
    },
    // struct instancia
    {
        name: 'InstanciaStruct',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'string',
                description: 'Tipo de la instancia del struct'
            },
            {
                name: 'nombreStruct',
                type: 'string',
                description: 'Identificador del struct'
            },
            {
                name: 'idStruct',
                type: 'string',
                description: 'Identificador de la instancia del struct'
            },
            {
                name: 'campos',
                type: 'Array<{nombre: string, valor: Expresion}>',
                description: 'lista de campos del struct'
            }
        ]
    },
    // acceso struct
    {
        name: 'AccesoAtributo',
        extends: 'Expresion',
        props: [
            {
                name: 'instanciaStr',
                type: 'string',
                description: 'Identificador de la instancia del struct'
            },
            {
                name: 'atributo',
                type: 'string',
                description: 'Atributo a acceder'
            }
        ]
    },
    //    asignacion struct
    {
        name: 'AsignacionAtributo',
        extends: 'Expresion',
        props: [
            {
                name: 'instanciaStr',
                type: 'string',
                description: 'Identificador de la instancia del struct'
            },
            {
                name: 'atributo',
                type: 'string',
                description: 'Atributo a acceder'
            },
            {
                name: 'valor',
                type: 'Expresion',
                description: 'Valor a asignar'
            }
        ]
    },
    // ReferenciaVariable
    {
        name: 'ReferenciaVariable',
        extends: 'Expresion',
        props: [
            {
                name: 'id',
                type: 'string',
                description: 'Identificador de la variable'
            }
        ]
    },
    // Print
    {
        name: 'Print',
        extends: 'Expresion',
        props: [
            {
                name: 'listaExpresiones',
                type: 'Expresion[]',
                description: 'Expresiones a imprimir'
            }
        ]
    },
    // ExpresionStmt 1+2;
    {
        name: 'ExpresionStmt',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion a evaluar'
            }
        ]
    },
    // array acceso
    {
        name: 'ArrayAssign',
        extends: 'Expresion',
        props: [
            {
                name: 'id',
                type: 'string',
                description: 'Identificador del array'
            },
            {
                name: 'indice',
                type: 'Expresion',
                description: 'Índice del array'
            },
            {
                name: 'valor',
                type: 'Expresion',
                description: 'Valor a asignar'
            }
        ]
    },
    {
        name: 'ArrayAccess',
        extends: 'Expresion',
        props: [
            {
                name: 'id',
                type: 'string',
                description: 'Identificador del array'
            },
            {
                name: 'indice',
                type: 'Expresion',
                description: 'Índice del array'
            }
        ]
    },
    {
        name: 'Length',
        extends: 'Expresion',
        props: [
            {
                name: 'array',
                type: 'string',
                description: 'Identificador del array del cual se obtiene la longitud'
            }
        ]
    },
    // Asignacion
    {
        name: 'Asignacion',
        extends: 'Expresion',
        props: [
            {
                name: 'id',
                type: 'string',
                description: 'Identificador de la variable'
            },
            {
                name: 'op',
                type: 'string',
                description: 'Operador de la asignacion'
            },
            {
                name: 'asgn',
                type: 'Expresion',
                description: 'Expresion a asignar'
            }
        ]
    },
    // Ternario
    {
        name: 'Ternario',
        extends: 'Expresion',
        props: [
            {
                name: 'cond',
                type: 'Expresion',
                description: 'Condicion del ternario'
            },
            {
                name: 'stmtTrue',
                type: 'Expresion',
                description: 'Cuerpo del verdadero'
            },
            {
                name: 'stmtFalse',
                type: 'Expresion',
                description: 'Cuerpo del falso'
            }
        ]
    },
    //parseInt
    {
        name: 'ParseInt',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion a parsear'
            }
        ]
    },
    //parseFloat
    {
        name: 'ParseFloat',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion a parsear'
            }
        ]
    },
    //toString
    {
        name: 'ToString',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion a convertir'
            }
        ]
    },
    //tolowercase
    {
        name: 'ToLowerCase',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion a convertir'
            }
        ]
    },
    //toupperCase
    {
        name: 'ToUpperCase',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion a convertir'
            }
        ]
    },
    //typeof
    {
        name: 'TypeOf',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion a evaluar'
            }
        ]
    },
    {
        name: 'IndexOf',
        extends: 'Expresion',
        props: [
            {
                name: 'array',
                type: 'Expresion',
                description: 'id del array en el que se busca la coincidencia'
            },
            {
                name: 'argumento',
                type: 'Expresion',
                description: 'Expresión a buscar dentro del array'
            }
        ]
    },
    {
        name: 'Join',
        extends: 'Expresion',
        props: [
            {
                name: 'array',
                type: 'string',
                description: 'Identificador del array a unir'
            }
        ]
    },
    // Bloque
    {
        name: 'Bloque',
        extends: 'Expresion',
        props: [
            {
                name: 'dcls',
                type: 'Expresion[]',
                description: 'Sentencias del bloque'
            }
        ]
    },
    {
        name: 'If',
        extends: 'Expresion',
        props: [
            {
                name: 'cond',
                type: 'Expresion',
                description: 'Condicion del if'
            },
            {
                name: 'stmtTrue',
                type: 'Expresion',
                description: 'Cuerpo del if'
            },
            {
                name: 'elseIfBranches',
                type: 'Expresion[]',
                description: 'Ramas del else if'
            },
            {
                name: 'stmtFalse',
                type: 'Expresion|undefined',
                description: 'Cuerpo del else'
            }
        ]
    },
    //else if
    {
        name: 'ElseIf',
        extends: 'Expresion',
        props: [
            {
                name: 'cond',
                type: 'Expresion',
                description: 'Condicion del else if'
            },
            {
                name: 'stmt',
                type: 'Expresion',
                description: 'Cuerpo del else if'
            }
        ]
    },
    // Switch
    {
        name: 'Switch',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Expresion a evaluar'
            },
            {
                name: 'cases',
                type: 'Array<{exp: Expresion, stmt: Expresion[]}>',
                description: 'Casos del switch'
            },
            {
                name: 'defau',
                type: 'stmt: Expresion[]|undefined',
                description: 'Caso por defecto'
            }

        ]
    },
    // While
    {
        name: 'While',
        extends: 'Expresion',
        props: [
            {
                name: 'cond',
                type: 'Expresion',
                description: 'Condicion del while'
            },
            {
                name: 'stmt',
                type: 'Expresion',
                description: 'Cuerpo del while'
            }
        ]
    },
    //       return crearNodo('for', { init, cond, inc, stmt })
    {
        name: 'For',
        extends: 'Expresion',
        props: [
            {
                name: 'init',
                type: 'Expresion',
                description: 'Inicializacion del for'
            },
            {
                name: 'cond',
                type: 'Expresion',
                description: 'Condicion del for'
            },
            {
                name: 'inc',
                type: 'Expresion',
                description: 'Incremento del for'
            },
            {
                name: 'stmt',
                type: 'Expresion',
                description: 'Cuerpo del for'
            }
        ]
    },
    // foreach
    {
        name: 'ForEach',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'string',
                description: 'Tipo de la variable de iteración'
            },
            {
                name: 'id',
                type: 'string',
                description: 'Identificador de la variable de iteración'
            },
            {
                name: 'arr',
                type: 'string',
                description: 'Identificador del array a iterar'
            },
            {
                name: 'stmt',
                type: 'Expresion',
                description: 'Cuerpo del foreach'
            }
        ]
    },
    // / "break" _ ";" { return crearNodo('break') }
    {
        name: 'Break',
        extends: 'Expresion',
        props: []
    },
    // / "continue" _ ";" { return crearNodo('continue') }
    {
        name: 'Continue',
        extends: 'Expresion',
        props: []
    },
    // / "return" _ exp:Expresion? _ ";" { return crearNodo('return', { exp }) }
    {
        name: 'Return',
        extends: 'Expresion',
        props: [
            {
                name: 'exp',
                type: 'Expresion|undefined',
                description: 'Expresion a retornar'
            }
        ]
    },
    // return crearNodo('llamada', { calle, args })
    {
        name: 'Llamada',
        extends: 'Expresion',
        props: [
            {
                name: 'callee',
                type: 'Expresion',
                description: 'Expresion a llamar'
            },
            {
                name: 'args',
                type: 'Expresion[]',
                description: 'Argumentos de la llamada'
            }
        ]
    }

]

let code = ''

// Tipos base
types.forEach(type => {
    code += type + '\n'
})


// // Tipos de nodos
// configuracionNodos.forEach(nodo => {
//     code += `
// /**
//  * @typedef {Object} ${nodo.name}
//  * ${nodo.props.map(prop => `@property {${prop.type}} ${prop.name} ${prop.description}`).join('\n * ')}
// */
//     `
// })

// Tipos del visitor
code += `
/**
 * @typedef {import('./docs/Interprete/visitor.js').BaseVisitor} BaseVisitor
 */
`

const baseClass = configuracionNodos.find(nodo => nodo.base)

configuracionNodos.forEach(nodo => {


    code += `
export class ${nodo.name} ${baseClass && nodo.extends ? `extends ${nodo.extends}` : ''} {

    /**
    * @param {Object} options
    * ${nodo.props.map(prop => `@param {${prop.type}} options.${prop.name} ${prop.description}`).join('\n * ')}
    */
    constructor(${!nodo.base && nodo.props.length > 0 && `{ ${nodo.props.map(prop => `${prop.name}`).join(', ')} }` || ''}) {
        ${baseClass && nodo.extends ? `super();` : ''}
        ${nodo.props.map(prop => `
        /**
         * ${prop.description}
         * @type {${prop.type}}
        */
        this.${prop.name} = ${prop.default || `${prop.name}`};
`).join('\n')}
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visit${nodo.name}(this);
    }
}
    `
})

code += `
export default { ${configuracionNodos.map(nodo => nodo.name).join(', ')} }
`


fs.writeFileSync('./docs/Interprete/nodos.js', code)
console.log('Archivo de clases de nodo generado correctamente')


// Visitor
// @typedef {import('./nodos').Expresion} Expresion
code = `
/**
${configuracionNodos.map(nodo => `
 * @typedef {import('./docs/Interprete/nodos.js').${nodo.name}} ${nodo.name}
`).join('\n')}
 */
`

code += `

/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    ${configuracionNodos.map(nodo => `
    /**
     * @param {${nodo.name}} node
     * @returns {any}
     */
    visit${nodo.name}(node) {
        throw new Error('Metodo visit${nodo.name} no implementado');
    }
    `).join('\n')
    }
}
`

fs.writeFileSync('./docs/Interprete/visitor.js', code)
console.log('Archivo de visitor generado correctamente')