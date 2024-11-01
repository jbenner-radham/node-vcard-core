export function getInvalidCalscaleValueParameterMessage({ value }: { value: any }): string {
    return 'The CALSCALE parameter is only valid for "date-and-or-time" value types. ' +
        `The value type of "${value}" was provided`;
}

export function getInvalidCcParameterMessage({ cc }: { cc: unknown }): string {
    return 'The CC parameter must be a two alpha character uppercase string and should be an ISO 3166 two-letter ' +
        `code. The value "${cc}" was provided`;
}

export function getInvalidIndexParameterMessage({ index }: { index: any }): string {
    return `The INDEX parameter must be a positive non-zero integer. The value ${index} was provided`;
}

export function getInvalidLanguageValueParameterMessage({ value }: { value: any }): string {
    return `The LANGUAGE parameter is only valid for "text" value types. The value type of "${value}" was provided`;
}

export function getInvalidMediatypeValueParameterMessage({ value }: { value: any }): string {
    return `The MEDIATYPE parameter is only valid for "uri" value types. The value type of "${value}" was provided`;
}

export function getInvalidPidParameterMessage({ pid }: { pid: unknown }): string {
    return 'The PID parameter must be an integer consisting of one digit, a float consisting of one digit on both ' +
        `sides of the decimal point, or an array containing the aforementioned number formats. The value "${pid}" ` +
        'was provided';
}

export function getInvalidPrefParameterMessage({ pref }: { pref: any }): string {
    return `The PREF parameter must be an integer between 1 and 100. The value ${pref} was provided`;
}
