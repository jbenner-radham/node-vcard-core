export const EOL = '\r\n';
export const HORIZONTAL_TAB = String.fromCharCode(9); // (U+0009)
export const SPACE = ' '; // (U+0020)
export const FOLD_CONTINUATION_CHAR = SPACE;
export const FOLD_CONTINUATION_CHARS = [HORIZONTAL_TAB, SPACE];
export const MAX_OCTETS_PER_LINE = 75;

// The semicolon is refered to as a "field separator" (§ 3.4),
// a "character separator" (§ 3.4), and a "component separator" (§ 6.3.1)
// in RFC6350. For simplicities sake this will be referred to as
// "separator". This constant name may change if clarification is acquired though.
export const SEPARATOR = ';'; // (U+003B)
