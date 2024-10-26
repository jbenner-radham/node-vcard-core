import NoteProperty from '../NoteProperty.js';

export default class NotePropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(NoteProperty.factory(item)));

        return this.length;
    }
}
