const MAX_CELL_WIDTH = 100;
const ROW_HEIGHT = 24;
const TABLE_PADDING = 20;

export class Table {
    constructor(entityData, theme) {
        this.id = entityData.id || entityData.name;
        this.entityData = entityData;
        this.x = entityData.position.x;
        this.y = entityData.position.y;
        this.theme = theme;

        // Contains all html elements related to table.
        this.tableEl = {
            table: null,
            header: null,
            rowBackgrounds: [],
            rowTexts: []
        };

        this.svgEl = this.createTable();
    }

    getSvgEl() {
        return this.svgEl;
    }

    createTable() {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.id = `${this.entityData.name}-g`;
        g.setAttribute('role', 'table');
        g.setAttribute('transform', 'translate(0, 0)');
        g.setAttribute('x', this.x);
        g.setAttribute('y', this.y);

        const table = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        table.id = `${this.entityData.name}-table`;
        table.setAttribute('moveable', true);
        table.setAttribute('x', this.x);
        table.setAttribute('y', this.y);
        table.setAttribute('width', this.theme.tableWidth)
        table.setAttribute('height', this.calculateTableHeight(this.entityData));
        table.setAttribute('stroke', this.theme.borderColor);
        table.setAttribute('stroke-width', this.theme.tableStrokeWidth);
        table.setAttribute('fill', this.theme.backgroundColor);
        table.setAttribute('rx', this.theme.tableRx);
        table.setAttribute('ry', this.theme.tableRy);

        let tableTextY = this.y + TABLE_PADDING;
        g.appendChild(table);

        let header = this.createTableHeader({
            x: this.x + this.theme.tableWidth / 2,
            y: tableTextY,
            content: this.entityData.name,
            theme: this.theme
        });
        g.appendChild(header);

        for (let i = 0; i < this.entityData.rows.length; i += 2) {
            let rowBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rowBackground.id = `${this.entityData.name}-row`;
            rowBackground.setAttribute('moveable', true);
            rowBackground.setAttribute('x', this.x);
            rowBackground.setAttribute('y', tableTextY + ROW_HEIGHT * (i + 1) - 14);
            rowBackground.setAttribute('width', this.theme.tableWidth)
            rowBackground.setAttribute('height', this.theme.rowHeight);
            rowBackground.setAttribute('fill', this.theme.backgroundColor2);
            g.appendChild(rowBackground);

            this.tableEl.rowBackgrounds.push(rowBackground);
        }

        this.entityData.rows.forEach((row, i) => {
            let rowText = this.createTableRow({
                x: this.x + TABLE_PADDING,
                y: tableTextY + this.theme.rowHeight * (i + 1),
                theme: this.theme,
                name: row.name,
                type: row.type
            });
            g.appendChild(rowText)

            this.tableEl.rowTexts.push(rowText);
        });

        this.tableEl.header = header;
        this.tableEl.table = table;

        // Used to move table.
        const transparentTable = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        transparentTable.id = `${this.entityData.name}-table1`;
        transparentTable.setAttribute('moveable', true);
        transparentTable.setAttribute('x', this.x);
        transparentTable.setAttribute('y', this.y);
        transparentTable.setAttribute('width', this.theme.tableWidth)
        transparentTable.setAttribute('height', this.calculateTableHeight(this.entityData));
        transparentTable.setAttribute('stroke-width', this.theme.tableStrokeWidth);
        transparentTable.setAttribute('fill', this.theme.backgroundColor);
        transparentTable.setAttribute('style', 'opacity: 0')

        g.appendChild(transparentTable);

        return g;
    }

    createTableHeader(configsData) {
        const { x, y, content, theme } = configsData;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.id = `${this.entityData.name}-title`;
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', theme.headerTextAnchor);
        text.setAttribute('role', 'row');
        text.setAttribute('fill', theme.titleColor);
        text.setAttribute('font-size', theme.titleFontSize);
        text.setAttribute('font-weight', theme.titleFontWeight);
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('moveable', true);


        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.appendChild(document.createTextNode(content));
        tspan.setAttribute('moveable', true);

        text.appendChild(tspan);

        return text;
    }

    createTableRow(configsData) {
        const { x, y, theme, name, type } = configsData;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.id = `${this.entityData.name}-property`;
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', theme.rowTextAnchor);
        text.setAttribute('role', 'row');
        text.setAttribute('fill', theme.rowColor);
        text.setAttribute('font-size', theme.rowFontSize);
        text.setAttribute('font-weight', theme.rowFontWeight);
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('moveable', true);

        const fieldName = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        fieldName.appendChild(document.createTextNode(name));
        fieldName.id = `${this.entityData.name}-propertyname`;
        fieldName.setAttribute('moveable', true);

        const fieldType = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        fieldType.id = `${this.entityData.name}-propertytype`;
        fieldType.appendChild(document.createTextNode(type));
        fieldType.setAttribute('x', this.calculateXOfSecondColumn(x))
        fieldType.setAttribute('moveable', true);

        text.appendChild(fieldName);
        text.appendChild(fieldType);

        return text;
    }

    calculateTableHeight(entityData) {
        return entityData.rows.length * ROW_HEIGHT + ROW_HEIGHT * 2;
    }

    // TODO: Refactor.
    move(x, y) {
        let tableTextY = y + TABLE_PADDING;

        this.tableEl.table.setAttribute('x', x);
        this.tableEl.table.setAttribute('y', y);

        this.tableEl.header.setAttribute('x', x + this.theme.tableWidth / 2);
        this.tableEl.header.setAttribute('y', tableTextY);

        let counter = 0;
        this.tableEl.rowBackgrounds.forEach(r => {
            r.setAttribute('x', x);
            r.setAttribute('y', tableTextY + ROW_HEIGHT * (counter + 1) - 14);

            counter += 2;
        });

        this.tableEl.rowTexts.forEach((r, i) => {
            r.setAttribute('x', x + TABLE_PADDING);
            r.setAttribute('y', tableTextY + this.theme.rowHeight * (i + 1));

            // Update position for field type.
            r.children[1].setAttribute('x', this.calculateXOfSecondColumn(x));
        });
    }

    calculateXOfSecondColumn(tableX) {
        return tableX + this.theme.tableWidth * 0.55;
    }
}
