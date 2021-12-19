import { Table } from './Table.js';
import { Theme } from './Theme.js';
import { TableRef } from './TableRef.js';
import { SchemaEditorTable } from './SchemaEditorTable.js';
export class DBSchema {
    constructor(dataRepository) {
        this.dataRepository = dataRepository;
        this.titleEl = null;

        this.theme = new Theme();
        this.theme.init(event => {
            this.clear();
            this.render();
        });

        this.tables = [];

        this.svgEl = document.getElementById('schema');
        this.refsEl = [];
        this.tableEditEls = [];

        this.initEditor();
    }

    getData() {
        return this.dataRepository;
    }

    setData(dataRepository) {
        this.dataRepository = dataRepository;
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
        title.setAttribute('x', this.dataRepository.getData().title.position.x);
        title.setAttribute('y', this.dataRepository.getData().title.position.y);
        title.setAttribute('font-size', this.theme.getCurrentTheme().schemaFontSize);
        title.setAttribute('font-weight', this.theme.getCurrentTheme().schemaFontWeight);
        title.setAttribute('fill', this.theme.getCurrentTheme().schemaColor);
        // title.setAttribute('moveable', true);

        this.title = title;

        var textNode = document.createTextNode(this.dataRepository.getData().title.content);
        title.appendChild(textNode);
        this.svgEl.appendChild(title);

        // Render tables.
        this.createTables();
        this.tables.forEach(t => this.svgEl.appendChild(t.getSvgEl()));
        // this.data.entityData.forEach(entitData => this.svgEl.appendChild(new Table(entitData, this.theme.getCurrentTheme()).getSvgEl()));


        this.buildRefs();
    }

    createTables() {
        this.tables = [];
        this.dataRepository.getEntities().forEach(entity => this.tables.push(new Table(entity, this.theme.getCurrentTheme())));
    }

    findByByTableId(id) {
        return this.tables.find(t => t.id == id);
    }

    updateTableCoordinates(tableId, x, y) {
        let tableData = this.dataRepository.getEntities().find(t => t.name == tableId);
        tableData.position.x = x;
        tableData.position.y = y;
    }

    clear() {
        while (this.svgEl.childNodes.length > 0) {
            this.svgEl.removeChild(this.svgEl.lastChild);
        }
    }

    buildRefs() {
        /*let ref = new TableRef({
            x1: 300,
            y1: 100,
            x2: 400,
            y2: 200,
            table1: 'User',
            table2: 'Order'
        }).pathEl;

        this.svgEl.appendChild(ref);*/

        // document.querySelectorAll('.ref')
        this.refsEl.forEach(e => e.remove());

        this.dataRepository.getRefs().forEach(r => {
            let fromTable = this.dataRepository.getEntities().find(t => t.name == r.fromTable);
            let toTable = this.dataRepository.getEntities().find(t => t.name == r.toTable);

            let fromKeyIndex = 0;
            fromTable.rows.forEach((k, i) => {
                if (k.name == r.fromField) {
                    fromKeyIndex = i;
                    return;
                }
            });

            let toKeyIndex = 0;
            toTable.rows.forEach((k, i) => {

                if (k.name == r.toField) {
                    toKeyIndex = i;
                    return;
                }
            });

            let fromTableY = fromTable.position.y + this.theme.getCurrentTheme().rowHeight * (fromKeyIndex + 2);
            let toTableY = toTable.position.y + this.theme.getCurrentTheme().rowHeight * (toKeyIndex + 2);

            let fromX = fromTable.position.x;
            let toX = toTable.position.x;

            let offsetX1 = 0;
            let offsetX2 = this.theme.getCurrentTheme().tableWidth;

            if (fromX < toX) {
                let tmp = fromX;
                fromX = toX;
                toX = tmp;

                let tmp2 = fromTableY;
                fromTableY = toTableY;
                toTableY = tmp2;
            }

            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            pathEl.setAttribute('points', `${fromX + offsetX1} ${fromTableY}, ${fromX + offsetX1 - 20} ${fromTableY},
             ${toX + offsetX2 + 20} ${toTableY}, ${toX + offsetX2} ${toTableY}`);
            pathEl.setAttribute('fill', 'none');
            pathEl.setAttribute('stroke', this.theme.getCurrentTheme().backgroundColor2);
            pathEl.setAttribute('stroke-width', 2);
            pathEl.setAttribute('stroke-linejoin', 'round');
            pathEl.classList.add('ref');

            const circle1El = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle1El.setAttribute('fill', 'blue');
            circle1El.setAttribute('cx', fromX + offsetX1);
            circle1El.setAttribute('cy', fromTableY);
            circle1El.setAttribute('r', '5');
            circle1El.classList.add('ref');

            this.svgEl.appendChild(pathEl);
            // this.svgEl.appendChild(circle1El);
            this.refsEl.push(pathEl);
            // this.refsEl.push(circle1El);
        });

        /*this.refsEl.forEach(e => {
            e.insertBefore(document.getElementById('dbschematitle'), null);
        });*/
    }

    initEditor() {
        this.dataRepository.getEntities().forEach(entity => {
            const tableEditEl = new SchemaEditorTable(entity);
            tableEditEl.generateTableDataElAndAppend();
            this.tableEditEls.push(tableEditEl);
        });
    }
}
