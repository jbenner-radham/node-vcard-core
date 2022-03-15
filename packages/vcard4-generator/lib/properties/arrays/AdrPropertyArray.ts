import AdrProperty from '../AdrProperty';

export default class AdrPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(AdrProperty.factory(item)));

        return this.length;
    }
}
