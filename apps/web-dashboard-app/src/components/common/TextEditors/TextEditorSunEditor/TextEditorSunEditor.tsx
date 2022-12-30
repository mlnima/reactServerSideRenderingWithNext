import React from 'react';
import 'suneditor/dist/css/suneditor.min.css';
import {buttonList} from "suneditor-react"
import SunEditor from 'suneditor-react'

const TextEditorSunEditor = (
    props: { name?: string, value: string, onChangeHandler: any, language?: string, height?: string, width?: string }) => {
    return (
        <SunEditor
            name={props.name}
            height={props.height || "80vh"}
            onChange={props.onChangeHandler}
            defaultValue={props.value}
            setOptions={{
                buttonList: buttonList.complex
            }}
        />
    );
}


export default TextEditorSunEditor;