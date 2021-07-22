import { DBSchemaMetadata } from './DBSchemaMetadata.js';
import { Table } from './Table.js';
import { Theme } from './Theme.js';
// import { data } from './data.js';
export class DBSchema {
    constructor(data) {
        this.data = data;
        this.titles = 'DB Schema'
        this.tables = [];
        this.metadata = new DBSchemaMetadata();
        
        this.svgEl = document.getElementById('schema');

        this.theme = new Theme();
        this.theme.init(event => {
            // TODO: Move to Theme class.
            if (this.theme.currentThemeEl) {
                this.theme.currentThemeEl.classList.remove('active');
            }
            this.theme.currentTheme = this.theme.themes.find(t => t.name == event.target.id);
            this.theme.setCurrentThemeEl(event.target);
            event.target.classList.add('active');

            // TODO: Check if theme was changed.
            this.render();
        });
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    addTable() {
        // this.tables.push(new Table());
    }

    updateTable(id) {

    }

    removeTable(id) {

    }

    build() {
        /*this.tables.forEach(table => {
            this.svgEl.appendChild(table.svgEl);
        });*/
    }

    save() {

    }

    loadFromJSFile() {
        /*this.tables = [];
        this.data.tables.forEach(t => {
            this.tables.push(new Table(t.name, t.rows));
        });*/
    }

    render() {
        this.data.entityData.forEach(entitData => this.svgEl.appendChild(new Table(entitData, this.theme.getCurrentTheme()).getSvgEl()));
    }

    clear() {
        while (this.svgEl.childNodes.length > 0) {
            this.svgEl.removeChild(this.svgEl.lastChild);
        }
    }
}
