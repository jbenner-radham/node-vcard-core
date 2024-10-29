import FburlProperty, { type FburlPropertyLike } from '../FburlProperty.js';

export default class FburlPropertyArray extends Array {
    push(...items: FburlPropertyLike[]): number {
        items.forEach(item => super.push(FburlProperty.factory(item)));

        return this.length;
    }
}
