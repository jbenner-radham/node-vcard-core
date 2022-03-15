import TzProperty from '../TzProperty';

export default class TzPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(TzProperty.factory(item)));

        return this.length;
    }
}
