import ClientpidmapProperty from '../ClientpidmapProperty';

export default class ClientpidmapPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(ClientpidmapProperty.factory(item)));

        return this.length;
    }
}
