import React from 'react';
import {DelayInput} from "react-delay-input";

const CountInput = props => {

    return (
        <>
            <p>Count:</p>
            <DelayInput name='count' type='number' value={props.widgetData.count} placeholder='count'
                        className='count' delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
        </>
    )
};
export default CountInput;
