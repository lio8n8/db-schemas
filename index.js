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

importBtnEl.addEventListener('click', function() {
    console.log('Import btn -> Not yet implemented!');
});

exportBtnEl.addEventListener('click', function() {
    console.log('Export btn -> Not yet implemented!');
});

themesBtnEl.addEventListener('click', function() {
    console.log('Themes btn -> Not yet implemented!');
});

function validateData(data) {
    return true;
}
