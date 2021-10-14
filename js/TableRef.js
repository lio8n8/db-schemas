export class TableRef {
    constructor(data) {
        this.x1 = data.x1;
        this.y1 = data.y1;
        this.x2 = data.x2;
        this.y2 = data.y2;
        this.table1 = data.table1;
        this.table2 = data.table2;
        this.table2Field = data.table2Field;

        this.pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        this.pathEl.setAttribute('points', `${this.x1} ${this.y1}, ${this.x2} ${this.y2}`);
        this.pathEl.setAttribute('fill', 'none');
        this.pathEl.setAttribute('stroke', 'green');
    }

    init() {

    }

    move() {

    }

    getPathEl() {

    }
}