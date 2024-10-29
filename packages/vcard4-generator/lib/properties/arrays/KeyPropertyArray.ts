import KeyProperty, { type KeyPropertyLike } from '../KeyProperty.js';

export default class KeyPropertyArray extends Array {
    push(...items: KeyPropertyLike[]): number {
        items.forEach(item => super.push(KeyProperty.factory(item)));

        return this.length;
    }
}
