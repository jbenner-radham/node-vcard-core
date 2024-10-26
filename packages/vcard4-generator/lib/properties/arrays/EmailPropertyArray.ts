import EmailProperty from '../EmailProperty.js';

export default class EmailPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(EmailProperty.factory(item)));

        return this.length;
    }
}
