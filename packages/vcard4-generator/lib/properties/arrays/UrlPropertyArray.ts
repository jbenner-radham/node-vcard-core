import UrlProperty, { type UrlConfig } from '../UrlProperty.js';

export default class UrlPropertyArray extends Array {
    push(...items: UrlConfig[]): number {
        items.forEach(item => super.push(UrlProperty.from(item)));

        return this.length;
    }
}
