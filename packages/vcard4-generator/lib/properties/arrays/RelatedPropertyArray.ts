import RelatedProperty, { type RelatedConfig } from '../RelatedProperty.js';

export default class RelatedPropertyArray extends Array {
    push(...items: RelatedConfig[]): number {
        items.forEach(item => super.push(RelatedProperty.from(item)));

        return this.length;
    }
}
