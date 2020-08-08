import React, {useEffect, useState, useContext, useRef} from 'react';
import {DelayInput} from "react-delay-input";

const TextInputFieldForWidget = props => {

    return (
        <>
            <p>{props.inputTitle}</p>
            <DelayInput name={props.name} element={props.element} type={props.type} value={props.value} placeholder={props.placeHolder}
                        className={props.classNameValue} delayTimeout={2000} onChange={e => props.onChangeHandler(e)}/>
        </>
    )
};
export default TextInputFieldForWidget;
