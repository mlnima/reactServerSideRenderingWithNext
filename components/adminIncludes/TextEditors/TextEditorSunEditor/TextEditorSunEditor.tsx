import React,{useRef} from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import SunEditorCore from "suneditor/src/lib/core";
import {buttonList} from "suneditor-react"
const SunEditor = dynamic(() => import("suneditor-react"), {ssr: false});


const TextEditorSunEditor = (props :{name?:string,value:string,onChangeHandler:any,language?:string,height?:string,width?:string})=>{
    return (
            <SunEditor
                       name={props.name}
                       height={props.height || "80vh"}
                       onChange={props.onChangeHandler}
                       defaultValue={props.value}

                       setOptions={{
                           buttonList:buttonList.complex

                       }}
            />
    );
}


export default TextEditorSunEditor;