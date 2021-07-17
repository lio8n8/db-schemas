import { DBSchemaMetadata } from './DBSchemaMetadata.js';
import { Table } from './Table.js';
import { data } from './data.js';
export class DBSchema {
    constructor() {
        this.titles = 'DB Schema'
        this.tables = [];
        this.metadata = new DBSchemaMetadata();

        this.svgEl = document.getElementById('main');
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
        data.tables.forEach(t => {
            this.tables.push(new Table(t.name, t.rows));
        });
    }

    render() {
        data.entityData.forEach(entitData => this.svgEl.appendChild(new Table(entitData).getSvgEl()));
    }
}
