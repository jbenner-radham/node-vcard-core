import ContactUriProperty from '../ContactUriProperty';

export default class ContactUriPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(ContactUriProperty.factory(item)));

        return this.length;
    }
}
