import FnProperty from '../FnProperty';

export default class FnPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => {
            if (typeof item === 'string') super.push(new FnProperty(item));
            else if (item instanceof FnProperty) super.push(item);
            else throw new TypeError(`The value "${item}" is not a valid FN format`);
        });

        return this.length;
    }
}
