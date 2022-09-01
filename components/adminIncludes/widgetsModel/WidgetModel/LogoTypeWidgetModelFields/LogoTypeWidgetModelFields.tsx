import React, {FC} from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";
// import { WidgetSettingsPropTypes} from "@_variables/../../../../../trash/TypeScriptTypes/Widgets";
import {WidgetData,WidgetSettingsPropTypes} from "@_typeScriptTypes/widgets/Widget";

interface LogoTypeWidgetModelFieldsPropTypes {
    widgetSettings: WidgetSettingsPropTypes,
    widgetData: WidgetData,
    onUniqueDataChangeHandlerWithTranslate: any,
    onUniqueDataChangeHandler: any,
}

const LogoTypeWidgetModelFields: FC<LogoTypeWidgetModelFieldsPropTypes> =
    ({
         widgetSettings,
         widgetData,
         onUniqueDataChangeHandlerWithTranslate,
         onUniqueDataChangeHandler
     }) => {

        return (
            <>
                <div className='textInputFieldForWidget widgetSection'>
                    <p>Logo Text :</p>
                    <input name={'logoText'}
                           className={'logoText form-control-input'}
                           value={
                                   widgetSettings.activeEditingLanguage === 'default' ? widgetData?.uniqueData?.logoText :
                                   widgetData?.uniqueData?.translations?.[widgetSettings.activeEditingLanguage]?.logoText || ''
                           }
                           onChange={e => onUniqueDataChangeHandlerWithTranslate(e)}/>
                </div>
                <div className='textInputFieldForWidget widgetSection'>
                    <p>Under Logo Headline Text:</p>
                    <input name={'headLine'}
                           value={
                                   widgetSettings.activeEditingLanguage === 'default' ? widgetData?.uniqueData?.headLine :
                                   widgetData?.uniqueData?.translations?.[widgetSettings.activeEditingLanguage]?.headLine || ''
                           }
                           className={'headLine form-control-input'}
                           onChange={e => onUniqueDataChangeHandlerWithTranslate(e)}/>

                </div>
                <TextInputFieldForWidget inputTitle='Logo image URL :'
                                         name='logoUrl'
                                         type='text'
                                         value={widgetData?.uniqueData?.logoUrl}
                                         classNameValue='logoUrl'
                                         placeHolder='Logo image URL'
                                         onChangeHandler={onUniqueDataChangeHandler}
                />
            </>
        );
    };
export default LogoTypeWidgetModelFields;
