import InterestProperty, { type InterestConfig } from '../InterestProperty.js';

export default class InterestPropertyArray extends Array {
    push(...items: InterestConfig[]): number {
        items.forEach(item => super.push(InterestProperty.from(item)));

        return this.length;
    }
}
