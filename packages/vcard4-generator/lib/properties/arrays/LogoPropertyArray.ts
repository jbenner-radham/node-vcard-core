import LogoProperty, { type LogoPropertyLike } from '../LogoProperty.js';

export default class LogoPropertyArray extends Array {
    push(...items: LogoPropertyLike[]): number {
        items.forEach(item => super.push(LogoProperty.factory(item)));

        return this.length;
    }
}
