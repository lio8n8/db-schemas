import { constants } from './js/constants.js';
import { DBSchema } from './js/DBSchema.js';
import { Table } from './js/Table.js';

console.log('Application started...');
const schema = new DBSchema();
schema.addTable();
schema.build();
