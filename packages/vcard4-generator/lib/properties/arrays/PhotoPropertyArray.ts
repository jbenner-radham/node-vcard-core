import PhotoProperty from '../PhotoProperty.js';

export default class PhotoPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(PhotoProperty.factory(item)));

        return this.length;
    }
}
