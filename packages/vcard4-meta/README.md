@vcard/vcard4-meta
==================
[![Build Status][BUILD BADGE]][BUILD PAGE] [![npm Version][NPM BADGE]][NPM PAGE] [![Node Version][NODE BADGE]][NODE PAGE]

A [vCard 4](https://datatracker.ietf.org/doc/html/rfc6350) module which provides metadata about the format.

Install
-------
```sh-session
npm install @vcard/vcard4-meta
```

Usage
-----
```js
import {
    EOL, // The EOL for vCards (CRLF).
    FOLD_CONTINUATION_CHAR, // The fold continuation character preferred by the vCard.js suite (U+0020).
    FOLD_CONTINUATION_CHARS, // Valid fold continuation characters (horizontal tab and space).
    HORIZONTAL_TAB, // (U+0009)
    MAX_OCTETS_PER_LINE, // 75
    SEPARATOR, // (U+003B)
    SPACE // (U+0020)
} from '@vcard/vcard4-meta';
```

**NOTE**: This is a pure ESM package. See [here](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for details.

Building
--------
```sh-session
npm run build
```

Testing
--------
After building:

```sh-session
npm test
```

**NOTE**: This tests the entire monorepo, not just this package.

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.

[BUILD BADGE]: https://img.shields.io/github/workflow/status/jbenner-radham/vcardjs/CI?logo=github
[BUILD PAGE]: https://github.com/jbenner-radham/vcardjs/actions/workflows/ci.yaml
[NODE BADGE]: https://img.shields.io/node/v/@vcard/vcard4-meta?style=flat&logo=nodedotjs
[NODE PAGE]: https://nodejs.org/
[NPM BADGE]: https://img.shields.io/npm/v/@vcard/vcard4-meta?style=flat&logo=npm
[NPM PAGE]: https://www.npmjs.com/package/@vcard/vcard4-meta
