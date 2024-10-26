import TelProperty from '../TelProperty.js';

export default class TelPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(TelProperty.factory(item)));

        return this.length;
    }
}
