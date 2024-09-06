let tabCount = 1;

function openFile() {
    const tabContainer = document.getElementById('tabContainer');
    const newTab = document.createElement('div');
    newTab.classList.add('tab');
    newTab.textContent = `Archivo ${tabCount}`;
    tabContainer.appendChild(newTab);
    tabCount++;
}

function executeCode() {
    const editorContent = document.getElementById('editor').textContent;
    const consoleElement = document.getElementById('console');
    consoleElement.textContent = `Ejecutando el siguiente código:\n\n${editorContent}`;
}
