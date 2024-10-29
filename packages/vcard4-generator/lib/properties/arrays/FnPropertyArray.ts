import FnProperty, { type FnPropertyLike } from '../FnProperty.js';

export default class FnPropertyArray extends Array {
    push(...items: FnPropertyLike[]): number {
        items.forEach(item => super.push(FnProperty.factory(item)));

        return this.length;
    }
}
