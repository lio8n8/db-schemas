export class SchemaEditorTable {
    constructor(entityData) {
        this.schemaEditorEl = document.getElementById('schema-editor');
        this.entityData = entityData;
    }

    /**
     * Create table editor
     * @returns table editor (HTML element)
     */
    generateTableDataElAndAppend() {
        const tableDataEl = document.createElement('div');
        tableDataEl.className = "table-data";
        tableDataEl.id = `${this.entityData.id}-table-editor`;
        tableDataEl.setAttribute('isOpen', 'false');


        const tableDataRowBtnsEl = document.createElement('div');
        tableDataRowBtnsEl.className = 'table-data-ctrl-btns';
        tableDataRowBtnsEl.appendChild(this.addRowBtn(tableDataEl));
        tableDataRowBtnsEl.appendChild(this.deleteTableBtn(tableDataEl));
        tableDataEl.appendChild(tableDataRowBtnsEl);

        const tableDataTitle = document.createElement('div');
        tableDataTitle.className = 'table-data-row table-data-title';
        tableDataTitle.textContent = this.entityData.name;
        tableDataEl.appendChild(tableDataTitle);

        const coordinatesEl = document.createElement('div');
        coordinatesEl.className = "table-data-row";
        const xEl = document.createElement('input');
        xEl.id = 'x-coord';
        xEl.className = "table-data-name";
        xEl.value = this.entityData.position.x;
        const yEl = document.createElement('input');
        yEl.id = 'y-coord';
        yEl.className = "table-data-name";
        yEl.value = this.entityData.position.y;
        coordinatesEl.appendChild(xEl);
        coordinatesEl.appendChild(yEl);
        tableDataEl.appendChild(coordinatesEl);

        this.entityData.rows.forEach(row => {
            this.addRow(tableDataEl, row);
        });

        this.schemaEditorEl.appendChild(tableDataEl);

        return tableDataEl;
    }

    /**
     * Create and append row in table editor.
     * @param {Object} tableDataEl element to append row
     * @param {Object} row contains name and type of field
     */
    addRow(tableDataEl, row) {
        const tableDataRowEl = document.createElement('div');
        tableDataRowEl.className = "table-data-row";

        const tableDataNameEl = document.createElement('input');
        tableDataNameEl.className = "table-data-name";
        tableDataNameEl.value = row.name || 'example';

        const tableDataTypeEl = document.createElement('input');
        tableDataTypeEl.className = "table-data-type";
        tableDataTypeEl.value = row.type || 'String';

        tableDataRowEl.appendChild(tableDataNameEl);
        tableDataRowEl.appendChild(tableDataTypeEl);
        tableDataRowEl.appendChild(this.deleteRowBtn(tableDataRowEl));

        tableDataEl.appendChild(tableDataRowEl);

        tableDataNameEl.addEventListener('input', event => {
            // TODO: Validate
            row.name = event.target.value;
        });
        tableDataTypeEl.addEventListener('input', event => {
            // TODO: Validate
            row.type = event.target.value;
        });
    }

    addRowBtn(tableDataEl) {
        const htmlItem = document.createElement('img');
        htmlItem.className = 'add-row-table-data-icon';
        htmlItem.src = 'src/images/plus.svg';

        htmlItem.addEventListener('click', event => {
            const row = {
                type: 'String',
                name: `fieldName-${Math.round(Math.random() * 1000)}`
            };

            this.addRow(tableDataEl, row);
            this.entityData.rows.push(row);
        });

        return htmlItem;
    }

    deleteTableBtn(tableDataEl) {
        const htmlItem = document.createElement('img');
        htmlItem.className = 'delete-table-data-icon';
        htmlItem.src = 'src/images/delete.svg';

        htmlItem.addEventListener('click', event => {
            console.log('Not implemented yet!');
            // tableDataEl.remove();
        });

        return htmlItem;
    }

    deleteRowBtn(rowEl) {
        const htmlItem = document.createElement('img');
        htmlItem.className = 'delete-table-row-icon';
        htmlItem.src = 'src/images/delete.svg';

        htmlItem.addEventListener('click', event => {
            console.log('Not implemented yet!');
        });

        return htmlItem;
    }
}
