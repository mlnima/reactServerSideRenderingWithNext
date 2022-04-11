import React, {FC} from "react";
import MonacoEditor from "../../MonacoEditor/MonacoEditor";

interface AdvertiseWidgetModelFieldsPropTypes {
    uniqueData:{
        adCode:string
    },
    onUniqueDataChangeHandler:any
}

const AdvertiseWidgetModelFields: FC<AdvertiseWidgetModelFieldsPropTypes> =
    ({
         uniqueData,
         onUniqueDataChangeHandler
    }) => {
    return (

        <div className={'monaco-editor-section'}>
            <p>Advertise Code:</p>
            <MonacoEditor name={'adCode'}
                          language={'html'}
                          theme={'vs-dark'}
                          defaultValue={uniqueData?.adCode}
                          value={uniqueData?.adCode}
                          onChange={onUniqueDataChangeHandler}
            />
        </div>
    )
};
export default AdvertiseWidgetModelFields
