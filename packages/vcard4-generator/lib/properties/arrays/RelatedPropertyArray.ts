import RelatedProperty from '../RelatedProperty.js';

export default class RelatedPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(RelatedProperty.factory(item)));

        return this.length;
    }
}
