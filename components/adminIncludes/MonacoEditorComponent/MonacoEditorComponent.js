import React, {useEffect, useState, useContext, useRef} from 'react';
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

const MonacoEditorComponent = props => {
    const [name, setName] = useState(props.nameValue);
    const onChangeHandler = value=>{
        props.setWidgetData({
            ...props.widgetData,
            [props.nameValue]:value
        })
    }
    return (
        <Editor
        language={props.language}
        name={props.nameValue}
        theme="vs-dark"
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={(value)=>onChangeHandler(value)}
        classname={props.classNameValue}
         width={props.width || '100%'}
        height={props.height || '300px'}
        />
    );
};
export default MonacoEditorComponent;
