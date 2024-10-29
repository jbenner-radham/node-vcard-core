import GeoProperty, { type GeoConfig } from '../GeoProperty.js';

export default class GeoPropertyArray extends Array {
    push(...items: GeoConfig[]): number {
        items.forEach(item => super.push(GeoProperty.from(item)));

        return this.length;
    }
}
