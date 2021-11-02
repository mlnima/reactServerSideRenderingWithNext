import React from 'react';
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(() => import('react-quill'),{ssr:false})

const modules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}],
        [{'font': []}],
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

interface ReactQuillPropTypes {
    value: string,
    onChangeHandler: any,
    height?: string,
    width?: string,
    language?: string,
    editorRef?: any
}

const TextEditorReactQuill = ({value,width,height,onChangeHandler}: ReactQuillPropTypes) => {

    return (
        <ReactQuill
            className='text-editor'
            value={value || ''}
            onChange={onChangeHandler}
            theme='snow'
            modules={modules}
            formats={formats}
            // @ts-ignore
            width={width}
            height={height}
        />
    );
};
export default TextEditorReactQuill;
