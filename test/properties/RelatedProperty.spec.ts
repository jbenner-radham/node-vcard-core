import { expect } from 'chai';
import RelatedProperty from '../../lib/properties/RelatedProperty';

describe('RelatedProperty', () => {
    it('is a function class', () => {
        expect(RelatedProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(RelatedProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const related = new RelatedProperty('http://example.com/directory/jdoe.vcf');

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
            const config = { parameters, value };
            const related = new RelatedProperty(config);
            const actual = related.toString();
            const expected = `RELATED;TYPE=contact:${value}`;

            expect(actual).to.equal(expected);
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
});
