import { expect } from 'chai';
import NoteProperty from '../../lib/properties/NoteProperty';

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
            const config = { parameters, value };
            const note = new NoteProperty(config);
            const actual = note.toString();
            const expected = 'NOTE;LANGUAGE=en:This is a note...';

            expect(actual).to.equal(expected);
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
});
