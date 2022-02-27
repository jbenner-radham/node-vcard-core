import XmlProperty from '../XmlProperty';

export default class XmlPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(XmlProperty.factory(item)));

        return this.length;
    }
}
