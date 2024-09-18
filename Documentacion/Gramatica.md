```pegjs
<programa> ::= <espacios> <declaracion>* <espacios>

<declaracion> ::= <var_dcl> <espacios>
                | <array_dcl> <espacios>
                | <func_dcl> <espacios>
                | <stmt> <espacios>

<funcion_dcl> ::= <tipo_retorno> <espacios> <identificador> <espacios> "(" <parametros>? ")" <espacios> <bloque_stmt>

<tipo_retorno> ::= "void" | <type2>

<parametros> ::= <parametro> <espacios> ("," <espacios> <parametro>)*

<parametro> ::= <type2> <espacios> <identificador>

<var_dcl> ::= <type> <espacios> <identificador> <espacios> "=" <espacios> <expresion> ";" 
            | <type> <espacios> <identificador> ";"

<array_dcl> ::= <array_type> <espacios> <identificador> <espacios> "=" <espacios> <array_initialization> ";" 
              | <array_type> <espacios> <identificador> <espacios> "=" <espacios> "new" <espacios> <type> "[" <espacios> <num_entero> <espacios> "]" ";"
              | <array_type> <espacios> <identificador> <espacios> "=" <espacios> <identificador> ";"

<array_type> ::= <type> "[]"

<array_initialization> ::= "{" <espacios> <lista_expresiones> <espacios> "}"

<stmt> ::= <print_stmt>
         | <bloque_stmt>
         | <if_stmt>
         | <switch>
         | <while_stmt>
         | <for_stmt>
         | <for_each_stmt>
         | <break_stmt>
         | <continue_stmt>
         | <return_stmt>
         | <expresion_stmt>

<print_stmt> ::= "System.out.println(" <espacios> <lista_expresiones>? ")" <espacios> ";"

<bloque_stmt> ::= "{" <espacios> <declaracion>* <espacios> "}"

<if_stmt> ::= "if" <espacios> "(" <espacios> <expresion> <espacios> ")" <espacios> <stmt> 
            (<else_if_branch>*) 
            ("else" <espacios> <stmt>)?

<else_if_branch> ::= "else if" <espacios> "(" <espacios> <expresion> <espacios> ")" <espacios> <stmt>

<switch> ::= "switch" <espacios> "(" <espacios> <expresion> <espacios> ")" <espacios> "{" <espacios> <case>* <default>? <espacios> "}"

<case> ::= "case" <espacios> <expresion> <espacios> ":" <espacios> <declaracion>*

<default> ::= "default" <espacios> ":" <espacios> <declaracion>*

<while_stmt> ::= "while" <espacios> "(" <espacios> <expresion> <espacios> ")" <espacios> <stmt>

<for_stmt> ::= "for" <espacios> "(" <espacios> <for_init> <espacios> <expresion> <espacios> ";" <espacios> <expresion> <espacios> ")" <espacios> <stmt>

<for_init> ::= <var_dcl> | <expresion> <espacios> ";" | ";"

<for_each_stmt> ::= "for" <espacios> "(" <espacios> <type> <espacios> <identificador> <espacios> ":" <espacios> <identificador> <espacios> ")" <espacios> <stmt>

<break_stmt> ::= "break" <espacios> ";"

<continue_stmt> ::= "continue" <espacios> ";"

<return_stmt> ::= "return" <espacios> <expresion>? <espacios> ";"

<expresion_stmt> ::= <expresion> <espacios> ";"

<lista_expresiones> ::= <expresion> <espacios> ("," <espacios> <expresion>)*

<expresion> ::= <asignacion> | <operacion>

<asignacion> ::= <array_assign>
               | <identificador> <espacios> <operador_asignacion> <espacios> <asignacion>
               | <operacion>

<array_assign> ::= <identificador> <espacios> "[" <espacios> <expresion> <espacios> "]" <espacios> "=" <espacios> <expresion>

<operacion> ::= <ternario>

<ternario> ::= <logico> <espacios> "?" <espacios> <expresion> <espacios> ":" <espacios> <expresion>
            | <logico>

<logico> ::= <or>

<or> ::= <and> ( <espacios> "||" <espacios> <and>)*

<and> ::= <comparacion> ( <espacios> "&&" <espacios> <comparacion>)*

<comparacion> ::= <relacional> ( <espacios> ("==" | "!=") <espacios> <relacional>)*

<relacional> ::= <suma> ( <espacios> ("<=" | ">=" | "<" | ">") <espacios> <suma>)*

<suma> ::= <multiplicacion> ( <espacios> ("+" | "-") <espacios> <multiplicacion>)*

<multiplicacion> ::= <unaria> ( <espacios> ("*" | "/" | "%") <espacios> <unaria>)*

<unaria> ::= "!" <espacios> <unaria> 
           | "-" <espacios> <unaria>
           | <primaria>

<primaria> ::= <agrupacion>
             | <atributo_length>
             | <array_access>
             | <funciones_embebidas>
             | <llamada>
             | <literal>
             | <referencia_variable>

<array_access> ::= <identificador> <espacios> "[" <espacios> <expresion> <espacios> "]"

<agrupacion> ::= "(" <espacios> <expresion> <espacios> ")"

<atributo_length> ::= <identificador> <espacios> "." <espacios> "length"

<operador_asignacion> ::= "=" | "+=" | "-="

<llamada> ::= <numero> <espacios> ("(" <espacios> <argumentos>? <espacios> ")")*

<funciones_embebidas> ::= <parse_int> 
                        | <parse_float> 
                        | <to_string> 
                        | <to_lower_case> 
                        | <to_upper_case> 
                        | <type_of> 
                        | <index_of> 
                        | <join>

<parse_int> ::= "parseInt" <espacios> "(" <espacios> <expresion> <espacios> ")"

<parse_float> ::= "parseFloat" <espacios> "(" <espacios> <expresion> <espacios> ")"

<to_string> ::= "toString" <espacios> "(" <espacios> <expresion> <espacios> ")"

<to_lower_case> ::= "toLowerCase" <espacios> "(" <espacios> <expresion> <espacios> ")"

<to_upper_case> ::= "toUpperCase" <espacios> "(" <espacios> <expresion> <espacios> ")"

<type_of> ::= "typeof" <espacios> <expresion>

<index_of> ::= <identificador> <espacios> "." <espacios> "indexOf" <espacios> "(" <espacios> <expresion> <espacios> ")"

<join> ::= <identificador> <espacios> "." <espacios> "join" <espacios> "(" <espacios> ")"

<referencia_variable> ::= <identificador>

<argumentos> ::= <expresion> <espacios> ("," <espacios> <expresion>)*

<numero> ::= <num_decimal> 
           | <num_entero> 
           | "(" <espacios> <expresion> <espacios> ")" 
           | <identificador>

<num_entero> ::= [0-9]+

<num_decimal> ::= [0-9]+ ("." [0-9]+)

<booleano> ::= "true" | "false"

<string> ::= '"' <chars>* '"'

<chars> ::= [^"\\] | <escape_sequence>

<escape_sequence> ::= "\\" ("\"" | "\\" | "n" | "r" | "t")

<char> ::= "'" <char> "'"

<literal> ::= <booleano> 
            | <numero> 
            | <string> 
            | <char> 
            | "null"

<type> ::= "int" | "float" | "string" | "boolean" | "char" | "var"

<type2> ::= "int" | "float" | "string" | "boolean" | "char"

<identificador> ::= [a-zA-Z_][a-zA-Z0-9_]*

<espacios> ::= [ \t\n\r]*

<comentarios> ::= "//" (![\n] .)* 
                | "/*" (!("*/") .)* "*/"

```