import AdrProperty, { AdrPropertyLike } from './properties/AdrProperty';
import AdrPropertyArray from './properties/arrays/AdrPropertyArray';
import AnniversaryProperty, { AnniversaryPropertyLike } from './properties/AnniversaryProperty';
import BdayProperty, { BdayPropertyLike } from './properties/BdayProperty';
import EmailProperty, { EmailPropertyLike } from './properties/EmailProperty';
import EmailPropertyArray from './properties/arrays/EmailPropertyArray';
import FnProperty, { FnPropertyLike } from './properties/FnProperty';
import FnPropertyArray from './properties/arrays/FnPropertyArray';
import GenderProperty, { GenderPropertyLike } from './properties/GenderProperty';
import KindProperty, { KindPropertyLike } from './properties/KindProperty';
import NProperty, { NPropertyLike } from './properties/NProperty';
import NicknameProperty, { NicknamePropertyLike } from './properties/NicknameProperty';
import NicknamePropertyArray from './properties/arrays/NicknamePropertyArray';
import NoteProperty, { NotePropertyLike } from './properties/NoteProperty';
import NotePropertyArray from './properties/arrays/NotePropertyArray';
import NullProperty from './properties/NullProperty';
import PhotoProperty, { PhotoPropertyLike } from './properties/PhotoProperty';
import PhotoPropertyArray from './properties/arrays/PhotoPropertyArray';
import RoleProperty, { RolePropertyLike } from './properties/RoleProperty';
import RolePropertyArray from './properties/arrays/RolePropertyArray';
import TitleProperty, { TitlePropertyLike } from './properties/TitleProperty';
import TitlePropertyArray from './properties/arrays/TitlePropertyArray';
import UrlProperty, { UrlPropertyLike } from './properties/UrlProperty';
import UrlPropertyArray from './properties/arrays/UrlPropertyArray';
import VersionProperty, { VersionPropertyLike } from './properties/VersionProperty';

export interface VcardConfig {
    adr?: AdrPropertyLike;
    anniversary?: AnniversaryPropertyLike;
    bday?: BdayPropertyLike;
    email?: EmailPropertyLike;
    fn?: FnPropertyLike;
    gender?: GenderPropertyLike;
    kind?: KindPropertyLike;
    n?: NPropertyLike;
    nickname?: NicknamePropertyLike;
    note?: NotePropertyLike;
    photo?: PhotoPropertyLike;
    role?: RolePropertyLike;
    title?: TitlePropertyLike;
    url?: UrlPropertyLike;
    version?: VersionProperty;
}

export default class Vcard {
    static readonly EOL: string = '\r\n';

    adr: AdrPropertyArray;

    anniversary: AnniversaryPropertyLike | NullProperty;

    bday: BdayPropertyLike | NullProperty;

    email: EmailPropertyArray;

    fn: FnPropertyArray;

    gender: GenderPropertyLike | NullProperty;

    kind: KindPropertyLike | NullProperty;

    n: NPropertyLike | NullProperty;

    nickname: NicknamePropertyArray;

    note: NotePropertyArray;

    photo: PhotoPropertyArray;

    role: RolePropertyArray;

    title: TitlePropertyArray;

    url: UrlPropertyArray;

    version: VersionPropertyLike;

    constructor(config: VcardConfig) {
        const {
            adr,
            anniversary,
            bday,
            email,
            fn,
            gender,
            kind,
            n,
            nickname,
            note,
            photo,
            role,
            title,
            url,
            version
        } = config;
        this.adr = new AdrPropertyArray();
        this.email = new EmailPropertyArray();
        this.fn = new FnPropertyArray();
        this.nickname = new NicknamePropertyArray();
        this.note = new NotePropertyArray();
        this.photo = new PhotoPropertyArray();
        this.role = new RolePropertyArray();
        this.title = new TitlePropertyArray();
        this.url = new UrlPropertyArray();
        adr && this.adr.push(adr);
        email && this.email.push(email);
        fn && this.fn.push(fn);
        nickname && this.nickname.push(nickname);
        note && this.note.push(note);
        photo && this.photo.push(photo);
        role && this.role.push(role);
        title && this.title.push(title);
        url && this.url.push(url);
        this.anniversary = anniversary ? AnniversaryProperty.factory(anniversary) : new NullProperty();
        this.bday = bday ? BdayProperty.factory(bday) : new NullProperty();
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
            this.anniversary.toString(),
            this.bday.toString(),
            ...this.email.map(toString),
            ...this.fn.map(toString),
            this.gender.toString(),
            this.kind.toString(),
            this.n.toString(),
            ...this.nickname.map(toString),
            ...this.note.map(toString),
            ...this.photo.map(toString),
            ...this.role.map(toString),
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

        if (!(this.anniversary instanceof AnniversaryProperty))
            throw new TypeError('The ANNIVERSARY property is invalid');

        if (!(this.bday instanceof BdayProperty))
            throw new TypeError('The BDAY property is invalid');

        if (!this.email.every(email => email instanceof EmailProperty))
            throw new TypeError('One or more EMAIL properties are invalid');

        if (!this.fn.every(fn => fn instanceof FnProperty))
            throw new TypeError('One or more FN properties are invalid');

        if (!this.nickname.every(nickname => nickname instanceof NicknameProperty))
            throw new TypeError('One or more NICKNAME properties are invalid');

        if (!this.note.every(note => note instanceof NoteProperty))
            throw new TypeError('One or more NOTE properties are invalid');

        if (!this.photo.every(photo => photo instanceof PhotoProperty))
            throw new TypeError('One or more PHOTO properties are invalid');

        if (!this.role.every(role => role instanceof RoleProperty))
            throw new TypeError('One or more ROLE properties are invalid');

        if (!this.title.every(title => title instanceof TitleProperty))
            throw new TypeError('One or more TITLE properties are invalid');

        if (!this.url.every(url => url instanceof UrlProperty))
            throw new TypeError('One or more URL properties are invalid');
    }
}
