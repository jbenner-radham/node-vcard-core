import FnProperty from '../FnProperty.js';

export default class FnPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(FnProperty.factory(item)));

        return this.length;
    }
}
