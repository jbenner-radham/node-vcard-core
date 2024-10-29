import NoteProperty, { type NotePropertyLike } from '../NoteProperty.js';

export default class NotePropertyArray extends Array {
    push(...items: NotePropertyLike[]): number {
        items.forEach(item => super.push(NoteProperty.factory(item)));

        return this.length;
    }
}
