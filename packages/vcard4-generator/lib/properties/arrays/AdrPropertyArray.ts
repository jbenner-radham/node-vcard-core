import AdrProperty, { type AdrConfig } from '../AdrProperty.js';

export default class AdrPropertyArray extends Array {
    push(...items: AdrConfig[]): number {
        items.forEach(item => super.push(AdrProperty.from(item)));

        return this.length;
    }
}
