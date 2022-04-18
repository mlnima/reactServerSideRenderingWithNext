//SliderTypeWidgetModelFields

import React, {FC} from "react";
import MonacoEditor from "@components/adminIncludes/MonacoEditor/MonacoEditor";

interface PostSliderTypeWidgetModelFieldsPropTypes {
    uniqueData: {
        sliderConfig: string
    },
    onUniqueDataJsonChangeHandler:any
}

const SliderWidgetFields: FC<PostSliderTypeWidgetModelFieldsPropTypes> =
    ({
        uniqueData,
        onUniqueDataJsonChangeHandler
     }) => {
        return (
            <>
                <div className={'editor-section'}>
                    <p>Slider Widget Fields:</p>
                </div>
                <MonacoEditor
                    language={'json'}
                    name={'sliderConfig'}
                    defaultValue={JSON.stringify(uniqueData?.sliderConfig, null, '\t')}
                    value={JSON.stringify(uniqueData?.sliderConfig, null, '\t')}
                    className={'details'}
                    onChange={onUniqueDataJsonChangeHandler}
                />
            </>
        )
    };
export default SliderWidgetFields
