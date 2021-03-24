import React, {useContext} from 'react';
import SaveDesignChangesBtn from "../SaveDesignChangesBtn";
import {AppContext} from "../../../../context/AppContext";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
//import MonacoEditorComponent from "../../MonacoEditorComponent/MonacoEditorComponent";

const StyleSection = props => {
    const contextData = useContext(AppContext);
    // const onChangeHandler = e => {
    //     contextData.dispatchSiteDesign({
    //         ...contextData.siteDesign,
    //         [e.target.name]: e.target.value
    //     })
    // }
    const onChangeHandler = value => {
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [props.name]: value
        })
    }
    return (
        <div className='style-section'>
            <h1>{props.title}</h1>
            <Editor
              language='scss'
              width={props.width || '100%'}
              height={props.height || '80vh'}
              theme="vs-dark"
              defaultValue={contextData.siteDesign[props.name] || ''}
              value={contextData.siteDesign[props.name] || ''}
              onChange={onChangeHandler}
              //className='style-section-editor'
            />
            {/*<textarea name={props.name} value={contextData.siteDesign[props.name] || ''} className='style-section-editor' onChange={e=>onChangeHandler(e)}/>*/}
            <SaveDesignChangesBtn/>
        </div>
    );
};
export default StyleSection;
