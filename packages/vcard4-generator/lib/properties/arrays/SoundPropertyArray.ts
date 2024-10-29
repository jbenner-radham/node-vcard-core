import SoundProperty, { type SoundPropertyLike } from '../SoundProperty.js';

export default class SoundPropertyArray extends Array {
    push(...items: SoundPropertyLike[]): number {
        items.forEach(item => super.push(SoundProperty.factory(item)));

        return this.length;
    }
}
