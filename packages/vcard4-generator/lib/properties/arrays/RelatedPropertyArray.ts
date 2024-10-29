import RelatedProperty, { type RelatedPropertyLike } from '../RelatedProperty.js';

export default class RelatedPropertyArray extends Array {
    push(...items: RelatedPropertyLike[]): number {
        items.forEach(item => super.push(RelatedProperty.factory(item)));

        return this.length;
    }
}
