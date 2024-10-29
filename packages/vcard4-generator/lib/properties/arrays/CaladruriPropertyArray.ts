import CaladruriProperty, { type CaladruriConfig } from '../CaladruriProperty.js';

export default class CaladruriPropertyArray extends Array {
    push(...items: CaladruriConfig[]): number {
        items.forEach(item => super.push(CaladruriProperty.from(item)));

        return this.length;
    }
}
