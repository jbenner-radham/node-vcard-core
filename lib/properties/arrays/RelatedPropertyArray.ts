import RelatedProperty from '../RelatedProperty';

export default class RelatedPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(RelatedProperty.factory(item)));

        return this.length;
    }
}
