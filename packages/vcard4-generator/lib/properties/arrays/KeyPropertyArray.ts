import KeyProperty, { type KeyConfig } from '../KeyProperty.js';

export default class KeyPropertyArray extends Array {
    push(...items: KeyConfig[]): number {
        items.forEach(item => super.push(KeyProperty.from(item)));

        return this.length;
    }
}
