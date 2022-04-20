import React, {FC} from 'react';
import {WidgetDataPropTypes, WidgetSettingsPropTypes} from "@_variables/TypeScriptTypes/Widgets";

interface RenderTitleAndRedirectLinkPropTypes{
    widgetData:WidgetDataPropTypes,
    widgetSettings:WidgetSettingsPropTypes,
    onChangeHandlerWithTranslate:any,
    rendering:boolean
    onChangeHandler:any
}
const RenderTitleAndRedirectLink:FC<RenderTitleAndRedirectLinkPropTypes> = ({onChangeHandler,onChangeHandlerWithTranslate,widgetData,widgetSettings,rendering}) => {

    if (rendering){
        return (
            <>
                <div className='textInputFieldForWidget widgetSection'>
                    <p>Title:</p>
                    <input  name='title' className='form-control-input' placeholder='Title' value={
                        widgetSettings.activeEditingLanguage === 'default' ?
                            widgetData.title :
                            widgetData.translations ?
                                widgetData.translations[widgetSettings.activeEditingLanguage] ?
                                    widgetData.translations[widgetSettings.activeEditingLanguage].title || '' :
                                    '' : ''
                    }
                            onChange={e => onChangeHandlerWithTranslate(e)}/>
                </div>
                <div className={'textInputFieldForWidget widgetSection'}>
                    <p>Redirect Link TextInput</p>
                    <input  className='form-control-input' name='redirectToTitle' placeholder='TextInput for Redirect Links'
                            value={
                                widgetSettings.activeEditingLanguage === 'default' ?
                                    widgetData.redirectToTitle :
                                    widgetData.translations ?
                                        widgetData.translations[widgetSettings.activeEditingLanguage] ?
                                            widgetData.translations[widgetSettings.activeEditingLanguage].redirectToTitle || '' :
                                            '' : ''
                            }
                            onChange={e => onChangeHandlerWithTranslate(e)}/>
                </div>
                <div className={'textInputFieldForWidget widgetSection'}>
                    <p>Redirect Link URL:</p>
                    <input  className='form-control-input' name='redirectLink' placeholder='Redirect'
                            value={widgetData.redirectLink}
                            onChange={e => onChangeHandlerWithTranslate(e)}/>
                </div>

                <div className='textInputFieldForWidget widgetSection'>
                    <p>Link to Widget Footer:</p>
                    <select className={'custom-select'} name='footerLink' value={widgetData.footerLink} onChange={onChangeHandler}>
                        <option value='' >Select</option>
                        <option value='true'>true</option>
                        <option value='false'>false</option>
                    </select>
                </div>
            </>
        );
    }else return null


};
export default RenderTitleAndRedirectLink;
