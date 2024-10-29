import { describe, it } from 'vitest';
import { expect } from 'chai';
import PhotoProperty, { type PhotoRestConfig } from '../../lib/properties/PhotoProperty.js';

describe('PhotoProperty', () => {
    it('is a class', () => {
        expect(PhotoProperty).to.be.a('class');
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

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'http://www.example.com/pub/photos/jqpublic.gif';
            const options = { group: 1 };
            const photo = new PhotoProperty(value, parameters, options);

            expect(photo.toString()).to.equal(`1.PHOTO:${value}`);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'http://www.example.com/pub/photos/jqpublic.gif';
            const photo = new PhotoProperty(value, parameters);

            expect(photo.toString()).to.equal(`PHOTO;VALUE=uri:${value}`);
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

    describe('.from()', () => {
        it('is a static method', () => {
            expect(PhotoProperty.from).to.be.a('function');
        });

        it('returns an instance of `PhotoProperty`', () => {
            const photo = PhotoProperty.from('http://www.example.com/pub/photos/jqpublic.gif');

            expect(photo instanceof PhotoProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const photo = new PhotoProperty('http://www.example.com/pub/photos/jqpublic.gif');

            expect(PhotoProperty.from(photo)).to.equal(photo);
        });

        it('creates an instance from a string value argument', () => {
            const photo = PhotoProperty.from('http://www.example.com/pub/photos/jqpublic.gif');

            expect(photo instanceof PhotoProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'http://www.example.com/pub/photos/jqpublic.gif';
            const config: PhotoRestConfig = [value, { type: 'home' }];
            const photo = PhotoProperty.from(config);

            expect(photo instanceof PhotoProperty).to.equal(true);
        });
    });
});
