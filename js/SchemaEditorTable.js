export class SchemaEditorTable {
    constructor(entityData) {
        this.schemaEditorEl = document.getElementById('schema-editor');
        this.entityData = entityData;
    }

    generateTableDataElAndAppend() {
        const tableDataEl = document.createElement('div');
        tableDataEl.className = "table-data";
        tableDataEl.setAttribute('isOpen', 'false');

        const deleteTableIconEl = document.createElement('img');
        deleteTableIconEl.className = 'delete-table-data-icon';
        deleteTableIconEl.src = 'src/images/delete.svg';

        tableDataEl.appendChild(deleteTableIconEl);

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
            const tableDataRowEl = document.createElement('div');
            tableDataRowEl.className = "table-data-row";

            const tableDataNameEl = document.createElement('input');
            tableDataNameEl.className = "table-data-name";
            tableDataNameEl.value = row.name;

            const tableDataTypeEl = document.createElement('input');
            tableDataTypeEl.className = "table-data-type";
            tableDataTypeEl.value = row.type;

            tableDataRowEl.appendChild(tableDataNameEl);
            tableDataRowEl.appendChild(tableDataTypeEl);

            tableDataEl.appendChild(tableDataRowEl);
        });

        this.schemaEditorEl.appendChild(tableDataEl);

        return tableDataEl;
    }
}
