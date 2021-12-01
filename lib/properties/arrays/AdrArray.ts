import Adr from '../Adr';

export default class AdrArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => {
            if (typeof item === 'string') super.push(new Adr(item));
            else if (item instanceof Adr) super.push(item);
            else throw new TypeError(`The value "${item}" is not a valid ADR format`);
        });

        return this.length;
    }
}
