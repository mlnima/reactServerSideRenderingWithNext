import React, {useEffect} from 'react';
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {ssr: false})
import {DiffEditor, useMonaco, loader} from "@monaco-editor/react";


interface MonacoEditorProTypes {
    value: string | object,
    onChangeHandler: any,
    height?: string,
    width?: string,
    language?: string,
    editorRef?: any
}

const TextEditorMonacoEditor = (props: MonacoEditorProTypes) => {
    // const monaco = useMonaco();
    // useEffect(() => {
    //     console.log(monaco)
    // }, [monaco]);
    return (
        <MonacoEditor
            // @ts-ignore
            language={typeof props.value === 'object' ? 'json' : props.language || 'scss'}
            theme="vs-dark"
            height={props.height || '80vh'}
            value={typeof props.value === 'string' ? props.value : JSON.stringify(props.value)}
            defaultValue={''}
            // @ts-ignore
            onChange={(value) => typeof props.value === 'string' ? props.onChangeHandler(value) : props.onChangeHandler(JSON.parse(value))}
            saveViewState={false}
            className={'monaco-editor'}
        />
    );
};

export default TextEditorMonacoEditor;
