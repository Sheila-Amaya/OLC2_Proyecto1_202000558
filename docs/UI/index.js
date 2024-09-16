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

let editors = {};
let currentTabId = 0;
let activeTabId = null;

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

function createNewTab(filename = 'Untitled.oak', content = '') {
    const tabContainer = document.getElementById('tabContainer');

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

    const newEditor = monaco.editor.create(document.getElementById('editor'), {
        value: content,
        language: 'java',
        theme: 'vs-dark'
    });
    editors[tabId] = newEditor;

    switchTab(tabId);
}

function switchTab(tabId) {
    Object.keys(editors).forEach(id => {
        editors[id].getDomNode().style.display = 'none';
    });
    editors[tabId].getDomNode().style.display = 'block';
    activeTabId = tabId;
}

function closeTab(tabId) {
    editors[tabId].dispose();
    delete editors[tabId];

    const tabElement = document.querySelector(`[data-tab-id="${tabId}"]`);
    tabElement.remove();

    if (activeTabId === tabId) {
        const remainingTabs = Object.keys(editors);
        if (remainingTabs.length > 0) {
            switchTab(remainingTabs[0]);
        } else {
            initializeEditor();
        }
    }
}

function createFile() {
    createNewTab();
}

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
            alert("Por favor selecciona un archivo con extensión .oak");
        }
    }
}

function saveFile() {
    if (activeTabId) {
        const activeEditor = editors[activeTabId];
        const content = activeEditor.getValue();
        const blob = new Blob([content], { type: "text/plain" });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${document.querySelector(`[data-tab-id="${activeTabId}"] span`).textContent}`;
        a.click();
    } else {
        alert("No hay ningún archivo abierto.");
    }
}

function executeCode() {
    if (activeTabId) {
        clearConsole();
        const activeEditor = editors[activeTabId];
        const codigoFuente = activeEditor.getValue();
        try {
            const sentencias = parse(codigoFuente);
            const interprete = new InterpreterVisitor();

            localStorage.removeItem('symbolTable'); // Limpiar la tabla de símbolos
            sentencias.forEach(sentencia => {
                try {
                    sentencia.accept(interprete);
                } catch (error) {
                    logToConsole(`\nError: ${error.message} at line ${error.location?.start.line} column ${error.location?.start.column}`);
                }
            });
            logToConsole(interprete.salida);

            // Guardar la tabla de símbolos en localStorage
            const symbolTable = interprete.getSymbolTable();
            localStorage.setItem('symbolTable', JSON.stringify(symbolTable));

        } catch (error) {
            logToConsole(`Error: ${error.message} at line ${error.location?.start.line} column ${error.location?.start.column}`);
        }
    } else {
        alert("No hay ningun archivo abierto para ejecutar.");
    }
}

function clearConsole() {
    const consoleElement = document.getElementById('console');
    consoleElement.innerHTML = '';
}

function generateErrorReport() {
    window.open('https://sheila-amaya.github.io/OLC2_Proyecto1_202000558/TablaErrores/reporteErrores.html', '_blank');
}

function generateSymbolTableReport() {
    window.open('https://sheila-amaya.github.io/OLC2_Proyecto1_202000558/TablaSimbolos/reporte.html', '_blank');
}

function logToConsole(message) {
    const consoleElement = document.getElementById('console');
    consoleElement.innerHTML += `${message.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;')}`;
}

window.onload = initializeEditor;

window.createFile = createFile;
window.openFile = openFile;
window.saveFile = saveFile;
window.executeCode = executeCode;
window.generateErrorReport = generateErrorReport;
window.generateSymbolTableReport = generateSymbolTableReport;
