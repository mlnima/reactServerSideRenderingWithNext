// @ts-nocheck
import  {ChangeEvent} from "react";
import isNumericString from "../string-util/isNumericString";

const inputValueSimplifier = (event:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target?.type === 'checkbox' ? event.target.checked :
        event.target.value === 'true' ? true :
            event.target.value === 'false' ? false :
                event.target.value


    return isNumericString(value) ? parseInt(value) : value
}

export default inputValueSimplifier;