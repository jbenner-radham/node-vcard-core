import Fn from './properties/Fn';
import Version from './properties/Version';

export type Cardinality = '1' | '*1' | '1*' | '*';
export type FnLike = Fn | string;
export type VersionLike = Version | string;
