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



// TODO: Refactor.
const saveAsSvgBtnEl = document.getElementById('save-as-svg');
saveAsSvgBtnEl.addEventListener('click', () => {
    const svgEl = document.getElementById('schema');
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = 'testtttttttt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});

function renderThemes(container) {
    /*
    <div id="themes-list" class="themes-list">
                <div class="theme">
                    <span>test0</span>
                    <div class="theme-colors">
                        <div class="theme-color"></div>
                        <div class="theme-color"></div>
                        <div class="theme-color"></div>
                        <div class="theme-color"></div>
                        <div class="theme-color"></div>
                    </div>
                </div>
            </div>
    */
    defaultThemes.forEach(theme => {
        const themeEl = document.createElement('div');
        themeEl.className = 'theme';
        const themeNameEl = document.createElement('span');
        themeNameEl.textContent = theme.name;

        const themeColorsEl = document.createElement('div');
        themeColorsEl.className = 'theme-colors';

        // Colors.
        const backgroundColor = document.createElement('div');
        backgroundColor.className = 'theme-color';
        backgroundColor.style.backgroundColor = theme.backgroundColor;
        themeColorsEl.appendChild(backgroundColor);

        const borderColor = document.createElement('div');
        borderColor.className = 'theme-color';
        borderColor.style.backgroundColor = theme.borderColor;
        themeColorsEl.appendChild(borderColor);


        themeEl.appendChild(themeNameEl);
        themeEl.appendChild(themeColorsEl);
        container.appendChild(themeEl);
    });
}

const themesListEl = document.getElementById('themes-list');
renderThemes(themesListEl);


function validateData(data) {
    return true;
}
