import React from 'react';
import Editor, {DiffEditor, useMonaco, loader} from "@monaco-editor/react";

const TextWidgetTypeFields = props => {

    const onChangeHandler = value => {
        const e = {
            target: {
                name: 'text',
                value
            }
        }
        props.onTextInputsDataChangeHandler(e)
    }

    if (props.rendering) {
        return (
            <div className={'monaco-editor-section'}>
                <p>Text:</p>
                <Editor
                    language='html'
                    name='text'
                    theme="vs-dark"
                    value={
                        props.widgetSettings.activeEditingLanguage === 'default' ? props.widgetData.text :
                            props.widgetData.translations ?
                                props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?
                                    props.widgetData.translations[props.widgetSettings.activeEditingLanguage].text || '' :
                                    '' : ''
                    }
                    onChange={onChangeHandler}

                    width={props.width || '100%'}
                    height={props.height || '300px'}
                />
            </div>
        );
    } else return null

};
export default TextWidgetTypeFields;


// {/*<textarea name='text' value={*/}
// {/*    props.widgetSettings.activeEditingLanguage === 'default' ? props.widgetData.text :*/}
// {/*        props.widgetData.translations ?*/}
// {/*            props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?*/}
// {/*                props.widgetData.translations[props.widgetSettings.activeEditingLanguage].text || '' :*/}
// {/*                '' : ''*/}
// {/*}*/}
// {/*          onChange={e => props.onTextInputsDataChangeHandler(e)}/>*/}