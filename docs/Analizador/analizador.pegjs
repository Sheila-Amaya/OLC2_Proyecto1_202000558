{
  const crearNodo = (tipoNodo, props) => {
    const tipos = {
      'numero': nodos.Numero,
      'agrupacion': nodos.Agrupacion,
      'binaria': nodos.OperacionBinaria,
      'unaria': nodos.OperacionUnaria,
      'declaracionVariable': nodos.DeclaracionVariable,
      'referenciaVariable': nodos.ReferenciaVariable,
      'print': nodos.Print,
      'expresionStmt': nodos.ExpresionStmt,
      'asignacion': nodos.Asignacion,
      'bloque': nodos.Bloque,
      'if': nodos.If,
      'ElseIf': nodos.ElseIf,
      'while': nodos.While,
      'for': nodos.For,
      'break': nodos.Break,
      'continue': nodos.Continue,
      'return': nodos.Return,
      'llamada': nodos.Llamada,
      'boolean': nodos.Booleano,
      'string': nodos.String,
      'char': nodos.Char,
      'null': nodos.Null,
      'ternario': nodos.Ternario,
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
  = dcl:VarDcl _ { return dcl }
  / stmt:Stmt _  { return stmt }

// ===== Declaracion de variables =====
VarDcl 
  = tipo:Type _ id:Identificador _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { tipo, id, exp }); }
  / tipo:Type _ id:Identificador _ ";"                       { return crearNodo('declaracionVariable', { tipo, id, exp: null }); }

// ===== Sentencias =====
Stmt 
  = printStmt
  / bloqueStmt
  / IfStmt
  / whileStmt
  / forStmt
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



// ===== Sentencia While =====
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
  


// ===== Palabras reservadas =====
Reserved 
  = "true" / "false" / "int" / "float" / "string" / "boolean" / "char" / "var" / "if" / "else" / "while" / "for" 
  / "break" / "continue" / "return" / "null"

// ===== Identificadores =====
Identificador 
  = [a-zA-Z_][a-zA-Z0-9_]* !Reserved { return text(); } 

// ===== Expresiones =====
Expresion
  = Asignacion
  / FuncionesEmbebidas

// ===== Asignacion =====
Asignacion 
  = id:Identificador _ op:OperadorAsignacion _ asgn:Asignacion { return crearNodo('asignacion', { id, op, asgn }); }
  / Operacion

// ===== Operador de Asignacion =====
OperadorAsignacion 
  = "=" / "+=" / "-=" { return text(); }

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
  = left:Not tail:( _ "&&" _ right:Not { return { op: "&&", right }; })* {
      return tail.reduce((left, { op, right }) => crearNodo('binaria', { op, izq: left, der: right }), left);
    }

// ===== Operador Not =====
Not
  = "!" _ exp:Not { 
      return crearNodo('unaria', { op: '!', exp: exp }); 
    }
  / Comparacion

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
  = "-" _ exp:Unaria { return crearNodo('unaria', { op: '-', exp: exp }); }
  / Primaria

// ===== Expresiones Primarias =====
Primaria
  = Agrupacion
  / FuncionesEmbebidas
  / Literal
  / Llamada
  / ReferenciaVariable

// ===== Agrupacion de Expresiones =====
Agrupacion
  = "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }); }

// ===== Literales =====
Literal
  = Numero
  / Booleano
  / String
  / Char
  / "null" { return crearNodo('null', { tipo: 'null', valor: null }); }

// ===== Funciones Embebidas =====
FuncionesEmbebidas
  = parseInt
  / parseFloat
  / toString
  / toLowerCase
  / toUpperCase
  / typeOf

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

// ===== Tipos de datos permitidos =====
Type 
  = "int" / "float" / "string" / "boolean" / "char" / "var" {  return text(); }

// ===== Espacios en blanco y comentarios =====
_ 
  = ([ \t\n\r] / Comentarios)* 

// ===== Comentarios =====
Comentarios 
  = "//" (![\n] .)* 
  / "/*" (!("*/") .)* "*/"
