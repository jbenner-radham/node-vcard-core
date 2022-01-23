const pkg = require('./package.json');

const versionMatcher = /^\^(?<majorMinorVersion>\d+\.\d+)/;
const [, corejsVersion] = versionMatcher.exec(pkg.dependencies['core-js']);

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                corejs: { version: corejsVersion },
                targets: 'defaults',
                useBuiltIns: 'usage'
            }
        ],
        '@babel/preset-typescript'
    ]
};
