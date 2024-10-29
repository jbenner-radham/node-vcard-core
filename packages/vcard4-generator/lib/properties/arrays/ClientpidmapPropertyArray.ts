import ClientpidmapProperty, { type ClientpidmapPropertyLike } from '../ClientpidmapProperty.js';

export default class ClientpidmapPropertyArray extends Array {
    push(...items: ClientpidmapPropertyLike[]): number {
        items.forEach(item => super.push(ClientpidmapProperty.factory(item)));

        return this.length;
    }
}
