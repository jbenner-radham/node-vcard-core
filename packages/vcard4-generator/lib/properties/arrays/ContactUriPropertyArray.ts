import ContactUriProperty, { type ContactUriPropertyLike } from '../ContactUriProperty.js';

export default class ContactUriPropertyArray extends Array {
    push(...items: ContactUriPropertyLike[]): number {
        items.forEach(item => super.push(ContactUriProperty.factory(item)));

        return this.length;
    }
}
