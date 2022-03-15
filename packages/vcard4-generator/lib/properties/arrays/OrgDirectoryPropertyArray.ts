import OrgDirectoryProperty from '../OrgDirectoryProperty';

export default class OrgDirectoryPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(OrgDirectoryProperty.factory(item)));

        return this.length;
    }
}
