/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

if (process.argv.length < 3) {
    console.error('No property name was specified.');
    process.exit(1);
}

Handlebars.registerHelper('capitalize', (string) => _.capitalize(string));
Handlebars.registerHelper('upperCase', (string) => string.toUpperCase());
Handlebars.registerHelper('lowerCase', (string) => string.toLowerCase());

const cardinality = process.argv[3] ?? '...';
const property = process.argv[2];
const propertyTemplateFilepath = path.resolve(__dirname, '..', '.template', 'Property.hbs');
const propertyTemplateSrc = fs.readFileSync(propertyTemplateFilepath).toString();
const propertyTemplate = Handlebars.compile(propertyTemplateSrc);
const propertySrc = propertyTemplate({ cardinality, property });
const propertyFilename = `${_.capitalize(property)}Property.ts`;
const propertyFilepath = path.resolve(__dirname, '..', 'lib', 'properties', propertyFilename);

fs.writeFileSync(propertyFilepath, propertySrc);

console.log(`Created: ${propertyFilepath}`);

const specTemplateFilepath = path.resolve(__dirname, '..', '.template', 'Property.spec.hbs');
const specTemplateSrc = fs.readFileSync(specTemplateFilepath).toString();
const specTemplate = Handlebars.compile(specTemplateSrc);
const specSrc = specTemplate({ property });
const specFilename = `${_.capitalize(property)}Property.spec.ts`;
const specFilepath = path.resolve(__dirname, '..', 'test', 'properties', specFilename);

fs.writeFileSync(specFilepath, specSrc);

console.log(`Created: ${specFilepath}`);

if (!['*', '1*'].includes(cardinality)) process.exit(0);

const propertyArrayTemplateFilepath = path.resolve(__dirname, '..', '.template', 'PropertyArray.hbs');
const propertyArrayTemplateSrc = fs.readFileSync(propertyArrayTemplateFilepath).toString();
const propertyArrayTemplate = Handlebars.compile(propertyArrayTemplateSrc);
const propertyArraySrc = propertyArrayTemplate({ property });
const propertyArrayFilename = `${_.capitalize(property)}PropertyArray.ts`;
const propertyArrayFilepath = path.resolve(__dirname, '..', 'lib', 'properties', 'arrays', propertyArrayFilename);

fs.writeFileSync(propertyArrayFilepath, propertyArraySrc);

console.log(`Created: ${propertyArrayFilepath}`);
