import OrgProperty from '../OrgProperty';

export default class OrgPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(OrgProperty.factory(item)));

        return this.length;
    }
}
