import TelProperty, { type TelConfig } from '../TelProperty.js';

export default class TelPropertyArray extends Array {
    push(...items: TelConfig[]): number {
        items.forEach(item => super.push(TelProperty.from(item)));

        return this.length;
    }
}
