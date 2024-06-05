import { isNumericString } from '../string-util';

export const inputValueSimplifier = event => {
    const value =
        event.target?.type === 'checkbox'
            ? event.target.checked
            : event.target.value === 'true'
                ? true
                : event.target.value === 'false'
                    ? false
                    : event.target.value;

    return isNumericString(value) ? parseInt(value) : value;
};