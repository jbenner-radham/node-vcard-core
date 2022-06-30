import { expect } from 'chai';
import PhotoProperty, { PhotoPropertyRestConfig } from '../../lib/properties/PhotoProperty';

describe('PhotoProperty', () => {
    it('is a function class', () => {
        expect(PhotoProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(PhotoProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const value = 'http://www.example.com/pub/photos/jqpublic.gif';
            const photo = new PhotoProperty(value);

            expect(photo.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'http://www.example.com/pub/photos/jqpublic.gif';
            const photo = new PhotoProperty(value);

            expect(photo.toString()).to.equal(`PHOTO:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { type: 'home' as const };
            const value = 'http://www.example.com/pub/photos/jqpublic.gif';
            const photo = new PhotoProperty(value, parameters);
            const actual = photo.toString();
            const expected = `PHOTO;TYPE=home:${value}`;

            expect(actual).to.equal(expected);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://www.example.com/pub/photos/jqpublic.gif';
            const photo = new PhotoProperty(value, parameters);

            expect(photo.toString()).to.equal(`PHOTO;VALUE=uri:${value}`);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(PhotoProperty.factory).to.be.a('function');
        });

        it('returns an instance of `PhotoProperty`', () => {
            const photo = PhotoProperty.factory('http://www.example.com/pub/photos/jqpublic.gif');

            expect(photo instanceof PhotoProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const photo = new PhotoProperty('http://www.example.com/pub/photos/jqpublic.gif');

            expect(PhotoProperty.factory(photo)).to.equal(photo);
        });

        it('creates an instance from a string value argument', () => {
            const photo = PhotoProperty.factory('http://www.example.com/pub/photos/jqpublic.gif');

            expect(photo instanceof PhotoProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'http://www.example.com/pub/photos/jqpublic.gif';
            const config: PhotoPropertyRestConfig = [value, { type: 'home' }];
            const photo = PhotoProperty.factory(config);

            expect(photo instanceof PhotoProperty).to.equal(true);
        });
    });
    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(PhotoProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const photo = new PhotoProperty('http://www.example.com/pub/photos/jqpublic.gif');

            expect(photo.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'http://www.example.com/pub/photos/jqpublic.gif';
            const photo = new PhotoProperty(value);

            expect(photo.valueOf()).to.equal(value);
        });
    });
});
