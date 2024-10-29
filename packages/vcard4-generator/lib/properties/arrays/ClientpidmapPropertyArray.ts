import ClientpidmapProperty, { type ClientpidmapConfig } from '../ClientpidmapProperty.js';

export default class ClientpidmapPropertyArray extends Array {
    push(...items: ClientpidmapConfig[]): number {
        items.forEach(item => super.push(ClientpidmapProperty.from(item)));

        return this.length;
    }
}
