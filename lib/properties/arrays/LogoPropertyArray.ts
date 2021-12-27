import LogoProperty from '../LogoProperty';

export default class LogoPropertyArray extends Array {
    push(...items: any[]): number {
        items.forEach(item => super.push(LogoProperty.factory(item)));

        return this.length;
    }
}
