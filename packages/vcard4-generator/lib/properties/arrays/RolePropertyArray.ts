import RoleProperty, { type RoleConfig } from '../RoleProperty.js';

export default class RolePropertyArray extends Array {
    push(...items: RoleConfig[]): number {
        items.forEach(item => super.push(RoleProperty.from(item)));

        return this.length;
    }
}
