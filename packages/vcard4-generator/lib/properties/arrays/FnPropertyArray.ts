import FnProperty, { type FnConfig } from '../FnProperty.js';

export default class FnPropertyArray extends Array {
    push(...items: FnConfig[]): number {
        items.forEach(item => super.push(FnProperty.from(item)));

        return this.length;
    }
}
