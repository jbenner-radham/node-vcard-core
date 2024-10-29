import NoteProperty, { type NoteConfig } from '../NoteProperty.js';

export default class NotePropertyArray extends Array {
    push(...items: NoteConfig[]): number {
        items.forEach(item => super.push(NoteProperty.from(item)));

        return this.length;
    }
}
