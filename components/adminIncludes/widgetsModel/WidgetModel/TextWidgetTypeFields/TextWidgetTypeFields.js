import React from 'react';
import {DelayInput} from "react-delay-input";

const TextWidgetTypeFields = props => {

    if (props.rendering){
        return (
            <>
                <p>Text:</p>
                <textarea name='text' value={
                    props.widgetSettings.activeEditingLanguage === 'default' ? props.widgetData.text :
                        props.widgetData.translations ?
                            props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?
                                props.widgetData.translations[props.widgetSettings.activeEditingLanguage].text || '' :
                                '' : ''
                }
                          onChange={e => props.onTextInputsDataChangeHandler(e)}/>
            </>
        );
    }else return null

};
export default TextWidgetTypeFields;
