import React from 'react';
import styled from "styled-components";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
const TextEditors = dynamic(()=>import('../../TextEditors/TextEditors'))

let TitleDescriptionStyledDiv = styled.div`
  width: 98%;
  padding: 1%;
  margin: auto;
  .form-control-input {
    width: 98%;
  }
  .text-editors{
    background-color: var(--main-background-color, #000);
    color: var(--post-page-info-color, #ccc);
    .text-editors-content{
      .quill{
        //margin-left: -1%;
        .ql-container{
          width: 100%;
          height: 80vh;
           color: var(--post-page-info-color, #ccc);
          background-color: var(--main-background-color, #000);
        }
      }
        .sun-editor {
          height: 95%;
          .se-container {
            .se-wrapper {
              height: 100%;
              .se-wrapper-inner {
                color: var(--post-page-info-color, #ccc);
                background-color: var(--main-background-color, #000);
              }
            }
          }
        }
    }

  }
`

const TitleDescription = (props:any) => {
    const post = useSelector((state : Store)=> state?.adminPanelPosts.post);
    const activeEditingLanguage = useSelector((state : Store) => state?.adminPanelPosts.activeEditingLanguage);

    const allowsEditorToUse = post?.postType === 'learn' ? ['ReactPage','Monaco','SunEditor'] :
                              post?.postType === 'video' ? ['Monaco','SunEditor','ReactQuillEditor'] :
                              ['Monaco','SunEditor','ReactQuillEditor','ReactPage']

    const openEditorOnLoad =  post?.postType === 'learn' ? 'Monaco' :
                              post?.postType === 'video' ? 'Monaco' :
                             'SunEditor'

    return (
        <TitleDescriptionStyledDiv className='title-description'>
            <input type="text" name='title'
                // @ts-ignore
                   value={(activeEditingLanguage === 'default' ? post?.title : post?.translations?.[activeEditingLanguage]?.title) || ''}
                   className='form-control-input' placeholder='Enter The TextInput Here'
                   onChange={e => props.onTranslatedInputChangeHandler(e)}/>
            {/*// @ts-ignore*/}
            <TextEditors value={activeEditingLanguage === 'default' ? post.description : post?.translations?.[activeEditingLanguage]?.description || {}}
                         use={allowsEditorToUse}
                         openWith={openEditorOnLoad}
                         language={'html'}
                         onChangeHandler={props.onDescriptionChangeHandler}
                         width={'100%'}
                         height={'80vh'}
            />
        </TitleDescriptionStyledDiv>
    );
};

export default TitleDescription;
