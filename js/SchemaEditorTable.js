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


        /*const deleteTableIconEl = document.createElement('img');
        deleteTableIconEl.className = 'delete-table-data-icon';
        deleteTableIconEl.src = 'src/images/delete.svg';*/

        // tableDataEl.appendChild(deleteTableIconEl);

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

        tableDataEl.appendChild(tableDataRowEl);

        tableDataNameEl.addEventListener('input', event => {
            row.name = event.target.value;
        });
        tableDataTypeEl.addEventListener('input', event => {
            row.type = event.target.value;
        });
    }

    addRowBtn(tableDataEl) {
        const addRowBtn = document.createElement('button');
        addRowBtn.className = 'btn-default table-data-ctrl-btn table-data-add-row-btn';
        addRowBtn.innerHTML = 'Add row';

        addRowBtn.addEventListener('click', event => {
            const row = {
                type: 'String',
                name: `fieldName-${Math.round(Math.random() * 1000)}`
            };

            this.addRow(tableDataEl, row);
            this.entityData.rows.push(row);
        });

        return addRowBtn;
    }

    deleteTableBtn(tableDataEl) {
        const addRowBtn = document.createElement('button');
        addRowBtn.className = 'btn-default table-data-ctrl-btn table-data-delete-table-btn';
        addRowBtn.innerHTML = 'Delete table';

        addRowBtn.addEventListener('click', event => {
            console.log('Not implemented yet!');
        });

        return addRowBtn;
    }
}
