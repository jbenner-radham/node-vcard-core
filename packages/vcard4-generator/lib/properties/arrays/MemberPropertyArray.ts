import MemberProperty, { type MemberConfig } from '../MemberProperty.js';

export default class MemberPropertyArray extends Array {
    push(...items: MemberConfig[]): number {
        items.forEach(item => super.push(MemberProperty.from(item)));

        return this.length;
    }
}
