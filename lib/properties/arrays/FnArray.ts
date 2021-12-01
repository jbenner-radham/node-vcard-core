import Fn from '../Fn';

export default class FnArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => {
            if (typeof item === 'string') super.push(new Fn(item));
            else if (item instanceof Fn) super.push(item);
            else throw new TypeError(`The value "${item}" is not a valid FN format`);
        });

        return this.length;
    }
}
