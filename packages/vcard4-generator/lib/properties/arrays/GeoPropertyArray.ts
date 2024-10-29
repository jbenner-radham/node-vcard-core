import GeoProperty, { type GeoPropertyLike } from '../GeoProperty.js';

export default class GeoPropertyArray extends Array {
    push(...items: GeoPropertyLike[]): number {
        items.forEach(item => super.push(GeoProperty.factory(item)));

        return this.length;
    }
}
