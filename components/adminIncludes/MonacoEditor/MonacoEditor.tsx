import React from 'react';
import Editor from "@monaco-editor/react";
// import Head from "next/head";
interface MonacoEditorPropTypes {
    name:string,
    language:string,
    theme?:string,
    defaultValue:string,
    value:string,
    width?:string,
    height?:string,
    className?:string,
    onChange:any
}
const MonacoEditor = (props:MonacoEditorPropTypes) => {

    const onChangeHandler = (value:string) => {
        const e = {
            target:{
                name:props.name,
                value
            }
        }
        props.onChange(e)
    }

    const onPrettyHandler = ()=>{
        //@ts-ignore
        Editor?.getAction('editor.action.formatDocument').run();
    }


    return (
        <>
            {/*<Head>*/}
            {/*    <link*/}
            {/*        rel={'stylesheet'}*/}
            {/*        type={'text/css'}*/}
            {/*        data-name={'vs/editor/editor.main'}*/}
            {/*        href={'https://cdn.jsdelivr.net/npm/monaco-editor@0.25.2/min/vs/editor/editor.main.css'}*/}
            {/*    />*/}
            {/*</Head>*/}
            {/*<button onClick={onPrettyHandler}>Pretty</button>*/}
            <Editor
                language={props.language || 'css'}
                theme={props.theme || 'vs-dark'}
                defaultValue={props.defaultValue || ''}
                value={props.value || ''}
                onChange={onChangeHandler}
                className={props.className || ''}
                width={props.width || '100%'}
                height={props.height || '500px'}
                // options={{
                //     noSemanticValidation: true,
                //     noSyntaxValidation:true
                // }}

            />
        </>
    );
};
export default MonacoEditor;
