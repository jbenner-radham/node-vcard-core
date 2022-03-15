import KeyProperty from '../KeyProperty';

export default class KeyPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(KeyProperty.factory(item)));

        return this.length;
    }
}
