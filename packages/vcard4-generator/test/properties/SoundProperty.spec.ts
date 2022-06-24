import { expect } from 'chai';
import SoundProperty, { SoundPropertyRestParameter } from '../../lib/properties/SoundProperty';

describe('SoundProperty', () => {
    it('is a function class', () => {
        expect(SoundProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(SoundProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const sound = new SoundProperty(value);

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
            const sound = new SoundProperty(value, parameters);
            const actual = sound.toString();
            const expected = `SOUND;TYPE=home:${value}`;

            expect(actual).to.equal(expected);
        });

        it('accepts a "uri" value parameter', () => {
            const parameters = { value: 'uri' as const };
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const sound = new SoundProperty(value, parameters);

            expect(sound.toString()).to.equal(`SOUND;VALUE=uri:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(SoundProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const sound = new SoundProperty(value);

            expect(sound.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const sound = new SoundProperty(value);

            expect(sound.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(SoundProperty.factory).to.be.a('function');
        });

        it('returns an instance of `SoundProperty`', () => {
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const sound = SoundProperty.factory(value);

            expect(sound instanceof SoundProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const sound = new SoundProperty(value);

            expect(SoundProperty.factory(sound)).to.equal(sound);
        });

        it('creates an instance from a string value argument', () => {
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const sound = SoundProperty.factory(value);

            expect(sound instanceof SoundProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'CID:JOHNQPUBLIC.part8.19960229T080000.xyzMail@example.com';
            const config: SoundPropertyRestParameter = [value, { type: 'home' }];
            const sound = SoundProperty.factory(config);

            expect(sound instanceof SoundProperty).to.equal(true);
        });
    });
});
