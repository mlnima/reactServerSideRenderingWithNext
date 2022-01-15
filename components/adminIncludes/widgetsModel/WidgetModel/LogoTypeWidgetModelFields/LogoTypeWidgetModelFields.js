import React from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";

const LogoTypeWidgetModelFields = ({widgetSettings,widgetData,onTextInputsDataChangeHandler,onChangeHandler}) => {

    return (
        <>
            <div className='textInputFieldForWidget widgetSection'>
                <p>Logo Text :</p>
                <input name={'LogoText'}
                       className={'LogoText form-control-input'}
                       value={
                           widgetSettings.activeEditingLanguage === 'default' ? widgetData.LogoText :
                               widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.LogoText || ''
                       }
                       onChange={e => onTextInputsDataChangeHandler(e)}/>
            </div>
            <div className='textInputFieldForWidget widgetSection'>
                <p>Under Logo Headline Text:</p>
                <input name='headLine'
                       value={
                           widgetSettings.activeEditingLanguage === 'default' ? widgetData.headLine :
                               widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.headLine || ''
                       }
                       className={'headLine form-control-input'}
                       onChange={e => onTextInputsDataChangeHandler(e)}/>

            </div>
            <TextInputFieldForWidget inputTitle='Logo image URL :'
                                     name='LogoUrl'
                                     type='text'
                                     value={widgetData.LogoUrl}
                                     classNameValue='logoUrl'
                                     placeHolder='Logo image URL'
                                     onChangeHandler={onChangeHandler}
                                     rendering={widgetData.type === 'logo'}
            />
        </>
    );
};
export default LogoTypeWidgetModelFields;
