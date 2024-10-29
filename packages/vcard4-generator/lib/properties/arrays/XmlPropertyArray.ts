import XmlProperty, { type XmlPropertyLike } from '../XmlProperty.js';

export default class XmlPropertyArray extends Array {
    push(...items: XmlPropertyLike[]): number {
        items.forEach(item => super.push(XmlProperty.factory(item)));

        return this.length;
    }
}
