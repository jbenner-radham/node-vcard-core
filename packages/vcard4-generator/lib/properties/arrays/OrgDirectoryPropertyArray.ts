import OrgDirectoryProperty, { type OrgDirectoryConfig } from '../OrgDirectoryProperty.js';

export default class OrgDirectoryPropertyArray extends Array {
    push(...items: OrgDirectoryConfig[]): number {
        items.forEach(item => super.push(OrgDirectoryProperty.from(item)));

        return this.length;
    }
}
