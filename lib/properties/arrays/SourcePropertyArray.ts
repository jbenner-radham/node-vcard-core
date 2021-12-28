import SourceProperty from '../SourceProperty';

export default class SourcePropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(SourceProperty.factory(item)));

        return this.length;
    }
}
