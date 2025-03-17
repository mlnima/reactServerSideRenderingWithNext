// @ts-nocheck
import React, {FC} from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";
import {IWidgetData,WidgetSettingsPropTypes} from "@repo/typescript-types";

interface LogoTypeWidgetModelFieldsPropTypes {
    widgetSettings: WidgetSettingsPropTypes,
    widgetData: IWidgetData,
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
                           className={'logoText primaryInput'}
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
                           className={'headLine primaryInput'}
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
                <TextInputFieldForWidget inputTitle='Logo Width Size:'
                                         name='width'
                                         type='number'
                                         value={widgetData?.uniqueData?.width}
                                         classNameValue='width'
                                         placeHolder='Logo width (default value is 300)'
                                         onChangeHandler={onUniqueDataChangeHandler}
                />
                <TextInputFieldForWidget inputTitle='Logo height Size:'
                                         name='height'
                                         type='number'
                                         value={widgetData?.uniqueData?.height}
                                         classNameValue='height'
                                         placeHolder='Logo height (default value is 100)'
                                         onChangeHandler={onUniqueDataChangeHandler}
                />
            </>
        );
    };
export default LogoTypeWidgetModelFields;
