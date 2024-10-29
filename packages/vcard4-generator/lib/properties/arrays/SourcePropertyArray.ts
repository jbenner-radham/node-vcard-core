import SourceProperty, { type SourceConfig } from '../SourceProperty.js';

export default class SourcePropertyArray extends Array {
    push(...items: SourceConfig[]): number {
        items.forEach(item => super.push(SourceProperty.from(item)));

        return this.length;
    }
}
