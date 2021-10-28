import React, {useEffect, useRef} from 'react';
import SaveDesignChangesBtn from "../SaveDesignChangesBtn";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {editDesign} from "../../../../store/actions/settingsActions";
import dynamic from "next/dynamic";
// import TextEditorMonacoEditor from "../../TextEditors/TextEditorMonacoEditor/TextEditorMonacoEditor";
const TextEditorMonacoEditor = dynamic(() => import('../../TextEditors/TextEditorMonacoEditor/TextEditorMonacoEditor'), {ssr: false});

const StyleSectionStyledDiv = styled.div`
  width: 100%;

  .style-section-editor {
    height: 80vh;

    .cm-theme-dark {
      height: 80vh;
    }
  }

  .margin {
    //display: none;
  }
`

const StyleSection = props => {
    const editorRef = useRef(null);
    const dispatch = useDispatch()
    const design = useSelector(state => state?.settings.design)
    // const onChangeHandler = (value,event) => {
    //     console.log(event)
    //     const e = {
    //         target:{
    //             value,
    //             name: props.name
    //         }
    //     }
    //     dispatch(editDesign(e))
    // }

    useEffect(() => {
        if (editorRef.current){
            editorRef.current.value = design?.[props.name]
        }


    }, [props]);

    return (
        <StyleSectionStyledDiv className='style-section'>
            <h1>{props.title}</h1>
            <div className='style-section-editor'>
                <TextEditorMonacoEditor value={design?.[props.name]}
                                        editorRef={editorRef}
                    // onChangeHandler={onChangeHandler}
                                        height={'80vh'}
                                        width={'80vw'}
                                        language={'scss'}
                />
            </div>
            <SaveDesignChangesBtn reload={true} editorRef={editorRef} name={props.name}/>
        </StyleSectionStyledDiv>
    );
};
export default StyleSection;
