import React, {useState} from "react";
import {useRouter} from "next/router";
import slate from '@react-page/plugins-slate';
import Editor from '@react-page/editor';
import image from '@react-page/plugins-image';
import spacer from '@react-page/plugins-spacer';
import divider from '@react-page/plugins-divider';
import html5video from '@react-page/plugins-html5-video';
import video from '@react-page/plugins-video';
// @ts-ignore
import background, { ModeEnum } from '@react-page/plugins-background';
import codeSnippet from '../../../../adminIncludes/TextEditors/TextEditorReactPage/plugins/codeSnippet';
import '@react-page/editor/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';
import '@react-page/plugins-image/lib/index.css';
import styled from "styled-components";

const cellPlugins = [slate(), background({
    // imageUpload: fakeImageUploadService('/images/sea-bg.jpg'),
    enabledModes:
        ModeEnum.COLOR_MODE_FLAG |
        ModeEnum.IMAGE_MODE_FLAG |
        ModeEnum.GRADIENT_MODE_FLAG,
}), image, spacer, divider, codeSnippet,html5video,video];

const PostDescriptionStyledDiv = styled.div`
  color: var(--post-page-info-color, #ccc);
  margin: 0 5px;
  padding: 50px 0;
  width: 95%;
  max-width: 95%;
  @media only screen and (min-width: 768px) {
    
    max-width: 1300px;
  }
`

interface LearnTypePostPageDescriptionPropTypes {
    description: string | object,
    translations: object
}

const LearnTypePostPageDescription = ({description, translations}: LearnTypePostPageDescriptionPropTypes) => {
    const router = useRouter();
    const [descriptionValue, setDescriptionValue] = useState(() => {
        // @ts-ignore
        return translations ? translations?.[router?.locale || process.env.NEXT_PUBLIC_DEFAULT_LOCAL] ? translations?.[router?.locale || process.env.NEXT_PUBLIC_DEFAULT_LOCAL]?.description || description : description : description;
    });
    return (
        <PostDescriptionStyledDiv>
            {/*// @ts-ignore*/}
            <Editor cellPlugins={cellPlugins} value={descriptionValue} onChange={setDescriptionValue} readOnly/>
        </PostDescriptionStyledDiv>
    );
};


export default LearnTypePostPageDescription;