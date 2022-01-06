import React, {useEffect} from 'react';
import Head from "next/head";
import dynamic from "next/dynamic";
import {isJsonString} from '../../../../_variables/util/isJsonString'
import Editor from "@monaco-editor/react";
// const monacoPackage = require("monaco-editor/package.json");

//const Editor  = dynamic(() => import('@monaco-editor/react'), {ssr: false})


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
        if (isJsonString(props.value)) {
            props.onChangeHandler(JSON.parse(value),props.name)
        } else {
            props.onChangeHandler(value,props.name)
        }
    }

    return (
        <>
            <Head>
                {/* issue fixed from https://github.com/suren-atoyan/monaco-react/issues/272 post */}
                <link
                    rel="stylesheet"
                    type="text/css"
                    data-name="vs/editor/editor.main"
                    href="https://cdn.jsdelivr.net/npm/monaco-editor@0.25.2/min/vs/editor/editor.main.css"
                />
            </Head>
            <Editor
                language={typeof props.value === 'object' ? 'json' : props.language || 'scss'}
                theme="vs-dark"
                height={props.height || '80vh'}
                value={typeof props.value === 'string' ? props.value : JSON.stringify(props.value)}
                onChange={(value) => onChangeHandler(value)}
                saveViewState={false}
                className={'monaco-editor'}
            />
        </>

    );
};

export default TextEditorMonacoEditor;
