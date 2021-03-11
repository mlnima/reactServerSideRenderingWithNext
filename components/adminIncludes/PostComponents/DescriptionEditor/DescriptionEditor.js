import React, {useEffect, useState, useContext, useRef} from 'react';
import 'react-quill/dist/quill.snow.css';
import './DescriptionEditor.scss'
import loadable from '@loadable/component'
let ReactQuill = () => <></>;
ReactQuill = loadable(() => import('react-quill'))

//import ReactQuill from 'react-quill'

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
              //  ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
                ['code-block'],                    // blocks
              //  [{ 'header': 1 }, { 'header': 2 }],              // custom button values
               // [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
                [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
                [{ 'direction': 'rtl' }],                        // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
                [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
                [{ 'font': [] }],                                // font family
                [{ 'align': [] }],                               // text align

            ],
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            }
        },
        formats: [
            'header', 'font', 'size','code','background',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video','indent','script', 'align','direction',
            'code-block',
            'color', 'code',
            'script',
            'code-block', 'formula'

        ],
    });
    const [editorState, setEditorState] = useState(false);

    useEffect(() => {
        //ReactQuill = require('react-quill');
        ReactQuill = loadable(() => import('react-quill'))
        setEditorState(true)
    }, []);


    useEffect(() => {
        console.log(typeof props.textInputsState.description)
    }, [props.textInputsState.description]);


    if (props.editor) {
        return (
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