import ContactUriProperty, { type ContactUriConfig } from '../ContactUriProperty.js';

export default class ContactUriPropertyArray extends Array {
    push(...items: ContactUriConfig[]): number {
        items.forEach(item => super.push(ContactUriProperty.from(item)));

        return this.length;
    }
}
