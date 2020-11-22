import React, {useEffect, useState, useContext, useRef} from 'react';
//import DelayInput from 'react-delay-input'

const RenderTitleAndRedirectLink = props => {

    if (props.rendering){
        return (
            <>
                <p>Title:</p>
                <input  name='title' className='title' placeholder='Title' value={
                    props.widgetSettings.activeEditingLanguage === 'default' ?
                        props.widgetData.title :
                        props.widgetData.translations ?
                            props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?
                                props.widgetData.translations[props.widgetSettings.activeEditingLanguage].title || '' :
                                '' : ''
                }
                        onChange={e => props.onTextInputsDataChangeHandler(e)}/>

                <p>Redirect Link Title</p>
                <input  className='redirectToTitle' name='redirectToTitle' placeholder='Title for Redirect Links'
                        value={
                            props.widgetSettings.activeEditingLanguage === 'default' ?
                                props.widgetData.redirectToTitle :
                                props.widgetData.translations ?
                                    props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?
                                        props.widgetData.translations[props.widgetSettings.activeEditingLanguage].redirectToTitle || '' :
                                        '' : ''
                        }
                            onChange={e => props.onTextInputsDataChangeHandler(e)}/>
                <p>Redirect Link URL:</p>
                <input  className='redirectLink' name='redirectLink' placeholder='Redirect'
                            value={props.widgetData.redirectLink}
                            onChange={e => props.onTextInputsDataChangeHandler(e)}/>
            </>
        );
    }else return null


};
export default RenderTitleAndRedirectLink;
