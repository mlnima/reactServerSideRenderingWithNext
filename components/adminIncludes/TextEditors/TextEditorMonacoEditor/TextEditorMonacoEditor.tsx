import React, {useEffect, useState, useContext, useRef} from 'react';
import MonacoEditor from '@monaco-editor/react'


const TextEditorMonacoEditor = (props: { value: string, onChangeHandler: any, height?: string, width?: string, language: string, editorRef?: any }) => {

    const handleEditorDidMount = (editor: any, monaco: any) => {
        props.editorRef ? props.editorRef.current = editor : null
    }

    return (
        <MonacoEditor
            language={props.language || 'scss'}
            theme="vs-dark"
            height={props.height || '80vh'}
            value={props.value || ''}
            onChange={props.onChangeHandler}
            onMount={handleEditorDidMount}

        />
    );
};
export default TextEditorMonacoEditor;
