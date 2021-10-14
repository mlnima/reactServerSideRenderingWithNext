import React, {useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
let ReactQuill = () => <></>;
ReactQuill = dynamic(() => import('react-quill'))
import styled from "styled-components";

const DescriptionEditorStyledDiv = styled.div`
  .quill {
    width: 96%;
    .ql-container {
      min-height: 80vh;
      border-bottom-left-radius: 0.5em;
      border-bottom-right-radius: 0.5em;
      background: #fefcfc;
      .ql-tooltip {
        margin-left: 10%;
        z-index: 1000;
      }
    }
    .ql-snow.ql-toolbar {
      display: block;
      background: #eaecec;
      border-top-left-radius: 0.5em;
      border-top-right-radius: 0.5em;
    }
  }
`
const DescriptionEditor = props => {
    const [state, setState] = useState({
        modules: {
            toolbar: [
                [{'header': '1'}, {'header': '2'}],
                [{'font': []}],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean'],
                ['code-block'],
                [{'script': 'sub'}, {'script': 'super'}],
                [{'indent': '-1'}, {'indent': '+1'}],
                [{'direction': 'rtl'}],
                [{'size': ['small', false, 'large', 'huge']}],
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'color': []}, {'background': []}],
                [{'font': []}],
                [{'align': []}],
            ],
            clipboard: {
                matchVisual: false,
            }
        },
        formats: [
            'header', 'font', 'size', 'code', 'background',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video', 'indent', 'script', 'align', 'direction',
            'code-block',
            'color', 'code',
            'script',
            'code-block', 'formula'

        ],
    });
    const [editorState, setEditorState] = useState(false);

    useEffect(() => {
        ReactQuill = loadable(() => import('react-quill'))
        setEditorState(true)
    }, []);


    if (props.editor) {
        return (
            <DescriptionEditorStyledDiv>
                <ReactQuill
                    value={
                        props.activeEditingLanguage === 'default' ? props.textInputsState.description :
                            props.textInputsState.translations[props.activeEditingLanguage] ? props.textInputsState.translations[props.activeEditingLanguage].description :
                                ''}
                    onChange={props.onDescriptionChangeHandler}
                    theme='snow'
                    modules={state.modules}
                    formats={state.formats}
                />
            </DescriptionEditorStyledDiv>
        );
    } else {
        return (
            <textarea name='description'
                      value={props.activeEditingLanguage === 'default' ? props.textInputsState.description :
                          props.textInputsState.translations[props.activeEditingLanguage] ? props.textInputsState.translations[props.activeEditingLanguage].description :
                              ''}
                      className='TitleDescriptionDescription' onChange={e => props.onTitleDescriptionChangeHandler(e)}/>
        )
    }

};
export default DescriptionEditor;
