import CaladruriProperty, { type CaladruriPropertyLike } from '../CaladruriProperty.js';

export default class CaladruriPropertyArray extends Array {
    push(...items: CaladruriPropertyLike[]): number {
        items.forEach(item => super.push(CaladruriProperty.factory(item)));

        return this.length;
    }
}
