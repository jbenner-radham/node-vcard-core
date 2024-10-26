import { describe, it } from 'vitest';
import { expect } from 'chai';
import ExpertiseProperty from '../../../lib/properties/ExpertiseProperty.js';
import ExpertisePropertyArray from '../../../lib/properties/arrays/ExpertisePropertyArray.js';

describe('ExpertisePropertyArray', () => {
    it('is a class', () => {
        expect(ExpertisePropertyArray).to.be.a('class');
    });

    describe('#push()', () => {
        it('is a method', () => {
            expect(ExpertisePropertyArray.prototype.push).to.be.a('function');
        });

        it('returns a number', () => {
            const value = 'chemistry';
            const expertiseProperties = new ExpertisePropertyArray();

            expect(expertiseProperties.push(value)).to.be.a('number');
        });

        it('returns the length of the array', () => {
            const value = 'chemistry';
            const expertiseProperties = new ExpertisePropertyArray();

            expect(expertiseProperties.push(value)).to.equal(1);
        });

        it('creates an `ExpertiseProperty` object in the array', () => {
            const value = 'chemistry';
            const expertiseProperties = new ExpertisePropertyArray();

            expertiseProperties.push(value);

            expect(expertiseProperties.at(0) instanceof ExpertiseProperty).to.equal(true);
        });

        it('creates an `ExpertiseProperty` object in the array with the proper value', () => {
            const value = 'chemistry';
            const expertiseProperties = new ExpertisePropertyArray();

            expertiseProperties.push(value);

            expect(expertiseProperties.at(0).valueOf()).to.equal(value);
        });
    });
});
