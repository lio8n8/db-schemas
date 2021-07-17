import { configs } from './configs.js';

const TABLE_WIDTH = 220;
const MIN_TABLE_HEIGHT = 200;
const MAX_CELL_WIDTH = 100;
const ROW_HEIGHT = 24;
const ROW_TEXT_HEIGHT = 24;
const TABLE_PADDING = 20;

export class TableConfig {
    constructor(position) {
        this.position = position;

    }
}


/*class Row {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
}*/

export class Table {
    constructor(name, rows) {
        this.name = name;
        this.rows = rows;
        this.style = {
            width: TABLE_WIDTH,
            height: this.rows * ROW_HEIGHT
        };

        this.svgEl = this.createTable();
    }

    addRow(row) {
        this.rows.push(row);
    }

    updateRow(row) {

    }

    deleteRow() {

    }

    update() {
        this.rows.forEach(row => {

        });
    }

    createTable(x = 100, y = 100) {
        const entityData = {
            name: 'User',
            rows: [
                {
                    type: 'String',
                    name: 'id'
                },
                {
                    type: 'String',
                    name: 'username'
                },
                {
                    type: 'String',
                    name: 'password'
                },
                {
                    type: 'String',
                    name: 'email'
                },
                {
                    type: 'String',
                    name: 'firstName'
                },
                {
                    type: 'String',
                    name: 'lastName'
                },
                {
                    type: 'Date',
                    name: 'createdAt'
                },
                {
                    type: 'Date',
                    name: 'updatedAt'
                },
                {
                    type: 'User',
                    name: 'createdBy'
                },
                {
                    type: 'User',
                    name: 'updatedBy'
                },
            ]
        };

        //const table = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        // table.setAttribute("id", "table");
        /*table.setAttribute("cx", 100);
        table.setAttribute("cy", 100);
        table.setAttribute("r", 50);
        table.setAttribute("fill", "black");
        table.setAttribute("stroke", "blue");*/

        /*<rect x='25' y='76' width='310' height='20' fill='gainsboro'/>

        <text x='30' y='30' font-size='18px' font-weight='bold' fill='crimson' text-anchor='middle' role="row">
        <tspan  x='100'>Sales</tspan>
        <tspan   x='200'>Expenses</tspan>
        <tspan  x='300'>Net</tspan>
        </text>*/

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('role', 'table');
        g.setAttribute('transform', 'translate(0, 0)');
        g.setAttribute('x', x);
        g.setAttribute('y', y);

        const table = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        table.setAttribute('x', x);
        table.setAttribute('y', y);
        table.setAttribute('width', TABLE_WIDTH)
        table.setAttribute('height', this.calculateTableHeight(entityData));
        table.setAttribute('stroke', configs.tableConfig.borderColor);
        table.setAttribute('stroke-width', 4);
        table.setAttribute('fill', configs.tableConfig.backgroundColor);
        table.setAttribute('rx', 10);
        // table.style.position = 'absolute';

        /*const row = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        row.setAttribute('x', x);
        row.setAttribute('y', y);
        row.setAttribute('width', 300);
        row.setAttribute('height', 30);
        row.setAttribute('fill', 'red');
    

        table.appendChild(row);*/



        // <text x='30' y='30' font-size='18px' text-anchor='middle' role="row">

        /*const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + TABLE_PADDING);
        text.setAttribute('y', y + 20);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('role', 'row');
        text.setAttribute('fill', '#FFF');
        text.setAttribute('font-size', '18px');

        const tspan0 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan0.appendChild(document.createTextNode('Name'));

        const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan1.appendChild(document.createTextNode('Type'));
        tspan1.setAttribute('x', x + MAX_CELL_WIDTH)

        text.appendChild(tspan0);
        text.appendChild(tspan1);*/

        /*let newElement = document.createElementNS('http://www.w3.org/2000/svg','rect');
        newElement.setAttribute('fill','orange');
        newElement.setAttribute('width','200');
        newElement.setAttribute('height','200');
        g.appendChild(newElement);*/

        // g.appendChild(row);




        let tableTextY = y + TABLE_PADDING;
        g.appendChild(table);
        g.appendChild(this.createTableHeader({
            x: x + TABLE_WIDTH / 2,
            y: tableTextY,
            color: '#FFF',
            content: entityData.name
        }));

        for (let i = 0; i < entityData.rows.length; i +=2) {
            let rowBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rowBackground.setAttribute('x', x);
                rowBackground.setAttribute('y', tableTextY + ROW_HEIGHT * (i + 1) - 14);
                rowBackground.setAttribute('width', TABLE_WIDTH)
                rowBackground.setAttribute('height', ROW_HEIGHT);
                rowBackground.setAttribute('fill', configs.tableConfig.borderColor);
                g.appendChild(rowBackground);
        }

        entityData.rows.forEach((row, i) => {
            g.appendChild(this.createTableRow({
                x: x + TABLE_PADDING,
                y: tableTextY + ROW_TEXT_HEIGHT * (i + 1),
                color: '#FFF',
                name: row.name,
                type: row.type
            }))
        });

        return g;
    }

    createTableHeader(configs) {
        const { x, y, color, content } = configs;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('role', 'row');
        text.setAttribute('fill', color);
        text.setAttribute('font-size', '20px');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('dominant-baseline', 'middle');


        const tspan0 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan0.appendChild(document.createTextNode(content));

        text.appendChild(tspan0);

        return text;
    }

    createTableRow(configs) {
        const { x, y, color, name, type } = configs;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', 'start');
        text.setAttribute('role', 'row');
        text.setAttribute('fill', color);
        text.setAttribute('font-size', '20px');
        text.setAttribute('dominant-baseline', 'middle');

        const fieldName = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        fieldName.appendChild(document.createTextNode(name));

        const fieldType = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        fieldType.appendChild(document.createTextNode(type));
        fieldType.setAttribute('x', x + MAX_CELL_WIDTH)

        text.appendChild(fieldName);
        text.appendChild(fieldType);

        return text;
    }

    calculateTableHeight(entityData) {
        return entityData.rows.length * ROW_HEIGHT + ROW_HEIGHT * 2;
    }
}
