// @ts-nocheck
import React, {FC} from 'react';
import {WidgetData, WidgetSettingsPropTypes} from "@repo/typescript-types";

interface RenderTitleAndRedirectLinkPropTypes {
    widgetData: WidgetData,
    widgetSettings: WidgetSettingsPropTypes,
    onChangeHandlerWithTranslate: any,
    onChangeHandler: any
}

const RenderTitleAndRedirectLink: FC<RenderTitleAndRedirectLinkPropTypes> =
    ({
         onChangeHandler,
         onChangeHandlerWithTranslate,
         widgetData,
         widgetSettings,
     }) => {

            return (
                <>
                    <div className='textInputFieldForWidget widgetSection'>
                        <p>Title:</p>
                        <input name='title' className='primaryInput' placeholder='Title' value={
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
                        <input className='primaryInput' name='redirectToTitle'
                               placeholder='TextInput for Redirect Links'
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
                        <input className='primaryInput' name='redirectLink' placeholder='Redirect'
                               value={widgetData.redirectLink}
                               onChange={e => onChangeHandlerWithTranslate(e)}/>
                    </div>

                    <div className='textInputFieldForWidget widgetSection'>
                        <p>Redirect Link Position:</p>
                        <select className={'primarySelect'} name='redirectLinkPosition' value={widgetData.redirectLinkPosition}
                                onChange={onChangeHandler}>
                            <option value='header'>Header</option>
                            <option value='bottom'>Bottom</option>
                        </select>
                    </div>
                </>
            );



    };
export default RenderTitleAndRedirectLink;
