import FburlProperty, { type FburlConfig } from '../FburlProperty.js';

export default class FburlPropertyArray extends Array {
    push(...items: FburlConfig[]): number {
        items.forEach(item => super.push(FburlProperty.from(item)));

        return this.length;
    }
}
