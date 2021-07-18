import { constants } from './js/constants.js';
import { DBSchema } from './js/DBSchema.js';
import { Table } from './js/Table.js';
import { data } from './js/data.js';

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


importBtnEl.addEventListener('click', function() {
    windowWrapperEl.style.visibility = 'visible';
    importWindowEl.style.display = 'flex';
});

exportBtnEl.addEventListener('click', function() {
    windowWrapperEl.style.visibility = 'visible';
    exportWindowEl.style.display = 'flex';
});

themesBtnEl.addEventListener('click', function() {
    themesEl.style.visibility = themesEl.style.visibility == 'visible' ? 'hidden' : 'visible';
});

closeWindowBtnEl.addEventListener('click', function() {
    windowWrapperEl.style.visibility = 'hidden';
    importWindowEl.style.display = 'none';
    exportWindowEl.style.display = 'none';
});


function validateData(data) {
    return true;
}
