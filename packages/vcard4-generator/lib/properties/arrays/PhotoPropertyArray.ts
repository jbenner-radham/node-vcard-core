import PhotoProperty, { type PhotoPropertyLike } from '../PhotoProperty.js';

export default class PhotoPropertyArray extends Array {
    push(...items: PhotoPropertyLike[]): number {
        items.forEach(item => super.push(PhotoProperty.factory(item)));

        return this.length;
    }
}
