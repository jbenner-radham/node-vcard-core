import AdrProperty, { AdrPropertyLike } from './properties/AdrProperty';
import AdrPropertyArray from './properties/arrays/AdrPropertyArray';
import FnProperty, { FnPropertyLike } from './properties/FnProperty';
import FnPropertyArray from './properties/arrays/FnPropertyArray';
import GenderProperty, { GenderPropertyLike } from './properties/GenderProperty';
import KindProperty, { KindPropertyLike } from './properties/KindProperty';
import NProperty, { NPropertyLike } from './properties/NProperty';
import NicknameProperty, { NicknamePropertyLike } from './properties/NicknameProperty';
import NicknamePropertyArray from './properties/arrays/NicknamePropertyArray';
import NullProperty from './properties/NullProperty';
import TitleProperty, { TitlePropertyLike } from './properties/TitleProperty';
import TitlePropertyArray from './properties/arrays/TitlePropertyArray';
import UrlProperty, { UrlPropertyLike } from './properties/UrlProperty';
import UrlPropertyArray from './properties/arrays/UrlPropertyArray';
import VersionProperty, { VersionPropertyLike } from './properties/VersionProperty';

export interface VcardConfig {
    adr?: AdrPropertyLike;
    fn?: FnPropertyLike;
    gender?: GenderPropertyLike;
    kind?: KindPropertyLike;
    n?: NPropertyLike;
    nickname?: NicknamePropertyLike;
    title?: TitlePropertyLike;
    url?: UrlPropertyLike;
    version?: VersionProperty;
}

export default class Vcard {
    static readonly EOL: string = '\r\n';

    adr: AdrPropertyArray;

    fn: FnPropertyArray;

    gender: GenderPropertyLike | NullProperty;

    kind: KindPropertyLike | NullProperty;

    n: NPropertyLike | NullProperty;

    nickname: NicknamePropertyArray;

    title: TitlePropertyArray;

    url: UrlPropertyArray;

    version: VersionPropertyLike;

    constructor({ adr, fn, gender, kind, n, nickname, title, url, version }: VcardConfig) {
        this.adr = new AdrPropertyArray();
        this.fn = new FnPropertyArray();
        this.nickname = new NicknamePropertyArray();
        this.title = new TitlePropertyArray();
        this.url = new UrlPropertyArray();
        adr && this.adr.push(adr);
        fn && this.fn.push(fn);
        nickname && this.nickname.push(nickname);
        title && this.title.push(title);
        url && this.url.push(url);
        this.gender = gender ? GenderProperty.factory(gender) : new NullProperty();
        this.kind = kind ? KindProperty.factory(kind) : new NullProperty();
        this.n = n ? NProperty.factory(n) : new NullProperty();
        this.version = version ? VersionProperty.factory(version) : new VersionProperty();
    }

    toString(): string {
        const toString = (value: any): string => value.toString();
        const properties = [
            'BEGIN:VCARD',
            this.version.toString(),
            ...this.fn.map(toString),
            this.gender.toString(),
            this.kind.toString(),
            this.n.toString(),
            ...this.nickname.map(toString),
            ...this.title.map(toString),
            ...this.url.map(toString),
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

        if (!this.nickname.every(nickname => nickname instanceof NicknameProperty))
            throw new TypeError('One or more NICKNAME properties are invalid');

        if (!this.title.every(title => title instanceof TitleProperty))
            throw new TypeError('One or more TITLE properties are invalid');

        if (!this.url.every(url => url instanceof UrlProperty))
            throw new TypeError('One or more URL properties are invalid');
    }
}
