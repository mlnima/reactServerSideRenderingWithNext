import React from 'react';
import {DelayInput} from "react-delay-input";

const TextWidgetTypeFields = props => {

    return (
        <>
            <p>Text:</p>
            <DelayInput element="textarea" name='text' value={
                props.widgetSettings.activeEditingLanguage === 'default' ? props.textInputsData.text :
                    props.textInputsData.translations ?
                        props.textInputsData.translations[props.widgetSettings.activeEditingLanguage] ?
                            props.textInputsData.translations[props.widgetSettings.activeEditingLanguage].text || '' :
                            '' : ''
            } delayTimeout={2000}
                        onChange={e => props.onTextInputsDataChangeHandler(e)}/>

            <p>Text Align:</p>
            <select name='textAlign' value={props.textInputsData.textAlign} onChange={e => props.onTextInputsDataChangeHandler(e)}>
                <option value='left'>Left</option>
                <option value='center'>Center</option>
                <option value='right'>Right</option>
            </select>
            <p>Text Color:</p>
            <DelayInput name='textColor' value={props.widgetData.data.textColor || ''} delayTimeout={4000}
                        onChange={e => props.onChangeHandler(e)}/>
        </>
    );
};
export default TextWidgetTypeFields;
