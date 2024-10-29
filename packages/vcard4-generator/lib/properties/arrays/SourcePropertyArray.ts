import SourceProperty, { type SourcePropertyLike } from '../SourceProperty.js';

export default class SourcePropertyArray extends Array {
    push(...items: SourcePropertyLike[]): number {
        items.forEach(item => super.push(SourceProperty.factory(item)));

        return this.length;
    }
}
