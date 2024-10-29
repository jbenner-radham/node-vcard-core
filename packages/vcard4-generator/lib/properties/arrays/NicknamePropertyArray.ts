import NicknameProperty, { type NicknameConfig } from '../NicknameProperty.js';

export default class NicknamePropertyArray extends Array {
    push(...items: NicknameConfig[]): number {
        items.forEach(item => super.push(NicknameProperty.from(item)));

        return this.length;
    }
}
