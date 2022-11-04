import React from 'react';
import Editor from "@monaco-editor/react";

// import Head from "next/head";
interface MonacoEditorPropTypes {
    name: string,
    language: string,
    theme?: string,
    defaultValue: string,
    value: string,
    width?: number | string,
    height?: number | string,
    className?: string,
    onChange: any,

}

const MonacoEditor = (props: MonacoEditorPropTypes) => {

    const onChangeHandler = (value: string) => {
        const e = {
            target: {
                name: props.name,
                value
            }
        }
        props.onChange(e)
    }

    const onPrettyHandler = () => {
        //@ts-ignore
        Editor?.getAction('editor.action.formatDocument').run();
    }


    return (
        <>

            <Editor
                language={props.language || 'css'}
                theme={props.theme || 'vs-dark'}
                defaultValue={props.defaultValue || ''}
                value={props.value || ''}
                onChange={onChangeHandler}
                className={props.className || ''}
                width={props.width || '100%'}
                height={props.height || '500px'}
            />
        </>
    );
};
export default MonacoEditor;
