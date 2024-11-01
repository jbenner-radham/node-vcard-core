import type { IntRange } from 'type-fest';

type PREF_INCLUSIVE_FROM = 1;
type PREF_EXCLUSIVE_TO = 101;
type UppercaseAlpha = 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z';

export type Altid = number | string;
export type Calscale = 'gregorian';
export type Cardinality = '1' | '*1' | '1*' | '*';
export type Cc = `${UppercaseAlpha}${UppercaseAlpha}`;
export type Group = number | string;
export type HobbyOrInterestLevel = 'low' | 'medium' | 'high';
export type Pid = number | number[];
export type Pref = IntRange<PREF_INCLUSIVE_FROM, PREF_EXCLUSIVE_TO>;
export type Type = 'home' | 'work';
export type Value = 'boolean'
    | 'date'
    | 'date-and-or-time'
    | 'date-time'
    | 'float'
    | 'integer'
    | 'language-tag'
    | 'text'
    | 'time'
    | 'timestamp'
    | 'uri'
    | 'utc-offset';

export interface Options {
    group?: Group;
}
