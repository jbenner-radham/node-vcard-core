import OrgDirectoryProperty, { type OrgDirectoryPropertyLike } from '../OrgDirectoryProperty.js';

export default class OrgDirectoryPropertyArray extends Array {
    push(...items: OrgDirectoryPropertyLike[]): number {
        items.forEach(item => super.push(OrgDirectoryProperty.factory(item)));

        return this.length;
    }
}
