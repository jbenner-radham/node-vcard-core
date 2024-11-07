const _ = require('lodash');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');
const renderTemplate = require('./render-template.cjs');

if (process.argv.length < 3) {
    console.error('No property name was specified.');
    process.exit(1);
}

const pascalCase = string => _.upperFirst(_.camelCase(string));
const upperKebabCase = string => _.kebabCase(string).toUpperCase();

Handlebars.registerHelper('camelCase', string => _.camelCase(string));
Handlebars.registerHelper('pascalCase', string => pascalCase(string));
Handlebars.registerHelper('upperKebabCase', string => upperKebabCase(string));

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
const propertyFilename = `${pascalCase(property)}Property.ts`;
const propertyFilepath = path.resolve(__dirname, '..', 'lib', 'properties', propertyFilename);

fs.writeFileSync(propertyFilepath, propertySrc);

console.log(`Created: ${propertyFilepath}`);

const specSrc = renderTemplate('Property.spec.ts.hbs', { property });
const specFilename = `${pascalCase(property)}Property.spec.ts`;
const specFilepath = path.resolve(__dirname, '..', 'test', 'properties', specFilename);

fs.writeFileSync(specFilepath, specSrc);

console.log(`Created: ${specFilepath}`);

if (!['*', '1*'].includes(cardinality)) process.exit(0);

const propertyArraySrc = renderTemplate('PropertyArray.ts.hbs', { property });
const propertyArrayFilename = `${pascalCase(property)}PropertyArray.ts`;
const propertyArrayFilepath = path.resolve(__dirname, '..', 'lib', 'properties', 'arrays', propertyArrayFilename);

fs.writeFileSync(propertyArrayFilepath, propertyArraySrc);

console.log(`Created: ${propertyArrayFilepath}`);

const propertyArraySpecSrc = renderTemplate('PropertyArray.spec.ts.hbs', { property });
const propertyArraySpecFilename = `${pascalCase(property)}PropertyArray.spec.ts`;
const propertyArraySpecFilepath = path.resolve(
    __dirname,
    '..',
    'test',
    'properties',
    'arrays',
    propertyArraySpecFilename
);

fs.writeFileSync(propertyArraySpecFilepath, propertyArraySpecSrc);

console.log(`Created: ${propertyArraySpecFilepath}`);
