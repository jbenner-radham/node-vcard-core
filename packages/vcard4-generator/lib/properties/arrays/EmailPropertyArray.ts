import EmailProperty, { type EmailConfig } from '../EmailProperty.js';

export default class EmailPropertyArray extends Array {
    push(...items: EmailConfig[]): number {
        items.forEach(item => super.push(EmailProperty.from(item)));

        return this.length;
    }
}
