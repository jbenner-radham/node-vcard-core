import SoundProperty, { type SoundConfig } from '../SoundProperty.js';

export default class SoundPropertyArray extends Array {
    push(...items: SoundConfig[]): number {
        items.forEach(item => super.push(SoundProperty.from(item)));

        return this.length;
    }
}
