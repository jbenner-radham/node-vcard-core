export function getInvalidCalscaleValueParameterMessage({ value }: { value: any }): string {
    return 'The CALSCALE parameter is only valid for "date-and-or-time" value types. ' +
        `The value type of "${value}" was provided`;
}

export function getInvalidLanguageValueParameterMessage({ value }: { value: any }): string {
    return `The LANGUAGE parameter is only valid for "text" value types. The value type of "${value}" was provided`;
}

export function getInvalidMediatypeValueParameterMessage({ value }: { value: any }): string {
    return `The MEDIATYPE parameter is only valid for "uri" value types. The value type of "${value}" was provided`;
}

export function getInvalidPrefParameterMessage({ pref }: { pref: any }): string {
    return `The PREF parameter must be an integer between 1 and 100. The value ${pref} was provided`;
}
