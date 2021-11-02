import React, {useEffect, useState, useContext, useRef} from 'react';
import type {Value} from '@react-page/editor';
import Editor from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import spacer from '@react-page/plugins-spacer';
import divider from '@react-page/plugins-spacer';
import codeSnippet from './plugins/codeSnippet';
import '@react-page/editor/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';
import '@react-page/plugins-image/lib/index.css';
import styled from "styled-components";
// import dynamic from "next/dynamic";
// @ts-ignore
// const image = dynamic(() => import('@react-page/plugins-image'), {ssr: false})
// // @ts-ignore
// const divider = dynamic(() => import('@react-page/plugins-spacer'), {ssr: false})
// // @ts-ignore
// const spacer = dynamic(() => import('@react-page/plugins-spacer'), {ssr: false})
// // @ts-ignore
// const codeSnippet = dynamic(() => import('./plugins/codeSnippet'), {ssr: false})
// TextEditorReactPage

const TextEditorReactPageStyledDiv = styled.div`
  width: 100%;
  .react-page-controls-mode-toggle-control-group {
    right: 0 !important;
  }
`


const cellPlugins = [slate(), image, spacer, divider, codeSnippet];

const TextEditorReactPage = (props: any) => {
    // @ts-ignore
    const [value, setValue] = useState<Value>(null);

    useEffect(() => {
        console.log(value)
        props.onChangeHandler(value)
    }, [value]);

    useEffect(() => {
        setValue(props.value)
    }, []);

    return (

        <TextEditorReactPageStyledDiv>
            {/*// @ts-ignore*/}
            <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />
        </TextEditorReactPageStyledDiv>
    );
};
export default TextEditorReactPage;
