import React, {useEffect, useState, useContext, useRef} from 'react';
import dynamic from 'next/dynamic'
let ReactQuill = () => <></>;
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}],
        [{'font': []}],
        // [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
        [{'script': 'sub'}, {'script': 'super'}],
        // [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{'direction': 'rtl'}],
        [{'size': ['small', false, 'large', 'huge']}],
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],
        // [{ 'font': [] }],
        [{'align': []}],

    ],
    clipboard: {
        matchVisual: false,
    }
}

const formats = [
    'header', 'font', 'size', 'code', 'background',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'indent', 'script', 'align', 'direction',
    'code-block',
    'color', 'code',
    'script',
    'formula'

]

const TextEditor = props => {
    const [editorState, setEditorState] = useState(false);

    useEffect(() => {
        ReactQuill = dynamic(() => import('react-quill'))
        setEditorState(true)
    }, []);


    if (props.rendering) {
        return (

            <ReactQuill
                className='text-editor'
                value={props.valueData || ''}
                onChange={props.onChangeHandler}
                theme='snow'
                modules={modules}
                formats={formats}
            />

        );
    } else return null


};
export default TextEditor;
