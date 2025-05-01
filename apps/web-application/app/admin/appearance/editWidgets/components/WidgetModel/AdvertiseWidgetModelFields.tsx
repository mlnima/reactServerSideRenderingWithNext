import React, {FC} from "react";
import MonacoEditor from '@components/textEditors/MonacoEditor';
import {UniqueDataTypes} from "@repo/typescript-types";

interface AdvertiseWidgetModelFieldsPropTypes {
    uniqueData: UniqueDataTypes,
    onUniqueDataChangeHandler: Function
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
                              onParentChangeHandler={onUniqueDataChangeHandler}
                />
            </div>
        )
    };
export default AdvertiseWidgetModelFields
