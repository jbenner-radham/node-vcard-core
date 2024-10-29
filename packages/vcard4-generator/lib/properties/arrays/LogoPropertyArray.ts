import LogoProperty, { type LogoConfig } from '../LogoProperty.js';

export default class LogoPropertyArray extends Array {
    push(...items: LogoConfig[]): number {
        items.forEach(item => super.push(LogoProperty.from(item)));

        return this.length;
    }
}
