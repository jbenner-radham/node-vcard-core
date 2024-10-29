import TzProperty, { type TzPropertyLike } from '../TzProperty.js';

export default class TzPropertyArray extends Array {
    push(...items: TzPropertyLike[]): number {
        items.forEach(item => super.push(TzProperty.factory(item)));

        return this.length;
    }
}
