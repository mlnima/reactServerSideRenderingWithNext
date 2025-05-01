'use client';
import React, {FC} from 'react';
import {IWidgetData} from "@repo/typescript-types";

interface CountInputPropTypes {
    widgetData: IWidgetData,
    onChangeHandler: Function
}

const CountInput: FC<CountInputPropTypes> = ({widgetData, onChangeHandler}) => {

    return (
        <>
            <p>Count:</p>
            <input name='count' type='number' value={widgetData.count} placeholder='count'
                   className='count primaryInput' onChange={e => onChangeHandler(e)}/>
        </>
    )
};
export default CountInput;
