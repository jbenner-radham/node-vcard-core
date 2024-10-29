import CaluriProperty, { type CaluriPropertyLike } from '../CaluriProperty.js';

export default class CaluriPropertyArray extends Array {
    push(...items: CaluriPropertyLike[]): number {
        items.forEach(item => super.push(CaluriProperty.factory(item)));

        return this.length;
    }
}
