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

        let primaryKey = null;

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

            if (this.entityData.primaryKey == row.name) {
                primaryKey = this.createPrimaryKeyIcon(this.x, tableTextY + this.theme.rowHeight * (i + 1) - 0.6 * this.theme.rowHeight, this.theme.rowColor);
                g.appendChild(primaryKey);
            }

            g.appendChild(rowText)

            this.tableEl.rowTexts.push(rowText);
        });

        this.tableEl.header = header;
        this.tableEl.table = table;
        this.tableEl.primaryKey = primaryKey;

        // Used to move table.
        const transparentTable = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        transparentTable.id = `${this.entityData.id}-table1`;
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
        const { x, y, theme, name, type, isPrimaryKey } = configsData;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.id = `${name}-property`;
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
        fieldName.setAttribute('moveable', true);

        const fieldType = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        fieldType.appendChild(document.createTextNode(type));
        fieldType.setAttribute('x', this.calculateXOfSecondColumn(x))
        fieldType.setAttribute('moveable', true);

        text.appendChild(fieldName);
        text.appendChild(fieldType);

        return text;
    }

    createPrimaryKeyIcon(x, y, color) {
        /*const primaryKeyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'image');

        primaryKeyIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'src/images/key.svg');
        primaryKeyIcon.setAttributeNS(null, 'width', 24);
        primaryKeyIcon.setAttributeNS(null, 'height', 24);
        primaryKeyIcon.setAttributeNS(null, 'x', x);
        primaryKeyIcon.setAttributeNS(null, 'y', y);
        primaryKeyIcon.setAttributeNS(null, 'visibility', 'visible');

        return primaryKeyIcon;*/

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const primaryKeyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        primaryKeyIcon.setAttributeNS(null, 'd', 'm6.35866,19.80143c-0.42333,0 -0.76589,0.2985 -0.76589,0.66667s0.34256,0.66667 0.76589,0.66667l3.69182,0l0,0.19857c0,0.36817 0.34256,0.66667 0.76589,0.66667s0.76589,-0.2985 0.76589,-0.66667l0,-11.40108c2.16757,-0.31885 3.82496,-1.95996 3.82496,-3.93616c0.00001,-2.20345 -2.05907,-3.99609 -4.59084,-3.99609s-4.5916,1.79264 -4.5916,3.99609c0,1.97619 1.65799,3.61731 3.82571,3.93616l0,6.7253l-3.69182,0c-0.42333,0 -0.76589,0.2985 -0.76589,0.66667s0.34256,0.66667 0.76589,0.66667l3.69182,0l0,1.81055l-3.69183,0zm1.3979,-13.80534c0,-1.4681 1.37247,-2.66276 3.05982,-2.66276c1.6866,0 3.05907,1.19466 3.05907,2.66276c0,1.46843 -1.37247,2.66309 -3.05907,2.66309c-1.68735,0 -3.05982,-1.19466 -3.05982,-2.66309z');
        svg.setAttributeNS(null, 'x', x);
        svg.setAttributeNS(null, 'y', y);
        primaryKeyIcon.setAttributeNS(null, 'fill', color);

        svg.appendChild(primaryKeyIcon);
        
        return svg;
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
            // TODO: Fix. Add primary key width.
            r.children[1].setAttribute('x', this.calculateXOfSecondColumn(x) + 20);

            // Move primary key
            if (r.id.split('-')[0] == this.entityData.primaryKey) {
                this.tableEl.primaryKey.setAttribute('x', x);
                this.tableEl.primaryKey.setAttribute('y', tableTextY + this.theme.rowHeight * (i + 1) - 0.6 * this.theme.rowHeight);
            }
        });
    }

    calculateXOfSecondColumn(tableX) {
        return tableX + this.theme.tableWidth * 0.55;
    }
}
