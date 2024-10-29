import TelProperty, { type TelPropertyLike } from '../TelProperty.js';

export default class TelPropertyArray extends Array {
    push(...items: TelPropertyLike[]): number {
        items.forEach(item => super.push(TelProperty.factory(item)));

        return this.length;
    }
}
