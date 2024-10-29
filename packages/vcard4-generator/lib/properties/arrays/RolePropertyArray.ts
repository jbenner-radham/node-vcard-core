import RoleProperty, { type RolePropertyLike } from '../RoleProperty.js';

export default class RolePropertyArray extends Array {
    push(...items: RolePropertyLike[]): number {
        items.forEach(item => super.push(RoleProperty.factory(item)));

        return this.length;
    }
}
