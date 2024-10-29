import MemberProperty, { type MemberPropertyLike } from '../MemberProperty.js';

export default class MemberPropertyArray extends Array {
    push(...items: MemberPropertyLike[]): number {
        items.forEach(item => super.push(MemberProperty.factory(item)));

        return this.length;
    }
}
