import EmailProperty, { type EmailPropertyLike } from '../EmailProperty.js';

export default class EmailPropertyArray extends Array {
    push(...items: EmailPropertyLike[]): number {
        items.forEach(item => super.push(EmailProperty.factory(item)));

        return this.length;
    }
}
