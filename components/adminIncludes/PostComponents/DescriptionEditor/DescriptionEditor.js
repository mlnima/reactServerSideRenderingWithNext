import React, {useEffect, useState, useContext, useRef} from 'react';
import 'react-quill/dist/quill.snow.css';
import './DescriptionEditor.scss'
let ReactQuill = () => <></>;
//import {core} from 'react-quill'

const DescriptionEditor = props => {
    const [state, setState] = useState({
        modules:{
            toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'},
                    {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean']
            ],
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            }
        },
        formats : [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
        ],
        // propTypes : {
        //     placeholder: PropTypes.string,
        // }
    });
    const [editorState, setEditorState] = useState(false);

    useEffect(() => {
        ReactQuill = require('react-quill');
        setEditorState(true)
    }, []);


    if (props.editor){
        return (
            <ReactQuill
                value={props.activeEditingLanguage === 'default' ? props.textInputsState.description : props.textInputsState.translations[props.activeEditingLanguage] ? props.textInputsState.translations[props.activeEditingLanguage].description : ''}
                onChange={props.onDescriptionChangeHandler}
                theme='snow'
                modules={state.modules}
                formats={state.formats}
            />
        );
    }else {
        return (
            <textarea name='description'
                      value={props.activeEditingLanguage === 'default' ? props.textInputsState.description : props.textInputsState.translations[props.activeEditingLanguage] ? props.textInputsState.translations[props.activeEditingLanguage].description : ''}
                      className='TitleDescriptionDescription' onChange={e => props.onDescriptionChangeHandler(e)}/>
        )
    }

};
export default DescriptionEditor;
