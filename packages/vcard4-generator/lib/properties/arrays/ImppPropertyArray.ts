import ImppProperty, { type ImppPropertyLike } from '../ImppProperty.js';

export default class ImppPropertyArray extends Array {
    push(...items: ImppPropertyLike[]): number {
        items.forEach(item => super.push(ImppProperty.factory(item)));

        return this.length;
    }
}
