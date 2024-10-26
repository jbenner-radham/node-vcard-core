import GeoProperty from '../GeoProperty.js';

export default class GeoPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(GeoProperty.factory(item)));

        return this.length;
    }
}
