import React,{useRef} from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import SunEditorCore from "suneditor/src/lib/core";
import {buttonList} from "suneditor-react"
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});


const TextEditorSunEditor = (props :{name:string,value:string,onDescriptionChangeHandler:any})=>{
    // const editor = useRef<SunEditorCore>();
    // const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    //     editor.current = sunEditor;
    // };

    return (
            <SunEditor
                      // getSunEditorInstance={getSunEditorInstance}
                       name={props.name}
                       height="90%"
                       onChange={props.onDescriptionChangeHandler}
                       defaultValue={props.value}
                       setOptions={{
                           buttonList:buttonList.complex
                       }}
            />
    );
}


export default TextEditorSunEditor;