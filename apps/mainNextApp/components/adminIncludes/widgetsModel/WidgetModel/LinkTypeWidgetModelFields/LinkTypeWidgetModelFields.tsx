import React, {FC, useMemo} from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";
import {UniqueDataTypes, WidgetSettingsPropTypes} from "@_typeScriptTypes/widgets/Widget";


interface LinkTypeWidgetModelFieldsPropTypes {
    widgetSettings: WidgetSettingsPropTypes,
    uniqueData: UniqueDataTypes,
    onUniqueDataChangeHandler: any,
    onUniqueDataChangeHandlerWithTranslate: any,
}

const LinkTypeWidgetModelFields: FC<LinkTypeWidgetModelFieldsPropTypes> =
    ({
         uniqueData,
         widgetSettings,
         onUniqueDataChangeHandler,
         onUniqueDataChangeHandlerWithTranslate
     }) => {


        return (
            <>
                <TextInputFieldForWidget inputTitle={'Link To :'}
                                         name={'linkTo'}
                                         type={'text'}
                                         value={uniqueData.linkTo}
                                         classNameValue={'linkTo'}
                                         placeHolder={'linkTo'}
                                         onChangeHandler={onUniqueDataChangeHandler}
                />

                <TextInputFieldForWidget
                    inputTitle='Link To Text :'
                    name='linkToText'
                    type='text'
                    value={
                           widgetSettings.activeEditingLanguage === 'default' ? uniqueData?.linkToText:
                               uniqueData?.translations?.[widgetSettings.activeEditingLanguage]?.linkToText || ''
                    }
                    classNameValue='linkToText'
                    placeHolder='Link To Text'
                    onChangeHandler={onUniqueDataChangeHandlerWithTranslate}
                />
                <div className='selectInputFieldForWidget widgetSection'>
                </div>
                <div className='selectInputFieldForWidget widgetSection'>
                    <p>Link To Window Type:</p>
                    <select className={'custom-select'}
                            name='linkToWindowType'
                            value={uniqueData.linkToWindowType}
                            onChange={e => onUniqueDataChangeHandler(e)}
                    >
                        <option>select</option>
                        <option value='_blank'>Open New Window</option>
                        <option value='_self'>Redirect To Link In The Same Window</option>
                    </select>
                </div>
            </>
        );

    };
export default LinkTypeWidgetModelFields;
