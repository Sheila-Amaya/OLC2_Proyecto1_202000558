{
  const crearNodo = (tipoNodo, props) => {
    const tipos = {
      'numero': nodos.Numero,
      'agrupacion': nodos.Agrupacion,
      'binaria': nodos.OperacionBinaria,
      'unaria': nodos.OperacionUnaria,
      'declaracionVariable': nodos.DeclaracionVariable,
      'declaracionArray': nodos.DeclaracionArray,
      'funcion': nodos.Funcion,
      'referenciaVariable': nodos.ReferenciaVariable,
      'print': nodos.Print,
      'expresionStmt': nodos.ExpresionStmt,
      'arrayAccess': nodos.ArrayAccess,
      'arrayAssign': nodos.ArrayAssign,
      'asignacion': nodos.Asignacion,
      'length': nodos.Length,
      'bloque': nodos.Bloque,
      'if': nodos.If,
      'ElseIf': nodos.ElseIf,
      'switch': nodos.Switch,
      'while': nodos.While,
      'for': nodos.For,
      'foreach': nodos.ForEach,
      'break': nodos.Break,
      'continue': nodos.Continue,
      'return': nodos.Return,
      'llamada': nodos.Llamada,
      'boolean': nodos.Booleano,
      'string': nodos.String,
      'char': nodos.Char,
      'null': nodos.Null,
      'ternario': nodos.Ternario,
      'indexOf': nodos.IndexOf,
      'join': nodos.Join,
      'parseInt': nodos.ParseInt,
      'parseFloat': nodos.ParseFloat,
      'ToString': nodos.ToString,
      'toLowerCase': nodos.ToLowerCase,
      'toUpperCase': nodos.ToUpperCase,
      'typeOf': nodos.TypeOf
    };

    const nodo = new tipos[tipoNodo](props);
    nodo.location = location();
    return nodo;
  }
}

// ===== Programa =====
programa = _ dcl:Declaracion* _ { return dcl }

// ===== Declaraciones =====
Declaracion 
  = dcl:VarDcl _          { return dcl }
  / arrayDcl:ArrayDcl _   { return arrayDcl }
  / funcDcl:FuncionDcl _  { return funcDcl }
  / stmt:Stmt _           { return stmt }

//**************************************************************************************************************************
// ===== Declaracion de Funciones =====
FuncionDcl
  = tipoRetorno:TipoRetorno _ id:Identificador _ "(" params:Parametros? ")" _ cuerpo:bloqueStmt { 
      return crearNodo('funcion', { tipoRetorno, id, params: params || [], cuerpo }); 
    }

// ===== Tipo de Retorno =====
TipoRetorno
  = "void" { return "void"; }
  / Type2 { return text(); }

// ===== Parametros de la Funcion =====
Parametros
  = primeraParam:Parametro _ siguientesParams:("," _ siguienteParam:Parametro { return siguienteParam; })* {
      return [primeraParam, ...siguientesParams];
    }

Parametro
  = tipo:Type2 _ id:Identificador { return { tipo, id }; }

//**************************************************************************************************************************

// ===== Declaracion de variables =====
VarDcl 
  = tipo:Type _ id:Identificador _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { tipo, id, exp }); }
  / tipo:Type _ id:Identificador _ ";"                       { return crearNodo('declaracionVariable', { tipo, id, exp: null }); }

// ===== Declaracion de arrays =====
ArrayDcl
  = arrayTipo:ArrayType _ id:Identificador _ "=" _ arrayInit:ArrayInitialization _ ";" { 
      return crearNodo('declaracionArray', { tipo: arrayTipo, id, arrayInit }); 
    }
  / arrayTipo:ArrayType _ id:Identificador _ "=" _ "new" _ elemTipo:Type _ "[" _ tam:Num_entero _ "]" _ ";" { 
      return crearNodo('declaracionArray', { tipo: `${elemTipo}`, id, tam }); 
    }
  / arrayTipo:ArrayType _ id:Identificador _ "=" _ copia:Identificador _ ";" { 
      return crearNodo('declaracionArray', { tipo: arrayTipo, id, copyFrom: copia }); 
    }

// ===== Tipo de Array =====
ArrayType
  = tipo:Type  "[]" { return tipo; }

// ===== Inicialización de Arrays =====
ArrayInitialization
  = "{" _ valores:ListaExpresiones _ "}" { return valores || []; }

// ===== Sentencias =====
Stmt 
  = printStmt
  / bloqueStmt
  / IfStmt  
  / Switch
  / whileStmt
  / forStmt
  / forEachStmt
  / breakStmt
  / continueStmt
  / returnStmt
  / expresionStmt

// ===== Sentencia Print =====
printStmt
  = "System.out.println(" _ listaExpresiones:ListaExpresiones? _ ")" _ ";" {
      return crearNodo('print', { listaExpresiones: listaExpresiones || [] });
    }

// ===== Sentencia Bloque =====
bloqueStmt
  = "{" _ dcls:Declaracion* _ "}" { 
      return crearNodo('bloque', { dcls }); 
    }

// ===== Sentencia If =====
// ===== If, Else If, Else =====
IfStmt
  = "if" _ "(" _ cond:Expresion _ ")" _ stmtTrue:Stmt 
    elseIfBranches:ElseIfBranch* 
    stmtFalse:(_ "else" _ stmtFalse:Stmt { return stmtFalse })? { 
      return crearNodo('if', { cond, stmtTrue, elseIfBranches, stmtFalse }); 
    }

ElseIfBranch
  = _ "else" _ "if" _ "(" _ cond:Expresion _ ")" _ stmt:Stmt { 
      return crearNodo('ElseIf', { cond, stmt });
    }

// ===== Sentencia Switch =====
Switch = "switch" _ "(" _ exp:Expresion _ ")" _ "{" _ cases:Case* defau:Default? _ "}" 
{ return crearNodo('switch', { exp, cases, defau }) }

Case = "case" _ exp:Expresion _ ":" _ stmt:Declaracion* {   
  return { exp, stmt } }

Default = "default" _ ":" _ stmt:Declaracion* { 
  return { stmt } }

// ===== Sentencia While ==== 
whileStmt
= "while" _ "(" _ cond:Expresion _ ")" _ stmt:Stmt { 
      return crearNodo('while', { cond, stmt }); 
    }

// ===== Sentencia For =====
forStmt
  = "for" _ "(" _ init:ForInit _ cond:Expresion _ ";" _ inc:Expresion _ ")" _ stmt:Stmt {
      return crearNodo('for', { init, cond, inc, stmt });
    }

// ===== Inicializacion del bucle For =====
ForInit 
  = dcl:VarDcl { return dcl }
  / exp:Expresion _ ";" { return exp }
  / ";" { return null }

// ===== Sentencia For Each =====
forEachStmt
  = "for" _ "(" _ tipo:Type _ id:Identificador _ ":" _ arr:Identificador _ ")" _ stmt:Stmt {
      return crearNodo('foreach', { tipo, id, arr, stmt });
    }

// ===== Sentencia Break =====
breakStmt
  = "break" _ ";" { 
      return crearNodo('break'); 
    }

// ===== Sentencia Continue =====
continueStmt
  = "continue" _ ";" { 
      return crearNodo('continue'); 
    }

// ===== Sentencia Return =====
returnStmt
  = "return" _ exp:Expresion? _ ";" { 
      return crearNodo('return', { exp }); 
    }

// ===== Sentencia Expresion =====
expresionStmt
  = exp:Expresion _ ";" { 
      return crearNodo('expresionStmt', { exp }); 
    }

// ===== Lista de expresiones =====
ListaExpresiones 
  = primeraExp:Expresion _ siguientesExps:("," _ siguienteExp:Expresion { return siguienteExp; })* { 
      return [primeraExp, ...siguientesExps]; 
    }

// ===== Expresiones =====
Expresion
  = Asignacion
  / Operacion

// ===== Asignacion =====
Asignacion 
  = ArrayAssign
  / id:Identificador _ op:OperadorAsignacion _ asgn:Asignacion { return crearNodo('asignacion', { id, op, asgn }); }
  / Operacion

// ===== Asignación de Array =====
ArrayAssign
  = id:Identificador _ "[" _ indice:Expresion _ "]" _ "=" _ valor:Expresion { 
      return crearNodo('arrayAssign', { id, indice, valor }); 
    }

// ===== Operaciones =====
Operacion
  = Ternario

// ===== Operador Ternario ===== 
Ternario 
  = cond:Logico _ "?" _ expTrue:Expresion _ ":" _ expFalse:Expresion { 
      return crearNodo('ternario', { cond, stmtTrue: expTrue, stmtFalse: expFalse }); 
    }
  / Logico

// ===== Operaciones Logicas =====
Logico 
  = Or

// ===== Operador Or =====
Or
  = left:And tail:( _ "||" _ right:And { return { op: "||", right }; })* {
      return tail.reduce((left, { op, right }) => crearNodo('binaria', { op, izq: left, der: right }), left);
    }

// ===== Operador And =====
And
  = left:Comparacion tail:( _ "&&" _ right:Comparacion { return { op: "&&", right }; })* {
      return tail.reduce((left, { op, right }) => crearNodo('binaria', { op, izq: left, der: right }), left);
    }

// ===== Operaciones de Comparacion =====
Comparacion 
  = left:Relacional tail:( _ op:("==" / "!=") _ right:Relacional { return { op, right }; })* {
      return tail.reduce((left, { op, right }) => crearNodo('binaria', { op, izq: left, der: right }), left);
    }

// ===== Operaciones Relacionales =====
Relacional
  = left:Suma tail:( _ op:("<=" / ">=" / "<" / ">") _ right:Suma { return { op, right }; })* {
      return tail.reduce((left, { op, right }) => crearNodo('binaria', { op, izq: left, der: right }), left);
    }

// ===== Operaciones de Suma y Resta =====
Suma 
  = izq:Multiplicacion expansion:(_ op:("+" / "-") _ der:Multiplicacion { return { tipo: op, der }; })* { 
      return expansion.reduce(
        (operacionAnterior, operacionActual) => {
          const { tipo, der } = operacionActual;
          return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der });
        },
        izq
      );
    }

// ===== Operaciones de Multiplicacion, Division y Modulo =====
Multiplicacion 
  = izq:Unaria expansion:(_ op:("*" / "/" / "%") _ der:Unaria { return { tipo: op, der }; })* {
      return expansion.reduce(
        (operacionAnterior, operacionActual) => {
          const { tipo, der } = operacionActual;
          return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der });
        },
        izq
      );
    }

// ===== Negacion Unaria =====
Unaria 
  = "!" _ exp:Unaria { return crearNodo('unaria', { op: '!', exp: exp }); }
  / "-" _ exp:Unaria { return crearNodo('unaria', { op: '-', exp: exp }); }
  / Primaria

// ===== Expresiones Primarias =====
Primaria
  = Agrupacion
  / AtributoLength
  / ArrayAccess
  / FuncionesEmbebidas
  / Llamada
  / Literal
  / ReferenciaVariable

// ===== Acceso a Elementos de Arrays =====
ArrayAccess
  = id:Identificador _ "[" _ indice:Expresion _ "]" { 
      return crearNodo('arrayAccess', { id, indice }); 
    }

// ===== Agrupacion de Expresiones =====
Agrupacion
  = "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }); }

// ===== Acceso a Atributo Length =====
AtributoLength
  = id:Identificador _ "." _ "length" {
      return crearNodo('length', { array: id });
    }

// ===== Operador de Asignacion =====
OperadorAsignacion 
  = "=" / "+=" / "-=" { return text(); }

// ===== Llamadas a funciones =====
Llamada 
  = callee:Numero _ params:("(" args:Argumentos? ")" { return args })* {
      return params.reduce(
        (callee, args) => {
          return crearNodo('llamada', { callee, args: args || [] });
        },
        callee
      );
    }

// ===== Funciones Embebidas =====
FuncionesEmbebidas
  = parseInt
  / parseFloat
  / toString
  / toLowerCase
  / toUpperCase
  / typeOf
  / indexOf
  / join

// ===== Funcion indexOf =====
indexOf
  = id:Identificador _ "." _ "indexOf" _ "(" _ argumento:Expresion _ ")" {
      return crearNodo('indexOf', { array: id, argumento });
  }

// ===== Funcion join =====
join
  = id:Identificador _ "." _ "join" _ "(" _ ")" {
      return crearNodo('join', { array: id });
    }


// ===== Funciones Embebidas =====
parseInt
  = "parseInt" _ "(" _ exp:Expresion _ ")" {
      return crearNodo('parseInt', { exp });
    }


parseFloat
  = "parsefloat" _ "(" _ exp:Expresion _ ")" {
      return crearNodo('parseFloat', { exp });
    }

toString
  = "toString" _ "(" _ exp:Expresion _ ")" {
      return crearNodo('ToString', { exp });
    }

toLowerCase
  = "toLowerCase" _ "(" _ exp:Expresion _ ")" {
      return crearNodo('toLowerCase', { exp });
    }

toUpperCase
  = "toUpperCase" _ "(" _ exp:Expresion _ ")" {
      return crearNodo('toUpperCase', { exp });
    }

typeOf 
  = "typeof"  _ exp:Expresion _  {
      return crearNodo('typeOf', { exp });
    }

// ===== Referencia a Variables =====
ReferenciaVariable
  = id:Identificador { return crearNodo('referenciaVariable', { id }); }

// ===== Argumentos de llamadas =====
Argumentos 
  = arg:Expresion _ args:("," _ exp:Expresion { return exp; })* { 
      return [arg, ...args]; 
    }

// ===== Numeros, agrupaciones y referencias a variables =====
Numero 
  = Num_decimal 
  / Num_entero
  / "(" _ exp:Expresion _ ")" {  return crearNodo('agrupacion', { exp });  }
  / id:Identificador          {  return crearNodo('referenciaVariable', { id }); }

// ===== Numeros enteros =====
Num_entero 
  = [0-9]+ { return crearNodo('numero', { tipo: 'int', valor: parseInt(text(), 10) }); }

// ===== Numeros decimales =====
Num_decimal 
  = [0-9]+ ("." [0-9]+) { return crearNodo('numero', { tipo: 'float', valor: parseFloat(text()) });  }

// ===== Literales Booleanos =====
Booleano
  = "true"  { return crearNodo('boolean', { tipo: 'boolean', valor: true }); }
  / "false" { return crearNodo('boolean', { tipo: 'boolean', valor: false }); }

// ===== Literales String =====
String
  = '"' chars:(([^"\\] / EscapeSequence)*) '"' { 
      return crearNodo('string', { tipo: 'string', valor: chars.join("") }); 
    }

EscapeSequence
  = "\\" ch:("\"" / "\\" / "n" / "r" / "t") { 
      switch(ch) {
          case '"': return '"';
          case '\\': return '\\';
          case 'n': return '\n';
          case 'r': return '\r';
          case 't': return '\t';
      }
    }

// ===== Literales Char =====
Char
  = "'" char:. "'" { return crearNodo('char', { tipo: 'char', valor: char }); }

// ===== Literales Null =====
Literal
  = Booleano
  / Numero
  / String
  / Char
  / "null" { return crearNodo('null', { tipo: 'null', valor: null }); }

// ===== Tipos de datos permitidos =====
Type 
  = "int" / "float" / "string" / "boolean" / "char" / "var" {  return text(); }

// ===== Tipos de datos permitidos para funciones =====
Type2 
  = "int" / "float" / "string" / "boolean" / "char" { return text(); }

// ===== Palabras reservadas =====
Reserved 
  = "true" / "false" / "int" / "float" / "string" / "boolean" / "char" / "var" / "if" / "else" / "while" / "for" 
  / "break" / "continue" / "return" / "null"

// ===== Identificadores =====
Identificador 
  = [a-zA-Z_][a-zA-Z0-9_]* !Reserved { return text(); } 

// ===== Espacios en blanco y comentarios =====
_ 
  = ([ \t\n\r] / Comentarios)* 

// ===== Comentarios =====
Comentarios 
  = "//" (![\n] .)* 
  / "/*" (!("*/") .)* "*/"
