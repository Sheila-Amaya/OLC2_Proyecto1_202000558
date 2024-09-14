import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/+esm';
import { parse } from '../Analizador/analizador.js';
import { InterpreterVisitor } from '../Interprete/interprete.js';

window.MonacoEnvironment = {
    getWorkerUrl: function(workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
            self.MonacoEnvironment = { baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/' };
            importScripts('https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs/base/worker/workerMain.js');
        `)}`;
    }
};

let editors = {}; // Para almacenar multiples editores
let currentTabId = 0;
let activeTabId = null;

// Crear un editor vacio al cargar la página
function initializeEditor() {
    const editorContainer = document.getElementById('editor');
    const defaultEditor = monaco.editor.create(editorContainer, {
        value: '',
        language: 'java',
        theme: 'vs-dark'
    });
    activeTabId = 'default';
    editors[activeTabId] = defaultEditor;
}

// Crear una nueva pestaña y un nuevo editor
function createNewTab(filename = 'Untitled.oak', content = '') {
    const tabContainer = document.getElementById('tabContainer');

    // Crear un nuevo tab y asignar un ID
    const tabId = `tab-${currentTabId}`;
    currentTabId++;
    const newTab = document.createElement('div');
    newTab.classList.add('tab');
    newTab.setAttribute('data-tab-id', tabId);

    const tabLabel = document.createElement('span');
    tabLabel.textContent = filename;
    tabLabel.onclick = () => switchTab(tabId);
    newTab.appendChild(tabLabel);

    const closeButton = document.createElement('button');
    closeButton.textContent = '✘';
    closeButton.classList.add('close-button');
    closeButton.onclick = (e) => {
        e.stopPropagation();
        closeTab(tabId);
    };
    newTab.appendChild(closeButton);

    tabContainer.appendChild(newTab);

    // Crear un nuevo editor para la pestaña
    const newEditor = monaco.editor.create(document.getElementById('editor'), {
        value: content,
        language: 'java',
        theme: 'vs-dark'
    });
    editors[tabId] = newEditor;

    // Cambiar a la nueva pestaña
    switchTab(tabId);
}

// Cambiar entre pestañas
function switchTab(tabId) {
    Object.keys(editors).forEach(id => {
        editors[id].getDomNode().style.display = 'none'; // Ocultar todos los editores
    });
    editors[tabId].getDomNode().style.display = 'block'; // Mostrar el editor seleccionado
    activeTabId = tabId;
}

// Cerrar una pestaña
function closeTab(tabId) {
    // Eliminar el editor correspondiente
    editors[tabId].dispose();
    delete editors[tabId];

    // Eliminar la pestaña
    const tabElement = document.querySelector(`[data-tab-id="${tabId}"]`);
    tabElement.remove();

    // Si la pestaña cerrada era la activa, seleccionar otra
    if (activeTabId === tabId) {
        const remainingTabs = Object.keys(editors);
        if (remainingTabs.length > 0) {
            switchTab(remainingTabs[0]);
        } else {
            // Si no hay pestañas restantes, inicializar el editor vacío
            initializeEditor();
        }
    }
}

// Funcionalidad para crear un nuevo archivo
function createFile() {
    createNewTab();
}

// Funcionalidad para abrir archivos .oak
function openFile(event) {
    const files = event.target.files;
    for (const file of files) {
        if (file.name.endsWith('.oak')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                createNewTab(file.name, e.target.result);
            };
            reader.readAsText(file);
        } else {
            alert("Por favor selecciona un archivo con extension .oak");
        }
    }
}

// Funcionalidad para guardar el archivo actual
function saveFile() {
    if (activeTabId) {
        const activeEditor = editors[activeTabId]; // Obtener el editor activo
        const content = activeEditor.getValue();
        const blob = new Blob([content], { type: "text/plain" });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${document.querySelector(`[data-tab-id="${activeTabId}"] span`).textContent}`; // Usar el nombre de la pestaña
        a.click();
    } else {
        alert("No hay ningún archivo abierto.");
    }
}

// Funcionalidad para ejecutar el código fuente
function executeCode() {
    if (activeTabId) {
        clearConsole(); // Limpiar la consola antes de ejecutar
        const activeEditor = editors[activeTabId]; // Obtener el editor activo
        const codigoFuente = activeEditor.getValue();
        try {
            const sentencias = parse(codigoFuente);
            console.log(sentencias);
            const interprete = new InterpreterVisitor();
            sentencias.forEach(sentencia => {
                try {
                    sentencia.accept(interprete);
                } catch (error) {
                    logToConsole(`\nError: ${error.message} at line ${error.location?.start.line} column ${error.location?.start.column}`);
                }
            });
            logToConsole(interprete.salida);
        } catch (error) {
            logToConsole(`Error: ${error.message} at line ${error.location?.start.line} column ${error.location?.start.column}`);
        }
    } else {
        alert("No hay ningún archivo abierto para ejecutar.");
    }
}


// Funcionalidad para limpiar la consola
function clearConsole() {
    const consoleElement = document.getElementById('console');
    consoleElement.innerHTML = '';
}

// Funcionalidad para generar reporte de errores
function generateErrorReport() {
    // Lógica para generar el reporte de errores
}

// Funcionalidad para generar reporte de tabla de símbolos
function generateSymbolTableReport() {
    // Lógica para generar el reporte de la tabla de símbolos
}

// Funcionalidad para logear mensajes a la consola
function logToConsole(message) {
    const consoleElement = document.getElementById('console');
    consoleElement.innerHTML += `${message.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;')}`;
}

// Inicializar el editor vacío al cargar la página
window.onload = initializeEditor;

// Exportar las funciones globalmente
window.createFile = createFile;
window.openFile = openFile;
window.saveFile = saveFile;
window.executeCode = executeCode;
window.generateErrorReport = generateErrorReport;
window.generateSymbolTableReport = generateSymbolTableReport;
