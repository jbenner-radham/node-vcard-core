import AdrProperty from '../AdrProperty';

export default class AdrPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => {
            if (typeof item === 'string') super.push(new AdrProperty(item));
            else if (item instanceof AdrProperty) super.push(item);
            else throw new TypeError(`The value "${item}" is not a valid ADR format`);
        });

        return this.length;
    }
}
