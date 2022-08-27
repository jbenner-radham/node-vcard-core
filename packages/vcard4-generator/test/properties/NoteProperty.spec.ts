import { expect } from 'chai';
import NoteProperty, { NotePropertyRestConfig } from '../../lib/properties/NoteProperty';

describe('NoteProperty', () => {
    it('is a function class', () => {
        expect(NoteProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(NoteProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const note = new NoteProperty('This is a note...');

            expect(note.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'This is a note...';
            const note = new NoteProperty(value);

            expect(note.toString()).to.equal(`NOTE:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { language: 'en' };
            const value = 'This is a note...';
            const note = new NoteProperty(value, parameters);
            const actual = note.toString();
            const expected = `NOTE;LANGUAGE=en:${value}`;

            expect(actual).to.equal(expected);
        });

        it('correctly groups the property', () => {
            const parameters = undefined;
            const value = 'This is a note...';
            const options = { group: 1 };
            const note = new NoteProperty(value, parameters, options);

            expect(note.toString()).to.equal(`1.NOTE:${value}`);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'This is a note...';
            const note = new NoteProperty(value, parameters);

            expect(note.toString()).to.equal(`NOTE;VALUE=text:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(NoteProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const note = new NoteProperty('Notes notes notes!');

            expect(note.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'Notes notes notes!';
            const note = new NoteProperty(value);

            expect(note.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(NoteProperty.factory).to.be.a('function');
        });

        it('returns an instance of `NoteProperty`', () => {
            const note = NoteProperty.factory('This is a note...');

            expect(note instanceof NoteProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const note = new NoteProperty('This is a note...');

            expect(NoteProperty.factory(note)).to.equal(note);
        });

        it('creates an instance from a string value argument', () => {
            const note = NoteProperty.factory('This is a note...');

            expect(note instanceof NoteProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'This is a note...';
            const config: NotePropertyRestConfig = [value, { type: 'home' }];
            const note = NoteProperty.factory(config);

            expect(note instanceof NoteProperty).to.equal(true);
        });
    });
});
