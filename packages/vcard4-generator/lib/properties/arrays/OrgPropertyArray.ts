import OrgProperty, { type OrgPropertyLike } from '../OrgProperty.js';

export default class OrgPropertyArray extends Array {
    push(...items: OrgPropertyLike[]): number {
        items.forEach(item => super.push(OrgProperty.factory(item)));

        return this.length;
    }
}
