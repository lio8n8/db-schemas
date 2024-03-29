import { data } from './data/example.js';

export class DataRepository {

    constructor() {
        this.data = data || {
            title: {
                position: {
                    x: '30%',
                    y: '50'
                },
                description: 'Example'
            },
            entityData: [],
            refs: []
        };
    }

    getData() {
        return this.data;
    }

    getEntities() {
        return this.data.entityData;
    }

    findEntityByName(name) {
        return this.data.entityData.find(entity => entity.name == name);
    }

    getRefs() {
        return this.data.refs;
    }

    addEntity(entity) {
        this.data.entityData.push(entity);

        return this.data.entityData;
    }

    deleteByEntityName(name) {
        if (this.data.entityData.length <= 0) {
            return [];
        }

        this.data.entityData.forEach(e, i => {
            if (e.name == name) {
                this.data.entityData.slice(i, 1);
                throw e.getTargetException();
            }
        });

        return this.data.entityData;
    }

    updateTitle(title) {
        this.data.title = title;

        return this.data.title;
    }

    save(data) {
        this.data = data;

        return this.data;
    }

    updateEntity(name, data) {
        const entity = this.findEntityByName(name);

        console.log(entity);
    }
}
