import React from 'react';
import {DelayInput} from "react-delay-input";

const TextWidgetTypeFields = props => {

    return (
        <>
            <p>Text:</p>
            <DelayInput element="textarea" name='text' value={
                props.widgetSettings.activeEditingLanguage === 'default' ? props.widgetData.text :
                    props.widgetData.translations ?
                        props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?
                            props.widgetData.translations[props.widgetSettings.activeEditingLanguage].text || '' :
                            '' : ''
            } delayTimeout={2000}
                        onChange={e => props.onTextInputsDataChangeHandler(e)}/>
        </>
    );
};
export default TextWidgetTypeFields;
