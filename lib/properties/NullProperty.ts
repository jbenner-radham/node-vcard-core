import Property from './Property';

/**
 * The null property is not an actual vCard property. It is merely an
 * implementation of the null object pattern to be implemented in the absence of
 * an actual vCard property object.
 */
export default class NullProperty implements Property {
    toString() {
        return '';
    }

    valueOf() {
        return '';
    }
}
