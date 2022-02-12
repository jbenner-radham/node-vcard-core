const _ = require('lodash');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');
const renderTemplate = require('./render-template.cjs');

if (process.argv.length < 3) {
    console.error('No property name was specified.');
    process.exit(1);
}

const upperCamelCase = (string) => _.upperFirst(_.camelCase(string));

Handlebars.registerHelper('camelCase', (string) => _.camelCase(string));
Handlebars.registerHelper('upperCamelCase', (string) => upperCamelCase(string));
Handlebars.registerHelper('upperCase', (string) => string.toUpperCase());

const cardinalityDescriptions = {
    '*': 'One or more instances per vCard MAY be present.',
    '*1': 'Exactly one instance per vCard MAY be present.',
    1: 'Exactly one instance per vCard MUST be present.',
    '1*': 'One or more instances per vCard MUST be present.'
};
const cardinality = process.argv[3] ?? '...';
const cardinalityDescription = cardinalityDescriptions[cardinality] ?? '...';
const property = process.argv[2];
const propertySrc = renderTemplate('Property.ts.hbs', { cardinality, cardinalityDescription, property });

console.log(propertySrc);

const specSrc = renderTemplate('Property.spec.ts.hbs', { property });

console.log('-'.repeat(80) + '\n');
console.log(specSrc);

if (!['*', '1*'].includes(cardinality)) process.exit(0);

const propertyArraySrc = renderTemplate('PropertyArray.ts.hbs', { property });

console.log('-'.repeat(80) + '\n');
console.log(propertyArraySrc);

const propertyArraySpecSrc = renderTemplate('PropertyArray.spec.ts.hbs', { property });

console.log('-'.repeat(80) + '\n');
console.log(propertyArraySpecSrc);
