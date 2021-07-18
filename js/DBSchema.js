import { DBSchemaMetadata } from './DBSchemaMetadata.js';
import { Table } from './Table.js';
// import { data } from './data.js';
export class DBSchema {
    constructor(data) {
        this.data = data;
        this.titles = 'DB Schema'
        this.tables = [];
        this.metadata = new DBSchemaMetadata();

        this.svgEl = document.getElementById('main');
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    addTable() {
        this.tables.push(new Table());
    }

    updateTable(id) {

    }

    removeTable(id) {

    }

    build() {
        this.tables.forEach(table => {
            this.svgEl.appendChild(table.svgEl);
        });
    }

    save() {

    }

    loadFromJSFile() {
        this.tables = [];
        this.data.tables.forEach(t => {
            this.tables.push(new Table(t.name, t.rows));
        });
    }

    render() {
        this.data.entityData.forEach(entitData => this.svgEl.appendChild(new Table(entitData).getSvgEl()));
    }

    clear() {
        while (this.svgEl.childNodes.length > 0) {
            this.svgEl.removeChild(this.svgEl.lastChild);
        }
    }
}
