import { EOL } from '@vcard/vcard4-meta';
import { expect } from 'chai';
import XmlProperty, { XmlPropertyRestConfig }  from '../../lib/properties/XmlProperty';

describe('XmlProperty', () => {
    it('is a function class', () => {
        expect(XmlProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(XmlProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const value = [
                '<a xmlns="http://www.w3.org/1999/xhtml"',
                '   href="http://www.example.com">My web page!</a>'
            ].join('\n');
            const xml = new XmlProperty(value);

            expect(xml.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = [
                '<a xmlns="http://www.w3.org/1999/xhtml"',
                '   href="http://www.example.com">My web page!</a>'
            ].join('\n');
            const xml = new XmlProperty(value);
            const actual = xml.toString();
            const expected = [
                'XML:<a xmlns="http://www.w3.org/1999/xhtml"\\n   href="http://www.example.co',
                ' m">My web page!</a>'
            ].join(EOL);

            expect(actual).to.equal(expected);
        });

        it('correctly returns parameters', () => {
            const parameters = { value: 'text' as const };
            const value = [
                '<a xmlns="http://www.w3.org/1999/xhtml"',
                '   href="http://www.example.com">My web page!</a>'
            ].join('\n');
            const xml = new XmlProperty(value, parameters);
            const actual = xml.toString();
            const expected = [
                'XML;VALUE=text:<a xmlns="http://www.w3.org/1999/xhtml"\\n   href="http://www',
                ' .example.com">My web page!</a>'
            ].join(EOL);

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(XmlProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const value = [
                '<a xmlns="http://www.w3.org/1999/xhtml"',
                '   href="http://www.example.com">My web page!</a>'
            ].join('\n');
            const xml = new XmlProperty(value);

            expect(xml.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = [
                '<a xmlns="http://www.w3.org/1999/xhtml"',
                '   href="http://www.example.com">My web page!</a>'
            ].join('\n');
            const xml = new XmlProperty(value);

            expect(xml.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(XmlProperty.factory).to.be.a('function');
        });

        it('returns an instance of `XmlProperty`', () => {
            const value = [
                '<a xmlns="http://www.w3.org/1999/xhtml"',
                '   href="http://www.example.com">My web page!</a>'
            ].join('\n');
            const xml = XmlProperty.factory(value);

            expect(xml instanceof XmlProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const value = [
                '<a xmlns="http://www.w3.org/1999/xhtml"',
                '   href="http://www.example.com">My web page!</a>'
            ].join('\n');
            const xml = new XmlProperty(value);

            expect(XmlProperty.factory(xml)).to.equal(xml);
        });

        it('creates an instance from a string value argument', () => {
            const value = [
                '<a xmlns="http://www.w3.org/1999/xhtml"',
                '   href="http://www.example.com">My web page!</a>'
            ].join('\n');
            const xml = XmlProperty.factory(value);

            expect(xml instanceof XmlProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = [
                '<a xmlns="http://www.w3.org/1999/xhtml"',
                '   href="http://www.example.com">My web page!</a>'
            ].join('\n');
            const config: XmlPropertyRestConfig = [value, { value: 'text' }];
            const xml = XmlProperty.factory(config);

            expect(xml instanceof XmlProperty).to.equal(true);
        });
    });
});
