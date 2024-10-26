import FburlProperty from '../FburlProperty.js';

export default class FburlPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(FburlProperty.factory(item)));

        return this.length;
    }
}
