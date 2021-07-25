import { constants } from './js/constants.js';
import { DBSchema } from './js/DBSchema.js';
import { Table } from './js/Table.js';
import { data } from './js/data.js';
import { defaultThemes } from './js/defaultThemes.js';

console.log('Application started...');
const schema = new DBSchema(data);
// schema.addTable();
// schema.build();
schema.render();

const schemaEditorEl = document.getElementById('schema-editor');
schemaEditorEl.value = JSON.stringify(data, null, 2);
schemaEditorEl.addEventListener('change', event => {
    const inputData = JSON.parse(event.target.value);
    if (!validateData(inputData)) {

    }

    schema.setData(inputData);
    schema.clear();
    schema.render();
});






const importBtnEl = document.getElementById('import-btn');
const exportBtnEl = document.getElementById('export-btn');
const themesBtnEl = document.getElementById('themes-btn');
const windowWrapperEl = document.getElementById('window-wrapper');
const exportWindowEl = document.getElementById('export-window');
const importWindowEl = document.getElementById('import-window');
const closeWindowBtnEl = document.getElementById('close-window-btn');
const themesEl = document.getElementById('themes');


importBtnEl.addEventListener('click', function () {
    windowWrapperEl.style.visibility = 'visible';
    importWindowEl.style.display = 'flex';
});

exportBtnEl.addEventListener('click', function () {
    windowWrapperEl.style.visibility = 'visible';
    exportWindowEl.style.display = 'flex';
});

themesBtnEl.addEventListener('click', function () {
    themesEl.style.visibility = themesEl.style.visibility == 'visible' ? 'hidden' : 'visible';
});

closeWindowBtnEl.addEventListener('click', function () {
    closeWindow();
});



// TODO: Refactor.
const saveAsSvgBtnEl = document.getElementById('save-as-svg');
saveAsSvgBtnEl.addEventListener('click', () => {
    const svgEl = document.getElementById('schema');
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>';
    var svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = 'schema';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});

const saveAsJSONBtnEl = document.getElementById('save-as-json');
saveAsJSONBtnEl.addEventListener('click', () => {
    // TODO: Validate.
    var data = schemaEditorEl.value;
    var json = JSON.stringify(schema.getData());
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download = "schema.json";
    a.href = url;
    a.textContent = "schema.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});



const uploadFileInputEl = document.getElementById('upload-file');
uploadFileInputEl.addEventListener('change', event => {
    const reader = new FileReader()
    reader.onload = function (e) {
        // TODO: Validate.
        const data = JSON.parse(e.target.result);
        schema.setData(data);
        schema.clear();
        schema.render();

        schemaEditorEl.value = JSON.stringify(data, null, 2);

        closeWindow();
    }
    reader.readAsText(event.target.files[0])
});


function validateData(data) {
    return true;
}

function closeWindow() {
    windowWrapperEl.style.visibility = 'hidden';
    importWindowEl.style.display = 'none';
    exportWindowEl.style.display = 'none';
}
