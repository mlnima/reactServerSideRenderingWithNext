//SliderTypeWidgetModelFields

import React, {FC, useState} from "react";
import MonacoEditor from '@components/textEditors/MonacoEditor';

interface PostSliderTypeWidgetModelFieldsPropTypes {
    uniqueData: {
        sliderConfig: string
    },
    onUniqueDataJsonChangeHandler: any
}

const SliderWidgetFields: FC<PostSliderTypeWidgetModelFieldsPropTypes> =
    ({
         uniqueData,
         onUniqueDataJsonChangeHandler
     }) => {
        const [openConfig, setOpenConfig] = useState(false);

        return (
            <>
                <div className={'open-section'}>
                    <p className={'section-title'}>Slider Widget Config:</p>
                    <button onClick={() => setOpenConfig(!openConfig)} className={'btn btn-primary section-action'}>
                        {openConfig ? 'close' : 'open'}
                    </button>
                </div>
                {openConfig ?
                    <MonacoEditor
                        language={'json'}
                        name={'sliderConfig'}
                        defaultValue={JSON.stringify(uniqueData?.sliderConfig, null, '\t')}
                        value={JSON.stringify(uniqueData?.sliderConfig, null, '\t')}
                        className={'details'}
                        onParentChangeHandler={onUniqueDataJsonChangeHandler}
                    />
                    : null
                }

            </>
        )
    };
export default SliderWidgetFields
