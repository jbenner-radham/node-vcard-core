import SourceProperty from '../SourceProperty.js';

export default class SourcePropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(SourceProperty.factory(item)));

        return this.length;
    }
}
