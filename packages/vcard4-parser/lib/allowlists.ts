import type { Parameter, Property } from './types.js';

const PARAMETER_ALLOWLISTS: Record<Property, Set<Parameter>> = {
    ADR: new Set([
        'ALTID',
        'GEO',
        'LABEL',
        'LANGUAGE',
        'PID',
        'PREF',
        'TYPE',
        'TZ',
        'VALUE'
    ]),
    ANNIVERSARY: new Set([
        'ALTID',
        'CALSCALE',
        'VALUE'
    ]),
    BDAY: new Set([
        'ALTID',
        'CALSCALE',
        'LANGUAGE',
        'VALUE'
    ]),
    BEGIN: new Set([]),
    BIRTHPLACE: new Set([
        'LANGUAGE',
        'VALUE'
    ]),
    CALADRURI: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    CALURI: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    CATEGORIES: new Set([
        'ALTID',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    CLIENTPIDMAP: new Set([]),
    'CONTACT-URI': new Set([
        'PREF',
        'VALUE'
    ]),
    DEATHDATE: new Set([
        'ALTID',
        'CALSCALE',
        'LANGUAGE',
        'VALUE'
    ]),
    DEATHPLACE: new Set([
        'ALTID',
        'LANGUAGE',
        'VALUE'
    ]),
    EMAIL: new Set([
        'ALTID',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    END: new Set([]),
    EXPERTISE: new Set([
        'ALTID',
        'INDEX',
        'LANGUAGE',
        'LEVEL',
        'PREF',
        'TYPE'
    ]),
    FBURL: new Set([
        'ALTID',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    FN: new Set([
        'ALTID',
        'LANGUAGE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    GENDER: new Set([
        'VALUE'
    ]),
    GEO: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    HOBBY: new Set([
        'ALTID',
        'INDEX',
        'LANGUAGE',
        'LEVEL',
        'PREF',
        'TYPE'
    ]),
    IMPP: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    INTEREST: new Set([
        'ALTID',
        'INDEX',
        'LANGUAGE',
        'LEVEL',
        'PREF',
        'TYPE'
    ]),
    KEY: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    KIND: new Set([
        'VALUE'
    ]),
    LANG: new Set([
        'ALTID',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    LOGO: new Set([
        'ALTID',
        'LANGUAGE',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    MEMBER: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'VALUE'
    ]),
    N: new Set([
        'ALTID',
        'LANGUAGE',
        'SORT-AS',
        'VALUE'
    ]),
    NICKNAME: new Set([
        'ALTID',
        'LANGUAGE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    NOTE: new Set([
        'ALTID',
        'LANGUAGE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    ORG: new Set([
        'ALTID',
        'LANGUAGE',
        'PID',
        'PREF',
        'SORT-AS',
        'TYPE',
        'VALUE'
    ]),
    'ORG-DIRECTORY': new Set([
        'ALTID',
        'INDEX',
        'LANGUAGE',
        'PID',
        'PREF',
        'TYPE'
    ]),
    PHOTO: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    PRODID: new Set([
        'VALUE'
    ]),
    RELATED: new Set([
        'ALTID',
        'LANGUAGE',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    REV: new Set([
        'VALUE'
    ]),
    ROLE: new Set([
        'ALTID',
        'LANGUAGE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    SOUND: new Set([
        'ALTID',
        'LANGUAGE',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    SOURCE: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'VALUE'
    ]),
    TEL: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    TITLE: new Set([
        'ALTID',
        'LANGUAGE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    TZ: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    UID: new Set([
        'VALUE'
    ]),
    URL: new Set([
        'ALTID',
        'MEDIATYPE',
        'PID',
        'PREF',
        'TYPE',
        'VALUE'
    ]),
    VERSION: new Set([]),
    XML: new Set([
        'ALTID',
        'VALUE'
    ])
};

const PROPERTY_ALLOWLIST: Set<Property> = new Set([
    'ADR',
    'ANNIVERSARY',
    'BDAY',
    'BEGIN',
    'BIRTHPLACE',
    'CALADRURI',
    'CALURI',
    'CATEGORIES',
    'CLIENTPIDMAP',
    'CONTACT-URI',
    'DEATHDATE',
    'DEATHPLACE',
    'EMAIL',
    'END',
    'EXPERTISE',
    'FBURL',
    'FN',
    'GENDER',
    'GEO',
    'HOBBY',
    'IMPP',
    'INTEREST',
    'KEY',
    'KIND',
    'LANG',
    'LOGO',
    'MEMBER',
    'N',
    'NICKNAME',
    'NOTE',
    'ORG',
    'ORG-DIRECTORY',
    'PHOTO',
    'PRODID',
    'RELATED',
    'REV',
    'ROLE',
    'SOUND',
    'SOURCE',
    'TEL',
    'TITLE',
    'TZ',
    'UID',
    'URL',
    'VERSION',
    'XML'
]);

export { PARAMETER_ALLOWLISTS, PROPERTY_ALLOWLIST };
