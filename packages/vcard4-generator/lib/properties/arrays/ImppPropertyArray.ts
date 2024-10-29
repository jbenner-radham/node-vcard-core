import ImppProperty, { type ImppConfig } from '../ImppProperty.js';

export default class ImppPropertyArray extends Array {
    push(...items: ImppConfig[]): number {
        items.forEach(item => super.push(ImppProperty.from(item)));

        return this.length;
    }
}
