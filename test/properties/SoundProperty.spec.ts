import { expect } from 'chai';
import SoundProperty from '../../lib/properties/SoundProperty';

describe('SoundProperty', () => {
    it('is a function class', () => {
        expect(SoundProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(SoundProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const sound = new SoundProperty('CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com');

            expect(sound.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const sound = new SoundProperty(value);

            expect(sound.toString()).to.equal(`SOUND:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { type: 'home' as const };
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const config = { parameters, value };
            const sound = new SoundProperty(config);
            const actual = sound.toString();
            const expected = `SOUND;TYPE=home:${value}`;

            expect(actual).to.equal(expected);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const config = { parameters, value };
            const sound = new SoundProperty(config);

            expect(sound.toString()).to.equal(`SOUND;VALUE=uri:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(SoundProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const sound = new SoundProperty('CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com');

            expect(sound.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const sound = new SoundProperty(value);

            expect(sound.valueOf()).to.equal(value);
        });
    });
});
