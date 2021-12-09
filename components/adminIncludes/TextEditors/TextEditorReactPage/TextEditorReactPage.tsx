import React, {useEffect, useState, useContext, useRef} from 'react';
import type {Value} from '@react-page/editor';
import Editor from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import spacer from '@react-page/plugins-spacer';
import divider from '@react-page/plugins-divider';
import html5video from '@react-page/plugins-html5-video';
import video from '@react-page/plugins-video';
// @ts-ignore
import background, { ModeEnum } from '@react-page/plugins-background';
import codeSnippet from './plugins/codeSnippet';
import '@react-page/editor/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';
import '@react-page/plugins-image/lib/index.css';
import '@react-page/plugins-background/lib/index.css'
import styled from "styled-components";

const TextEditorReactPageStyledDiv = styled.div`
  width: 100%;
  .react-page-controls-mode-toggle-control-group {
    right: 0 !important;
  }
`


const cellPlugins = [slate(),  background({
    // imageUpload: fakeImageUploadService('/images/sea-bg.jpg'),
    enabledModes:
        ModeEnum.COLOR_MODE_FLAG |
        ModeEnum.IMAGE_MODE_FLAG |
        ModeEnum.GRADIENT_MODE_FLAG,
}), image, spacer, divider, codeSnippet,html5video,video];

const TextEditorReactPage = (props: any) => {
    // @ts-ignore
    const [value, setValue] = useState<Value>(null);

    useEffect(() => {
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
