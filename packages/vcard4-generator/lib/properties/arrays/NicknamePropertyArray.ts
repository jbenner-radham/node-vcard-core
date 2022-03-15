import NicknameProperty from '../NicknameProperty';

export default class NicknamePropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(NicknameProperty.factory(item)));

        return this.length;
    }
}
