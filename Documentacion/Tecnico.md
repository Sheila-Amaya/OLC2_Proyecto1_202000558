
<h1 align="center">Proyecto 01</h1>

<div align="center">
📕 Organizacion de Lenguajes y computadoras 2
</div>
<div align="center"> 🏛 Universidad San Carlos de Guatemala</div>
<div align="center"> 📆 Segundo Semestre 2024</div>

### MANUAL TECNICO
Este manual técnico describe la implementación del intérprete para el lenguaje de programación OakLand, desarrollado utilizando JavaScript y desplegado en GitHub Pages. OakLand es un lenguaje inspirado en Java.

## Requisitos del Proyecto
- **Lenguaje:** JavaScript (vanilla).
- **Entorno de Despliegue:** GitHub Pages.
- **Herramientas:** PeggyJS para la generación de analizadores léxicos y sintácticos.
- **Componentes Principales:** Editor de código, consola de salida, reportes de errores y tabla de símbolos.

## Componentes del Sistema

### 1. Editor de Código
- **Funcionalidades:** Crear, abrir y guardar archivos con extensión `.oak`.
- **Implementación:** Utiliza un editor de texto integrado en la interfaz gráfica del usuario.
- **Operaciones:** Permite múltiples pestañas para trabajar con varios archivos simultáneamente.

### 2. Consola
- **Propósito:** Mostrar notificaciones, errores, advertencias y resultados de la interpretación del código.
- **Interfaz:** Área dedicada en la GUI que muestra las salidas generadas durante la ejecución.

### 3. Reportes
- **Reporte de Errores:** Muestra los errores léxicos, sintácticos y semánticos con su ubicación y descripción.
- **Tabla de Símbolos:** Detalla todas las variables, métodos y funciones declarados, junto con su tipo y ámbito.

## Implementación Técnica

### 1. Estructura del Proyecto
- **Directorios Principales:**
  - `UI/`: Contiene los módulos para la interfaz de usuario, incluyendo `index.js`.
  - `Entorno/`: Gestión de variables y tipos durante la ejecución.
  - `Expression/`: Manejo de expresiones y operaciones en el lenguaje.
  - `Interprete/`: Implementación del intérprete que evalúa y ejecuta el código fuente.
  - `Util/`: Funciones utilitarias, como `obtenerTipo`.


### 2. Analizadores 
- **Herramienta:** PeggyJS.
- **Descripción:** Se definió una gramática específica para OakLand que permite analizar y ejecutar expresiones, declaraciones y estructuras de control según las reglas del lenguaje.

### 3. Clases Principales
- **Asignacion:** Maneja asignaciones de valores a variables, incluyendo conversiones implícitas entre tipos numéricos.
- **Comparaciones:** Implementa operaciones de comparación como igualdad (`==`), desigualdad (`!=`), y relacionales (`<`, `>`, `<=`, `>=`).
- **Relacionales:** Realiza comparaciones relacionales específicas, considerando tipos compatibles y manejando errores en caso de incompatibilidad.
- **Invocable:** Clase base para elementos invocables dentro del intérprete (funciones).
- **Expresion:** Clase base para todas las expresiones del lenguaje, con subclases como `OperacionBinaria`, `OperacionUnaria`, `Numero`, `Booleano`, etc.

### 4. Manejo de Excepciones
- **BreakException:** Controla la sentencia `break` dentro de ciclos y estructuras `switch`.
- **ContinueException:** Controla la sentencia `continue` dentro de ciclos.
- **ReturnException:** Maneja la terminación de funciones y retorno de valores.

## Flujo de Ejecución
1. **Inicio:** Cargar o crear un archivo `.oak`.
2. **Interpretación:** El código fuente es analizado y ejecutado utilizando PeggyJS.
3. **Generación de Reportes:** Se generan reportes de errores y tabla de símbolos durante la ejecución.
4. **Salida:** Los resultados y mensajes se muestran en la consola de la aplicación.

## Despliegue en GitHub Pages
El proyecto está desplegado en GitHub Pages, garantizando que todos los componentes sean archivos estáticos y ejecutables en el navegador sin dependencia de servidores externos o entornos de ejecución como Node.js.


## Referencias
- **PeggyJS Documentation:** [https://peggyjs.org/](https://peggyjs.org/)
- **GitHub Pages:** [https://docs.github.com/es/pages](https://docs.github.com/es/pages)

---