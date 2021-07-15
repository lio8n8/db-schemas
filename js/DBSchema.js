import { DBSchemaMetadata } from './DBSchemaMetadata.js';
import { Table } from './Table.js';
import { data } from './data.js';

export class DBSchema {
    constructor() {
        this.titles = 'DB Schema'
        this.tables = [];
        this.metadata = new DBSchemaMetadata();

        this.svgEl = document.getElementById('main');

        /*var myCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        myCircle.setAttribute("id", "mycircle");
        myCircle.setAttribute("cx", 100);
        myCircle.setAttribute("cy", 100);
        myCircle.setAttribute("r", 50);
        myCircle.setAttribute("fill", "black");
        myCircle.setAttribute("stroke", "blue");

        this.svgEl.appendChild(myCircle);
        console.log(constants)*/
    }

    addTable() {
        this.tables.push(new Table());
    }

    updateTable(id) {

    }

    removeTable(id) {

    }

    build() {
        this.tables.forEach( table => {
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
}
