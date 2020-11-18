import React, {useEffect, useState, useContext, useRef} from 'react';
import DelayInput from 'react-delay-input'

const RenderTitleAndRedirectLink = props => {

    return (
        <>
            <p>Title:</p>
            <DelayInput delayTimeout={2000} name='title' className='title' placeholder='Title' value={
                props.widgetSettings.activeEditingLanguage === 'default' ?
                    props.widgetData.title :
                    props.widgetData.translations ?
                        props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?
                            props.widgetData.translations[props.widgetSettings.activeEditingLanguage].title || '' :
                            '' : ''
            }
                        onChange={e => props.onTextInputsDataChangeHandler(e)}/>

            <p>Redirect Link Title</p>
            <DelayInput delayTimeout={2000} className='redirectToTitle' name='redirectToTitle' placeholder='Title for Redirect Links'
                        value={props.widgetData.redirectToTitle}
                        onChange={e => props.onTextInputsDataChangeHandler(e)}/>
            <p>Redirect Link URL:</p>
            <DelayInput delayTimeout={2000} className='redirectLink' name='redirectLink' placeholder='Redirect'
                        value={props.widgetData.redirectLink}
                        onChange={e => props.onTextInputsDataChangeHandler(e)}/>
        </>
    );
};
export default RenderTitleAndRedirectLink;
