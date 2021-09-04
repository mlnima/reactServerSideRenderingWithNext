import React, {useContext} from 'react';
import SaveDesignChangesBtn from "../SaveDesignChangesBtn";
import {AppContext} from "../../../../context/AppContext";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

import styled from "styled-components";
const StyleSectionStyledDiv = styled.div`
section{
  width: 100%;
  //height: 800px;
  //max-height: 800px;
}
`
const StyleSection = props => {
    const contextData = useContext(AppContext);
    const onChangeHandler = value => {
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [props.name]: value
        })
    }
    return (
        <StyleSectionStyledDiv className='style-section'>
            <h1>{props.title}</h1>
            <Editor
              language='scss'
              width={props.width || '100%'}
              height={ '800px'}
              theme="vs-dark"
              defaultValue={contextData.siteDesign[props.name] || ''}
              value={contextData.siteDesign[props.name] || ''}
              onChange={onChangeHandler}
              //className='style-section-editor'
            />
            {/*<textarea name={props.name} value={contextData.siteDesign[props.name] || ''} className='style-section-editor' onChange={e=>onChangeHandler(e)}/>*/}
            <SaveDesignChangesBtn/>
        </StyleSectionStyledDiv>
    );
};
export default StyleSection;
