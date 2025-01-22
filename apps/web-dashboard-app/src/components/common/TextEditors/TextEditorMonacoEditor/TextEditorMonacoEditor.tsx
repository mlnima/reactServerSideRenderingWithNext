import React from 'react';
import {isJsonString} from '@repo/utils'
import Editor from "@monaco-editor/react";

interface MonacoEditorProTypes {
    value: string | object,
    onChangeHandler: any,
    height?: string,
    width?: string,
    language?: string,
    name?: string,
    editorRef?: any
}

const TextEditorMonacoEditor = (props: MonacoEditorProTypes) => {

    const onChangeHandler = (value : string) => {
        if (typeof props.value ==='string' && isJsonString(props.value)) {
            props.onChangeHandler(JSON.parse(value),props.name)
        } else {
            props.onChangeHandler(value,props.name)
        }
    }

    return (
        <>
            <Editor
                language={typeof props.value === 'object' ? 'json' : props.language || 'scss'}
                theme="vs-dark"
                height={props.height || '80vh'}
                //@ts-ignore
                value={typeof props.value === 'string' ? props.value : JSON.stringify(props.value)}
                //@ts-ignore
                onChange={(value) => onChangeHandler(value)}
                saveViewState={false}
                className={'monaco-editor'}
            />
        </>

    );
};

export default TextEditorMonacoEditor;
