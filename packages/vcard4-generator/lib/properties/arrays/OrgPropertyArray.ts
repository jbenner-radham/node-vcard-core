import OrgProperty, { type OrgConfig } from '../OrgProperty.js';

export default class OrgPropertyArray extends Array {
    push(...items: OrgConfig[]): number {
        items.forEach(item => super.push(OrgProperty.from(item)));

        return this.length;
    }
}
