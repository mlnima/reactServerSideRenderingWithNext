import React from 'react';

const CountInput = props => {

    return (
        <>
            <p>Count:</p>
            <input name='count' type='number' value={props.widgetData.count} placeholder='count'
                        className='count form-control-input' onChange={e => props.onChangeHandler(e)}/>
        </>
    )
};
export default CountInput;
