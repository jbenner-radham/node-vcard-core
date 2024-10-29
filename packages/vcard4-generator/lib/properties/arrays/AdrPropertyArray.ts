import AdrProperty, { type AdrPropertyLike } from '../AdrProperty.js';

export default class AdrPropertyArray extends Array {
    push(...items: AdrPropertyLike[]): number {
        items.forEach(item => super.push(AdrProperty.factory(item)));

        return this.length;
    }
}
