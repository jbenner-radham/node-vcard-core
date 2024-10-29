import TzProperty, { type TzConfig } from '../TzProperty.js';

export default class TzPropertyArray extends Array {
    push(...items: TzConfig[]): number {
        items.forEach(item => super.push(TzProperty.from(item)));

        return this.length;
    }
}
