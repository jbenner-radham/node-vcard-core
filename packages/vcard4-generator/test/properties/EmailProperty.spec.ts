import { expect } from 'chai';
import EmailProperty, { EmailPropertyConfig } from '../../lib/properties/EmailProperty';

describe('EmailProperty', () => {
    it('is a function class', () => {
        expect(EmailProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(EmailProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const email = new EmailProperty('j.doe@example.com');

            expect(email.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = 'j.doe@example.com';
            const email = new EmailProperty(value);

            expect(email.toString()).to.equal(`EMAIL:${value}`);
        });

        it('correctly returns parameters', () => {
            const parameters = { type: 'work' as const };
            const value = 'jqpublic@xyz.example.com';
            const email = new EmailProperty(value, parameters);
            const actual = email.toString();
            const expected = `EMAIL;TYPE=work:${value}`;

            expect(actual).to.equal(expected);
        });

        it('accepts a "text" value parameter', () => {
            const parameters = { value: 'text' as const };
            const value = 'jqpublic@xyz.example.com';
            const email = new EmailProperty(value, parameters);

            expect(email.toString()).to.equal(`EMAIL;VALUE=text:${value}`);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(EmailProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const email = new EmailProperty('hello@example.com');

            expect(email.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = 'hello@example.com';
            const email = new EmailProperty(value);

            expect(email.valueOf()).to.equal(value);
        });
    });

    describe('.factory()', () => {
        it('is a static method', () => {
            expect(EmailProperty.factory).to.be.a('function');
        });

        it('returns an instance of `EmailProperty`', () => {
            const email = EmailProperty.factory('jqpublic@xyz.example.com');

            expect(email instanceof EmailProperty).to.equal(true);
        });

        it('returns an instance if provided one as an argument', () => {
            const email = new EmailProperty('jqpublic@xyz.example.com');

            expect(EmailProperty.factory(email) instanceof EmailProperty).to.equal(true);
        });

        it('creates an instance from a string value argument', () => {
            const email = EmailProperty.factory('jqpublic@xyz.example.com');

            expect(email instanceof EmailProperty).to.equal(true);
        });

        it('creates an instance from an array argument', () => {
            const value = 'jqpublic@xyz.example.com';
            const config: EmailPropertyConfig = [value, { type: 'work' }];
            const email = EmailProperty.factory(config);

            expect(email instanceof EmailProperty).to.equal(true);
        });
    });
});
