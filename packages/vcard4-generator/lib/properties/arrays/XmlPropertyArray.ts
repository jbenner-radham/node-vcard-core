import XmlProperty, { type XmlConfig } from '../XmlProperty.js';

export default class XmlPropertyArray extends Array {
    push(...items: XmlConfig[]): number {
        items.forEach(item => super.push(XmlProperty.from(item)));

        return this.length;
    }
}
