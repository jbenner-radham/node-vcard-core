import CaladruriProperty from '../CaladruriProperty.js';

export default class CaladruriPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(CaladruriProperty.factory(item)));

        return this.length;
    }
}
