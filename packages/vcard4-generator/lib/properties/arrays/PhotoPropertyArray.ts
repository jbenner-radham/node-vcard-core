import PhotoProperty, { type PhotoConfig } from '../PhotoProperty.js';

export default class PhotoPropertyArray extends Array {
    push(...items: PhotoConfig[]): number {
        items.forEach(item => super.push(PhotoProperty.from(item)));

        return this.length;
    }
}
