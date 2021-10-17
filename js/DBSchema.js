import { Table } from './Table.js';
import { Theme } from './Theme.js';
import { TableRef } from './TableRef.js';
export class DBSchema {
    constructor(data) {
        this.data = data;
        this.titles = 'DB Schema'

        this.theme = new Theme();
        this.theme.init(event => {
            this.clear();
            this.render();
        });

        this.tables = [];

        this.svgEl = document.getElementById('schema');
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    getTheme() {
        return this.theme;
    }

    build() {
        /*this.tables.forEach(table => {
            this.svgEl.appendChild(table.svgEl);
        });*/
    }

    save() {

    }

    // TODO: Refactor.
    render() {

        // Set brackground.
        const backgroundEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        backgroundEl.setAttribute('fill', this.theme.getCurrentTheme().backgroundColor3);
        backgroundEl.setAttribute('width', '100%');
        backgroundEl.setAttribute('height', '100%');
        this.svgEl.appendChild(backgroundEl);

        // Add title.
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.id = 'dbschematitle';
        title.classList.add('dbschematitle');
        title.setAttribute('x', this.data.title.position.x);
        title.setAttribute('y', this.data.title.position.y);
        title.setAttribute('font-size', this.theme.getCurrentTheme().schemaFontSize);
        title.setAttribute('font-weight', this.theme.getCurrentTheme().schemaFontWeight);
        title.setAttribute('fill', this.theme.getCurrentTheme().schemaColor);
        // title.setAttribute('moveable', true);

        var textNode = document.createTextNode(this.data.title.content);
        title.appendChild(textNode);
        this.svgEl.appendChild(title);

        // Render tables.
        this.createTables();
        this.tables.forEach(t => this.svgEl.appendChild(t.getSvgEl()));
        // this.data.entityData.forEach(entitData => this.svgEl.appendChild(new Table(entitData, this.theme.getCurrentTheme()).getSvgEl()));


        // this.buildRefs();
    }

    createTables() {
        this.tables = [];
        this.data.entityData.forEach(entityData => this.tables.push(new Table(entityData, this.theme.getCurrentTheme())));
    }

    findByByTableId(id) {
        return this.tables.find(t => t.id == id);
    }

    updateTableCoordinates(tableId, x, y) {
        let tableData = this.data.entityData.find(t => t.name == tableId);
        tableData.position.x = x;
        tableData.position.y = y;
    }

    clear() {
        while (this.svgEl.childNodes.length > 0) {
            this.svgEl.removeChild(this.svgEl.lastChild);
        }
    }

    /*buildRefs() {
        let ref = new TableRef({
            x1: 300,
            y1: 100,
            x2: 400,
            y2: 200,
            table1: 'User',
            table2: 'Order'
        }).pathEl;

        this.svgEl.appendChild(ref);
    }*/
}
