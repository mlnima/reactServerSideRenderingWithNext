import React, {useContext, useState, useEffect} from 'react';
import SaveDesignChangesBtn from "../SaveDesignChangesBtn";
import dynamic from "next/dynamic";
import {AppContext} from "../../../../context/AppContext";
//const Editor = dynamic(()=>import('@monaco-editor/react'),{ssr:false})
import Editor from '@monaco-editor/react'
import styled from "styled-components";

const StyleSectionStyledDiv = styled.div`
  width: 100%;

  .style-section-editor {
    section {
      margin: auto;
    }
  }

  .margin {

    height: 80vh;
    max-height: 80vh;
  }
`
const StyleSection = props => {
    const contextData = useContext(AppContext);

    const [value, setValue] = useState('')

    useEffect(() => {
        contextData.siteDesign?.[props.name]?
        setValue(contextData.siteDesign?.[props.name]):null
    }, [contextData.siteDesign?.[props.name]]);

    const onChangeHandler = value => {
        setValue(value)
    }

    useEffect(() => {
        console.log(value)
    }, [value]);
    return (
        <StyleSectionStyledDiv className='style-section'>
            <h1>{props.title}</h1>
            <div className='style-section-editor'>
                <Editor
                    language={props.language || 'scss'}

                    theme="vs-dark"
                    height={'80vh'}
                    defaultValue={value}
                    value={value}
                    onChange={onChangeHandler}
                />
            </div>
            <SaveDesignChangesBtn value={value} name={props.name}/>
        </StyleSectionStyledDiv>
    );
};
export default StyleSection;
