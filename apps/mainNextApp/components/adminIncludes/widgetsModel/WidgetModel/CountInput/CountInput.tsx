import React, {FC} from 'react';
import {WidgetData} from "@_typeScriptTypes/widgets/Widget";

interface CountInputPropTypes {
    widgetData: WidgetData,
    onChangeHandler: Function
}

const CountInput: FC<CountInputPropTypes> = ({widgetData, onChangeHandler}) => {

    return (
        <>
            <p>Count:</p>
            <input name='count' type='number' value={widgetData.count} placeholder='count'
                   className='count form-control-input' onChange={e => onChangeHandler(e)}/>
        </>
    )
};
export default CountInput;
