import React, {FC} from "react";
import MonacoEditor from "@components/common/MonacoEditor";

interface IProps {
    dayNightModeData:any,
    dayNightModeDefault:any,
    onChangeHandler:any
}

const DayModeNightModeFields: FC<IProps> =
    ({
         dayNightModeData,
         dayNightModeDefault,
         onChangeHandler
    }) => {

    // console.log(dayNightModeDefault)
    return (
        <>
            <div className={'widgetSection'}>
                <p>Default Mode:</p>
            <select name={'dayNightModeDefault'}
                    onChange={onChangeHandler}
                    className={'primarySelect'}
                    value={dayNightModeDefault}
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
