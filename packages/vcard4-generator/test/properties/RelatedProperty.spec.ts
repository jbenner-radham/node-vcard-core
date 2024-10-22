import { EOL, FOLD_CONTINUATION_CHAR } from '@vcard/vcard4-meta';
import { expect } from 'chai';
import RelatedProperty, { RelatedPropertyRestConfig } from '../../lib/properties/RelatedProperty';

describe('RelatedProperty', () => {
    it('is a class', () => {
        expect(RelatedProperty).to.be.a('class');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(RelatedProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const value = 'http://example.com/directory/jdoe.vcf';
            const related = new RelatedProperty(value);

            expect(related.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'http://example.com/directory/jdoe.vcf';
            const related = new RelatedProperty(value);

            expect(related.toString()).to.equal(`RELATED:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { type: 'contact' as const };
            const value = 'http://example.com/directory/jdoe.vcf';
            const related = new RelatedProperty(value, parameters);
            const actual = related.toString();
            const expected = `RELATED;TYPE=contact:${value}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'http://example.com/directory/jdoe.vcf';
            const options = { group: 1 };
            const related = new RelatedProperty(value, parameters, options);

            expect(related.toString()).to.equal(`1.RELATED:${value}`);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { type: 'contact' as const, value: 'uri' as const };
            const value = 'http://example.com/directory/jdoe.vcf';
            const related = new RelatedProperty(value, parameters);

            expect(related.toString()).to.equal(`RELATED;TYPE=contact;VALUE=uri:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { type: 'co-worker' as const, value: 'text' as const };
            const value = 'Please contact my assistant Jane Doe for any inquiries.';
            const related = new RelatedProperty(value, parameters);
            const expected = [
                'RELATED;TYPE=co-worker;VALUE=text:Please contact my assistant Jane Doe for ',
                'any inquiries.'
            ].join(`${EOL}${FOLD_CONTINUATION_CHAR}`);

            expect(related.toString()).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(RelatedProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const related = new RelatedProperty('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6');

            expect(related.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6';
            const related = new RelatedProperty(value);

            expect(related.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(RelatedProperty.factory).to.be.a('function');
        });

        it('returns an instance of `RelatedProperty`', () => {
            const related = RelatedProperty.factory('http://example.com/directory/jdoe.vcf');

            expect(related instanceof RelatedProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const related = new RelatedProperty('http://example.com/directory/jdoe.vcf');

            expect(RelatedProperty.factory(related)).to.equal(related);
        });

        it('creates an instance from a string value argument', () => {
            const related = RelatedProperty.factory('http://example.com/directory/jdoe.vcf');

            expect(related instanceof RelatedProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'http://example.com/directory/jdoe.vcf';
            const config: RelatedPropertyRestConfig = [value, { type: 'contact' }];
            const related = RelatedProperty.factory(config);

            expect(related instanceof RelatedProperty).to.equal(true);
        });
    });
});
