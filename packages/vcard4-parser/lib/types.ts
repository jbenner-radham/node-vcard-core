import type { CamelCase } from 'type-fest';

export type Parameter = 'ALTID'
    | 'CALSCALE'
    | 'GEO'
    | 'INDEX' // for EXPERTISE, HOBBY, INTEREST, and ORG-DIRECTORY
    | 'LABEL' // for ADR
    | 'LANGUAGE'
    | 'LEVEL' // for EXPERTISE, HOBBY, and INTEREST
    | 'MEDIATYPE'
    | 'PID'
    | 'PREF'
    | 'SORT-AS'
    | 'TYPE'
    | 'TZ'
    | 'VALUE';

export type Parameters = Partial<Record<CamelCase<Parameter>, string>>;

export type Property = 'ADR'
    | 'ANNIVERSARY'
    | 'BDAY'
    | 'BEGIN'
    | 'BIRTHPLACE' // (RFC6474)
    | 'CALADRURI'
    | 'CALURI'
    | 'CATEGORIES'
    | 'CLIENTPIDMAP'
    | 'CONTACT-URI' // (RFC8605)
    | 'DEATHDATE' // (RFC6474)
    | 'DEATHPLACE' // (RFC6474)
    | 'EMAIL'
    | 'END'
    | 'EXPERTISE' // (RFC6715)
    | 'FBURL'
    | 'FN'
    | 'GENDER'
    | 'GEO'
    | 'HOBBY' // (RFC6715)
    | 'IMPP'
    | 'INTEREST' // (RFC6715)
    | 'KEY'
    | 'KIND'
    | 'LANG'
    | 'LOGO'
    | 'MEMBER'
    | 'N'
    | 'NICKNAME'
    | 'NOTE'
    | 'ORG'
    | 'ORG-DIRECTORY' // (RFC6715)
    | 'PHOTO'
    | 'PRODID'
    | 'RELATED'
    | 'REV'
    | 'ROLE'
    | 'SOUND'
    | 'SOURCE'
    | 'TEL'
    | 'TITLE'
    | 'TZ'
    | 'UID'
    | 'URL'
    | 'VERSION'
    | 'XML';
