import UrlProperty, { type UrlPropertyLike } from '../UrlProperty.js';

export default class UrlPropertyArray extends Array {
    push(...items: UrlPropertyLike[]): number {
        items.forEach(item => super.push(UrlProperty.factory(item)));

        return this.length;
    }
}
