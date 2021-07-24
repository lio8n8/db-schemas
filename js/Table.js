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

export class Table {
    constructor(entityData, theme) {
        this.entityData = entityData;
        this.x = entityData.position.x;
        this.y = entityData.position.y;
        this.theme = theme;

        this.svgEl = this.createTable();
    }

    getSvgEl() {
        return this.svgEl;
    }

    createTable() {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('role', 'table');
        g.setAttribute('transform', 'translate(0, 0)');
        g.setAttribute('x', this.x);
        g.setAttribute('y', this.y);

        const table = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        table.setAttribute('x', this.x);
        table.setAttribute('y', this.y);
        table.setAttribute('width', TABLE_WIDTH)
        table.setAttribute('height', this.calculateTableHeight(this.entityData));
        table.setAttribute('stroke', this.theme.borderColor);
        table.setAttribute('stroke-width', configs.table.strokeWidth);
        table.setAttribute('fill', this.theme.backgroundColor);
        table.setAttribute('rx', this.theme.tableRx);
        table.setAttribute('ry', this.theme.tableRy);

        let tableTextY = this.y + TABLE_PADDING;
        g.appendChild(table);
        g.appendChild(this.createTableHeader({
            x: this.x + TABLE_WIDTH / 2,
            y: tableTextY,
            content: this.entityData.name,
            theme: this.theme
        }));

        for (let i = 0; i < this.entityData.rows.length; i += 2) {
            let rowBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rowBackground.setAttribute('x',this. x);
                rowBackground.setAttribute('y', tableTextY + ROW_HEIGHT * (i + 1) - 14);
                rowBackground.setAttribute('width', this.theme.tableWidth)
                rowBackground.setAttribute('height', this.theme.rowHeight);
                rowBackground.setAttribute('fill', this.theme.backgroundColor2);
                g.appendChild(rowBackground);
        }

        this.entityData.rows.forEach((row, i) => {
            g.appendChild(this.createTableRow({
                x: this.x + TABLE_PADDING,
                y: tableTextY + ROW_TEXT_HEIGHT * (i + 1),
                theme: this.theme,
                name: row.name,
                type: row.type
            }))
        });

        return g;
    }

    createTableHeader(configsData) {
        const { x, y, content, theme } = configsData;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', configs.table.header.textAnchor);
        text.setAttribute('role', 'row');
        text.setAttribute('fill', theme.titleColor);
        text.setAttribute('font-size', theme.titleFontSize);
        text.setAttribute('font-weight', theme.titleFontWeight);
        text.setAttribute('dominant-baseline', 'middle');


        const tspan0 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan0.appendChild(document.createTextNode(content));

        text.appendChild(tspan0);

        return text;
    }

    createTableRow(configsData) {
        const { x, y, theme, name, type } = configsData;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', configs.table.row.textAnchor);
        text.setAttribute('role', 'row');
        text.setAttribute('fill', theme.rowColor);
        text.setAttribute('font-size', theme.rowFontSize);
        text.setAttribute('font-weight', theme.rowFontWeight);
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
