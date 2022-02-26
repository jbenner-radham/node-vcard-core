import InterestProperty from '../InterestProperty';

export default class InterestPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(InterestProperty.factory(item)));

        return this.length;
    }
}
