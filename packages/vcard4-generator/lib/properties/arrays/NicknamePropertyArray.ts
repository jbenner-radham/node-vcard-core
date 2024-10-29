import NicknameProperty, { type NicknamePropertyLike } from '../NicknameProperty.js';

export default class NicknamePropertyArray extends Array {
    push(...items: NicknamePropertyLike[]): number {
        items.forEach(item => super.push(NicknameProperty.factory(item)));

        return this.length;
    }
}
