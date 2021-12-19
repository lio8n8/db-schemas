import { DBSchema } from './js/DBSchema.js';
// import { data } from './js/data/example.js';
import { DataRepository } from './js/DataRepository.js';
import { Table } from './js/Table.js';

console.log('Application started...');
const schema = new DBSchema(new DataRepository());

schema.render();


/*schemaEditorEl.value = JSON.stringify(data, null, 2);
schemaEditorEl.addEventListener('change', event => {
    const inputData = JSON.parse(event.target.value);
    if (!validateData(inputData)) {

    }

    schema.setData(inputData);
    schema.clear();
    schema.render();
});*/

const importBtnEl = document.getElementById('import-btn');
const exportBtnEl = document.getElementById('export-btn');
const themesBtnEl = document.getElementById('themes-btn');
const createProjectBtnEl = document.getElementById('create-project-btn');
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

createProjectBtnEl.addEventListener('click', () => alert('Not yet implemented!'));



// Themes.
const createThemeWindowEl = document.getElementById('create-theme-window');
const importThemesWindowEl = document.getElementById('import-themes-window');
const exportThemesWindowEl = document.getElementById('export-themes-window');
const createThemeBtnEl = document.getElementById('create-theme-btn');
const importThemesBtnEl = document.getElementById('import-themes-btn');
const exportThemesBtnEl = document.getElementById('export-themes-btn');

createThemeBtnEl.addEventListener('click', function () {
    windowWrapperEl.style.visibility = 'visible';
    createThemeWindowEl.style.display = 'flex';

    createTheme();
});

importThemesBtnEl.addEventListener('click', function () {
    windowWrapperEl.style.visibility = 'visible';
    importThemesWindowEl.style.display = 'flex';
});

exportThemesBtnEl.addEventListener('click', function () {
    windowWrapperEl.style.visibility = 'visible';
    exportThemesWindowEl.style.display = 'flex';

    const json = JSON.stringify(schema.getTheme().getThemes());
    const blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.download = "themes.json";
    a.href = url;
    a.textContent = "themes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Set default visibility for themes.
themesEl.style.visibility = 'visible';
themesBtnEl.addEventListener('click', function () {
    themesEl.style.visibility = themesEl.style.visibility == 'visible' ? 'hidden' : 'visible';
});

closeWindowBtnEl.addEventListener('click', function () {
    closeWindow();
});

function closeWindow() {
    windowWrapperEl.style.visibility = 'hidden';
    importWindowEl.style.display = 'none';
    exportWindowEl.style.display = 'none';
    createThemeWindowEl.style.display = 'none';
    importThemesWindowEl.style.display = 'none';
    exportThemesWindowEl.style.display = 'none';
}


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

// TODO: Make more generic and reusable.
const saveAsJSONBtnEl = document.getElementById('save-as-json');
saveAsJSONBtnEl.addEventListener('click', () => {
    // TODO: Validate.
    // var data = schemaEditorEl.value;
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

        // schemaEditorEl.value = JSON.stringify(data, null, 2);

        closeWindow();
    }
    reader.readAsText(event.target.files[0])
});


function validateData(data) {
    return true;
}

let offsetX = 0;
let offsetY = 0;
const schemaEl = document.getElementById('schema');
schemaEl.addEventListener('load', makeDraggable);
function makeDraggable(evt) {
    let selectedEl = null;
    let selectedElId = null;
    let svg = evt.target;
    let CTM = svg.getScreenCTM();

    schemaEl.addEventListener('mousemove', event => {
        if (selectedEl && selectedEl.getAttribute('moveable')) {
            event.preventDefault();
            event.stopPropagation();


            let x = (event.clientX - CTM.e) / CTM.a;
            let y = (event.clientY - CTM.f) / CTM.d;

            let xDiff = x - offsetX;
            let yDiff = y - offsetY;

            schema.findByByTableId(selectedElId).move(xDiff, yDiff);
            schema.updateTableCoordinates(selectedElId, xDiff, yDiff);
            // schemaEditorEl.value = JSON.stringify(schema.getData(), null, 2);

            schema.buildRefs();
        }
    });

    schemaEl.addEventListener('mousedown', event => {
        selectedEl = event.target;
        selectedElId = event.target.id.split('-')[0];

        offsetX = ((event.clientX - CTM.e) / CTM.a) - selectedEl.getAttribute('x');
        offsetY = ((event.clientY - CTM.f) / CTM.d) - selectedEl.getAttribute('y');
    });

    schemaEl.addEventListener('mouseup', event => {
        selectedEl = null;
        offsetX = 0;
        offsetY = 0
    });

    schemaEl.addEventListener('mouseleave', event => {
        selectedEl = null;
        offsetX = 0;
        offsetY = 0
    });
}


/*const createThemeFormEl = document.getElementById('create-theme-from');
Object.keys(schema.getTheme().getCurrentTheme()).forEach(k => {
    const rowEl = document.createElement('div');
    rowEl.className = 'row';

    const labelEl = document.createElement('lable');
    labelEl.set
});*/

const createThemeInputElements = Object.keys(schema.getTheme().getCurrentTheme()).reduce((r, k) => {
    r[k] = document.getElementById(k);
    return r;
}, {});
createThemeInputElements['themeName'] = document.getElementById('theme-name');

const themeViewEl = document.getElementById('theme-view');
function createTheme() {
    Object.keys(createThemeInputElements)
        .forEach(k => {
            if (createThemeInputElements[k]) {
                createThemeInputElements[k].value = schema.getTheme().getCurrentTheme()[k]
            }
        });
    createThemeInputElements.themeName.value = schema.getTheme().getCurrentTheme().name;

    renderTable(schema.getTheme().getCurrentTheme());
}

// TODO: Refactor.
document.querySelectorAll('.table-view-config').forEach(inputEl => {
    inputEl.addEventListener('change', event => {
        const themeConfig = readThemeEditorInput();
        themeViewEl.removeChild(themeViewEl.lastChild);
        renderTable(themeConfig);
    });
});

const saveThemeBtnEl = document.getElementById('save-theme-btn');
saveThemeBtnEl.addEventListener('click', function (e) {
    // TODO: Explore why page reloads on click and fix it.
    e.preventDefault();
    const themeConfig = readThemeEditorInput();

    // TODO: Add validtion.
    if (schema.getTheme().getThemes().find(t => t.name == themeConfig.themeName)) {
        alert('Theme already exists!');
        return;
    }

    // TODO: Fix theme name variable.
    themeConfig.name = themeConfig.themeName;
    schema.getTheme().add(themeConfig, () => {
        schema.clear();
        schema.render();
    });
    closeWindow();
});

function readThemeEditorInput() {
    return Object.keys(createThemeInputElements).reduce((config, k) => {
        if (createThemeInputElements[k]) {
            config[k] = createThemeInputElements[k].value;
        }
        return config;
    }, {});
}

function renderTable(themeConfig) {
    const tableData = JSON.parse(JSON.stringify(schema.getData().entityData[0]));

        tableData.position.x = 20;
        tableData.position.y = 20;

        const tableEl = new Table(tableData, themeConfig);

        themeViewEl.appendChild(tableEl.getSvgEl());
}

const tableDataElems = document.getElementsByClassName('table-data');

for(let i = 0; i < tableDataElems.length; i++) {
    console.log(tableDataElems);
    const el = tableDataElems[i];
    el.addEventListener('click', event => {
        let isOpen = !!el.getAttribute('isOpen'); 
        el.setAttribute('isOpen', `${!isOpen}`);
        console.log(!!event.target.getAttribute('isOpen'));
        console.log(el.children[1].children[0].value);
    });
}
