import InterestProperty, { type InterestPropertyLike } from '../InterestProperty.js';

export default class InterestPropertyArray extends Array {
    push(...items: InterestPropertyLike[]): number {
        items.forEach(item => super.push(InterestProperty.factory(item)));

        return this.length;
    }
}
