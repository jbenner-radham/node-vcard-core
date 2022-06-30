import { expect } from 'chai';
import FburlProperty, { FburlPropertyRestConfig } from '../../lib/properties/FburlProperty';

describe('FburlProperty', () => {
    it('is a function class', () => {
        expect(FburlProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(FburlProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const fburl = new FburlProperty('http://www.example.com/busy/janedoe');

            expect(fburl.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'http://www.example.com/busy/janedoe';
            const fburl = new FburlProperty(value);

            expect(fburl.toString()).to.equal(`FBURL:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { type: 'work' as const };
            const value = 'http://www.example.com/busy/janedoe';
            const fburl = new FburlProperty(value, parameters);
            const actual = fburl.toString();
            const expected = `FBURL;TYPE=work:${value}`;

            expect(actual).to.equal(expected);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://www.example.com/busy/janedoe';
            const fburl = new FburlProperty(value, parameters);

            expect(fburl.toString()).to.equal(`FBURL;VALUE=uri:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(FburlProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const fburl = new FburlProperty('http://www.example.com/busy/janedoe');

            expect(fburl.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'http://www.example.com/busy/janedoe';
            const fburl = new FburlProperty(value);

            expect(fburl.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(FburlProperty.factory).to.be.a('function');
        });

        it('returns an instance of `FburlProperty`', () => {
            const fburl = FburlProperty.factory('http://www.example.com/busy/janedoe');

            expect(fburl instanceof FburlProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const fburl = new FburlProperty('http://www.example.com/busy/janedoe');

            expect(FburlProperty.factory(fburl) instanceof FburlProperty).to.equal(true);
        });

        it('creates an instance from a string value argument', () => {
            const fburl = FburlProperty.factory('http://www.example.com/busy/janedoe');

            expect(fburl instanceof FburlProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'http://www.example.com/busy/janedoe';
            const config: FburlPropertyRestConfig = [value, { type: 'work' }];
            const fburl = FburlProperty.factory(config);

            expect(fburl instanceof FburlProperty).to.equal(true);
        });
    });
});
