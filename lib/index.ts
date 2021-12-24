import AdrProperty, { AdrPropertyLike } from './properties/AdrProperty';
import AdrPropertyArray from './properties/arrays/AdrPropertyArray';
import FnProperty, { FnPropertyLike } from './properties/FnProperty';
import FnPropertyArray from './properties/arrays/FnPropertyArray';
import GenderProperty, { GenderPropertyLike } from './properties/GenderProperty';
import KindProperty, { KindPropertyLike } from './properties/KindProperty';
import NProperty, { NPropertyLike } from './properties/NProperty';
import NullProperty from './properties/NullProperty';
// import UrlProperty, { UrlPropertyLike } from './properties/UrlProperty';
import VersionProperty, { VersionPropertyLike } from './properties/VersionProperty';

export interface VcardConfig {
    adr?: AdrPropertyLike;
    fn?: FnPropertyLike;
    gender?: GenderPropertyLike;
    kind?: KindPropertyLike;
    n?: NPropertyLike;
    version?: VersionProperty;
}

export default class Vcard {
    static readonly EOL: string = '\r\n';

    adr: AdrPropertyArray;

    fn: FnPropertyArray;

    gender: GenderPropertyLike | NullProperty;

    kind: KindPropertyLike | NullProperty;

    n: NPropertyLike | NullProperty;

    version: VersionPropertyLike;

    constructor({ adr, fn, gender, kind, n, version }: VcardConfig) {
        this.adr = new AdrPropertyArray();
        this.fn = new FnPropertyArray();
        adr && this.adr.push(adr);
        fn && this.fn.push(fn);
        this.gender = gender ? GenderProperty.factory(gender) : new NullProperty();
        this.kind = kind ? KindProperty.factory(kind) : new NullProperty();
        this.n = n ? NProperty.factory(n) : new NullProperty();
        this.version = version ? VersionProperty.factory(version) : new VersionProperty();
    }

    toString(): string {
        const properties = [
            'BEGIN:VCARD',
            this.version.toString(),
            ...this.fn.map(fn => fn.toString()),
            this.gender.toString(),
            this.kind.toString(),
            this.n.toString(),
            'END:VCARD'
        ];
        const isNotEmptyString = (value: string): boolean => value !== '';

        return properties
            .filter(isNotEmptyString)
            .join(Vcard.EOL);
    }

    validate(): void {
        if (!(this.version instanceof VersionProperty))
            throw new TypeError('The VERSION property is invalid');

        if (this.fn.length === 0)
            throw new TypeError('The FN property is required');

        if (!this.adr.every(adr => adr instanceof AdrProperty))
            throw new TypeError('One or more ADR properties are invalid');

        if (!this.fn.every(fn => fn instanceof FnProperty))
            throw new TypeError('One or more FN properties are invalid');
    }
}
