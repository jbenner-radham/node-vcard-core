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
            const email = new NoteProperty('This is a note...');

            expect(email.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'This is a note...';
            const email = new NoteProperty(value);

            expect(email.toString()).to.equal(`NOTE:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(NoteProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const email = new NoteProperty('Notes notes notes!');

            expect(email.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'Notes notes notes!';
            const email = new NoteProperty(value);

            expect(email.valueOf()).to.equal(value);
        });
    });
});
