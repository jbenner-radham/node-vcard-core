import ImppProperty from '../ImppProperty.js';

export default class ImppPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(ImppProperty.factory(item)));

        return this.length;
    }
}
