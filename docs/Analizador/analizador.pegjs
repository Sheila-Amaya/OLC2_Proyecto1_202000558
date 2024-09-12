
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
      'while': nodos.While,
      'for': nodos.For,
      'break': nodos.Break,
      'continue': nodos.Continue,
      'return': nodos.Return,
      'llamada': nodos.Llamada,
      'bool': nodos.Booleano,
      'string': nodos.String,
      'char': nodos.Char,
      'null': nodos.Null
    };

    const nodo = new tipos[tipoNodo](props);
    nodo.location = location();
    return nodo;
  }
}


// ===== Programa principal =====
programa = _ dcl:Declaracion* _ { return dcl }

// ===== Declaraciones =====
Declaracion 
  = dcl:VarDcl _ { return dcl }
  / stmt:Stmt _  { return stmt }

// ===== Declaración de variables =====
VarDcl 
  = tipo:Type _ id:Identificador _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { tipo, id, exp }); }
  / tipo:Type _ id:Identificador _ ";"                       { return crearNodo('declaracionVariable', { tipo, id, exp: null }); }

// ===== Sentencias =====
Stmt 
  = "System.out.println(" _ exp:Expresion _ ")" _ ";" { 
      return crearNodo('print', { exp }); 
    }
  / "{" _ dcls:Declaracion* _ "}" { 
      return crearNodo('bloque', { dcls }); 
    }
  / "if" _ "(" _ cond:Expresion _ ")" _ stmtTrue:Stmt 
    stmtFalse:(_ "else" _ stmtFalse:Stmt { return stmtFalse })? { 
      return crearNodo('if', { cond, stmtTrue, stmtFalse }); 
    }
  / "while" _ "(" _ cond:Expresion _ ")" _ stmt:Stmt { 
      return crearNodo('while', { cond, stmt }); 
    }
  / "for" _ "(" _ init:ForInit _ cond:Expresion _ ";" _ inc:Expresion _ ")" _ stmt:Stmt {
      return crearNodo('for', { init, cond, inc, stmt });
    }
  / "break" _ ";" { 
      return crearNodo('break'); 
    }
  / "continue" _ ";" { 
      return crearNodo('continue'); 
    }
  / "return" _ exp:Expresion? _ ";" { 
      return crearNodo('return', { exp }); 
    }
  / exp:Expresion _ ";" { 
      return crearNodo('expresionStmt', { exp }); 
    }

// ===== Inicialización del bucle For =====
ForInit 
  = dcl:VarDcl { return dcl }
  / exp:Expresion _ ";" { return exp }
  / ";" { return null }

// ===== Palabras reservadas =====
Reserved 
  = "true" / "false" /"int" / "float" / "string" / "bool" / "char" / "var" / "if" / "else" / "while" / "for" 
  / "break" / "continue" / "return" / "null"

// ===== Identificadores validos ===== 
Identificador 
  = [a-zA-Z_][a-zA-Z0-9_]* !Reserved { return text(); } 

// ===== Expresiones =====
Expresion 
  = Asignacion

// ===== Asignacion =====
Asignacion 
  = id:Identificador _ op:OperadorAsignacion _ asgn:Asignacion { return crearNodo('asignacion', { id, op, asgn }); }
  / Comparacion

// ===== Op. de asignacion =====
OperadorAsignacion 
  = "=" / "+=" / "-=" { return text(); }

// ===== Comparaciones =====
Comparacion 
  = izq:Suma expansion:(_ op:("<=" / "==") _ der:Suma { return { tipo: op, der }; })* { 
      return expansion.reduce(
        (operacionAnterior, operacionActual) => {
          const { tipo, der } = operacionActual;
          return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der });
        },
        izq
      );
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

// ===== negacion Unaria  =====
Unaria 
  = "-" _ exp:Unaria { 
      return crearNodo('unaria', { op: '-', exp: exp }); 
    }
  / Literal
  / Llamada

// ===== Literales =====
Literal
  = Numero
  / Booleano
  / String
  / Char
  / "null" { return crearNodo('null', { tipo: 'null', valor: null }); }

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

// ===== Argumentos de llamadas =====
Argumentos 
  = arg:Expresion _ args:("," _ exp:Expresion { return exp; })* { 
      return [arg, ...args]; 
    }

// ===== Números, agrupaciones y referencias a variables =====
Numero 
  = Num_decimal 
  / Num_entero
  / "(" _ exp:Expresion _ ")" {  return crearNodo('agrupacion', { exp });  }
  / id:Identificador          {  return crearNodo('referenciaVariable', { id }); }

// ===== Números enteros =====
Num_entero 
  = [0-9]+ { return crearNodo('numero', { tipo: 'int', valor: parseInt(text(), 10) }); }

// ===== Números decimales =====
Num_decimal 
  = [0-9]+ ("." [0-9]+) { return crearNodo('numero', { tipo: 'float', valor: parseFloat(text()) });  }

// ===== Literales Booleanos =====
Booleano
  = "true"  { return crearNodo('bool', { tipo: 'bool', valor: true }); }
  / "false" { return crearNodo('bool', { tipo: 'bool', valor: false }); }


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
  = "int" / "float" / "string" / "bool" / "char"/ "var" {  return text();  }

// ===== Espacios en blanco y comentarios =====
_ 
  = ([ \t\n\r] / Comentarios)* 

// ===== Comentarios =====
Comentarios 
  = "//" (![\n] .)* 
  / "/*" (!("*/") .)* "*/"
