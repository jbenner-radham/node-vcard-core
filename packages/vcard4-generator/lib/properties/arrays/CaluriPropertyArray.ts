import CaluriProperty, { type CaluriConfig } from '../CaluriProperty.js';

export default class CaluriPropertyArray extends Array {
    push(...items: CaluriConfig[]): number {
        items.forEach(item => super.push(CaluriProperty.from(item)));

        return this.length;
    }
}
