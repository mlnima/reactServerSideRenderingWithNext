// @ts-nocheck
import  {ChangeEvent} from "react";

const inputValueSimplifier = (event:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    return event.target?.type === 'checkbox' ? event.target.checked :
           event.target.value === 'true' ? true :
           event.target.value === 'false' ? false :
           event.target.value
}

export default inputValueSimplifier;