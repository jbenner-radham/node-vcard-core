import RoleProperty from '../RoleProperty.js';

export default class RolePropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(RoleProperty.factory(item)));

        return this.length;
    }
}
