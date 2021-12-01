import { Cardinality } from '../types';

export default interface Property {
    cardinality: Cardinality;
    toString: () => string;
    valueOf: () => any;
}
