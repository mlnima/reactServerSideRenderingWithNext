import React, {useEffect, useState} from "react";
import 'react-quill/dist/quill.snow.css';
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
import styled from "styled-components";
import slate from '@react-page/plugins-slate';
import Editor from '@react-page/editor';
import image from '@react-page/plugins-image';
import spacer from '@react-page/plugins-spacer';
import divider from '@react-page/plugins-spacer';
import codeSnippet from '../../../../adminIncludes/TextEditors/TextEditorReactPage/plugins/codeSnippet'

const cellPlugins = [slate(), image, spacer, divider, codeSnippet];

const PostDescriptionStyledDiv = styled.div`
  color: var(--post-page-info-color, #ccc);
  margin: 0 5px;
  padding: 50px 0;
  max-width: 95%;
  @media only screen and (min-width: 768px) {
    max-width: 1300px;
  }
`



const PostDescription = ({description, translations}) => {

    const router = useRouter();

    const [descriptionValue, setDescriptionValue] = useState(() => {
        return translations ? translations?.[router.locale] ? translations?.[router.locale]?.description || description : description : description
    });



    useEffect(() => {
        if (description.id && description.rows && description.version){
            dynamic(()=> import('@react-page/editor/lib/index.css'))
            dynamic(()=> import('@react-page/plugins-slate/lib/index.css'))
            dynamic(()=> import('@react-page/plugins-image/lib/index.css'))
            // cellPlugins = [slate(), image, spacer, divider, codeSnippet];
        }
    }, [description]);


    if (description.id && description.rows && description.version){
        return (
            <Editor cellPlugins={cellPlugins} value={descriptionValue} onChange={setDescriptionValue} readOnly/>
        )
    }else return (
        <PostDescriptionStyledDiv className="description" >
            {descriptionValue ? parse(descriptionValue) : ''}
        </PostDescriptionStyledDiv>
    )

};
export default PostDescription;

