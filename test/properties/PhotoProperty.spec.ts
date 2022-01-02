import { expect } from 'chai';
import PhotoProperty from '../../lib/properties/PhotoProperty';

describe('PhotoProperty', () => {
    it('is a function class', () => {
        expect(PhotoProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(PhotoProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const photo = new PhotoProperty('http://www.example.com/pub/photos/jqpublic.gif');

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
            const config = { parameters, value };
            const photo = new PhotoProperty(config);
            const actual = photo.toString();
            const expected = 'PHOTO;TYPE=home:http://www.example.com/pub/photos/jqpublic.gif';

            expect(actual).to.equal(expected);
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
