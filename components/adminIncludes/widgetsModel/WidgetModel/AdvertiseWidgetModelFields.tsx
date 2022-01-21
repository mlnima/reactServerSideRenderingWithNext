import React, {FC} from "react";
import MonacoEditor from "../../MonacoEditor/MonacoEditor";

interface AdvertiseWidgetModelFieldsPropTypes {
    adCode:string,
    onChangeHandler:any
}

const AdvertiseWidgetModelFields: FC<AdvertiseWidgetModelFieldsPropTypes> = ({adCode,onChangeHandler}) => {
    return (
        <div className={'monaco-editor-section'}>
            <p>Advertise Code:</p>
            <MonacoEditor name={'adCode'}
                          language={'html'}
                          theme={'vs-dark'}
                          defaultValue={adCode}
                          value={adCode}
                          onChange={onChangeHandler}
            />
        </div>
    )
};
export default AdvertiseWidgetModelFields
