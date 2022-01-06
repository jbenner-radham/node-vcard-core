import { expect } from 'chai';
import ClientpidmapProperty from '../../lib/properties/ClientpidmapProperty';

describe('ClientpidmapProperty', () => {
    it('is a function class', () => {
        expect(ClientpidmapProperty).to.be.a('function');
    });

    describe('#toString()', () => {
        it('is a method', () => {
            expect(ClientpidmapProperty.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const clientpidmap = new ClientpidmapProperty('1;urn:uuid:3df403f4-5924-4bb7-b077-3c711d9eb34b');

            expect(clientpidmap.toString()).to.be.a('string');
        });

        it('returns the proper string format', () => {
            const value = '1;urn:uuid:3df403f4-5924-4bb7-b077-3c711d9eb34b';
            const clientpidmap = new ClientpidmapProperty(value);

            expect(clientpidmap.toString()).to.equal(`CLIENTPIDMAP:${value}`);
        });

        it('accepts an object argument to the constructor', () => {
            const value = '1;urn:uuid:3df403f4-5924-4bb7-b077-3c711d9eb34b';
            const config = { value };
            const clientpidmap = new ClientpidmapProperty(config);
            const actual = clientpidmap.toString();
            const expected = `CLIENTPIDMAP:${value}`;

            expect(actual).to.equal(expected);
        });
    });

    describe('#valueOf()', () => {
        it('is a method', () => {
            expect(ClientpidmapProperty.prototype.valueOf).to.be.a('function');
        });

        it('returns a string', () => {
            const clientpidmap = new ClientpidmapProperty('...');

            expect(clientpidmap.valueOf()).to.be.a('string');
        });

        it('returns the same value passed to it', () => {
            const value = '...';
            const clientpidmap = new ClientpidmapProperty(value);

            expect(clientpidmap.valueOf()).to.equal(value);
        });
    });
});
