import MemberProperty from '../MemberProperty.js';

export default class MemberPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(MemberProperty.factory(item)));

        return this.length;
    }
}
