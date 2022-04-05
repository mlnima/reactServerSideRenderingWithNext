import React, {FC} from "react";
import MonacoEditor from "@components/adminIncludes/MonacoEditor/MonacoEditor";

interface DayModeNightModeFieldsPropTypes {
    dayNightModeData:any,
    onChangeHandler:any
}

const DayModeNightModeFields: FC<DayModeNightModeFieldsPropTypes> =
    ({
         dayNightModeData,
         onChangeHandler
    }) => {
    return (
        <>
            <div className={'widgetSection'}>
                <p>Default Mode:</p>
            <select name={'dayNightModeDefault'}
                    onChange={onChangeHandler}
                    className={'custom-select'}
            >
                <option value='' >Select</option>
                 <option value={'night'}>Night</option>
                 <option value={'day'}>Day</option>
            </select>
            </div>
            <div className={'monaco-editor-section'}>
                <p>DayModeNightMode Data:</p>
                <MonacoEditor
                    language={'scss'}
                    name={'dayNightModeData'}
                    defaultValue={dayNightModeData || ''}
                    value={dayNightModeData}
                    className={'customStylesTextarea'}
                    onChange={onChangeHandler}
                />
            </div>

        </>

    )
};
export default DayModeNightModeFields
