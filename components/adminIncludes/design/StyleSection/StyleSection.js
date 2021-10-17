import React, { useState, useEffect} from 'react';
import SaveDesignChangesBtn from "../SaveDesignChangesBtn";
import dynamic from "next/dynamic";
const Editor = dynamic(()=>import('@monaco-editor/react'),{ssr:false})
import styled from "styled-components";
import {useSelector} from "react-redux";

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
    const design = useSelector(state => state.settings.design)
    const [value, setValue] = useState('')

    useEffect(() => {
        design?.[props.name] ? setValue(design?.[props.name]):null
    }, [design?.[props.name]]);

    const onChangeHandler = value => {
        setValue(value)
    }

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
