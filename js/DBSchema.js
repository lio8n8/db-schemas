import { DBSchemaMetadata } from './DBSchemaMetadata.js';
import { Table } from './Table.js';
import { Theme } from './Theme.js';
// import { data } from './data.js';
export class DBSchema {
    constructor(data) {
        this.data = data;
        this.titles = 'DB Schema'
        this.tables = [];
        this.metadata = new DBSchemaMetadata();

        this.svgEl = document.getElementById('schema');

        this.theme = new Theme();
        this.theme.init(event => {
            // TODO: Move to Theme class.
            if (this.theme.currentThemeEl) {
                this.theme.currentThemeEl.classList.remove('active');
            }
            this.theme.currentTheme = this.theme.themes.find(t => t.name == event.target.id);
            this.theme.setCurrentThemeEl(event.target);
            event.target.classList.add('active');

            // TODO: Check if theme was changed.
            this.clear();
            this.render();
        });
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    build() {
        /*this.tables.forEach(table => {
            this.svgEl.appendChild(table.svgEl);
        });*/
    }

    save() {

    }

    render() {

        // Set brackground.
        const backgroundEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        backgroundEl.setAttribute('fill', this.theme.getCurrentTheme().backgroundColor3);
        backgroundEl.setAttribute('width', '100%');
        backgroundEl.setAttribute('height', '100%');
        this.svgEl.appendChild(backgroundEl);

        // Add title.
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', this.data.title.x);
        title.setAttribute('y', this.data.title.y);
        title.setAttribute('font-size', this.theme.getCurrentTheme().schemaFontSize);
        title.setAttribute('font-weight', this.theme.getCurrentTheme().schemaFontWeight);
        title.setAttribute('fill', this.theme.getCurrentTheme().schemaColor);

        var textNode = document.createTextNode(this.data.title.content);
        title.appendChild(textNode);
        this.svgEl.appendChild(title);

        // Render tables.
        this.data.entityData.forEach(entitData => this.svgEl.appendChild(new Table(entitData, this.theme.getCurrentTheme()).getSvgEl()));
    }

    clear() {
        while (this.svgEl.childNodes.length > 0) {
            this.svgEl.removeChild(this.svgEl.lastChild);
        }
    }
}
