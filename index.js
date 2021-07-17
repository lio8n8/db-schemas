import { constants } from './js/constants.js';
import { DBSchema } from './js/DBSchema.js';
import { Table } from './js/Table.js';
import { data } from './js/data.js';

console.log('Application started...');
const schema = new DBSchema();
// schema.addTable();
// schema.build();
schema.render();





const jsonSchemaEl = document.getElementById('schema-editor');
jsonSchemaEl.value = JSON.stringify(data);

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
