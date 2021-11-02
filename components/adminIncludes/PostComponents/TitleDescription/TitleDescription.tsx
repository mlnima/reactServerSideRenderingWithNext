import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import TextEditors from "../../TextEditors/TextEditors";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";

let TitleDescriptionStyledDiv = styled.div`
  width: 98%;
  padding: 1%;
  margin: auto;
  .form-control-input {
    width: 98%;
  }
  .text-editors{
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
    const post = useSelector((state : StoreTypes)=> state?.adminPanelPosts.post);
    const activeEditingLanguage = useSelector((state : StoreTypes) => state?.adminPanelPosts.activeEditingLanguage);

    return (
        <TitleDescriptionStyledDiv className='title-description'>
            <input type="text" name='title'
                // @ts-ignore
                   value={(activeEditingLanguage === 'default' ? post?.title : post?.translations?.[activeEditingLanguage]?.title) || ''}
                   className='form-control-input' placeholder='Enter The Title Here'
                   onChange={e => props.onChangeHandler(e)}/>
            {/*// @ts-ignore*/}
            <TextEditors value={(activeEditingLanguage === 'default' ? post.description : post?.translations?.[activeEditingLanguage]?.description) || ''}
                         use={['Monaco','SunEditor','ReactQuillEditor','ReactPage']}
                         language={'html'}
                         onChangeHandler={props.onDescriptionChangeHandler}
                         width={'100%'}
                         height={'80vh'}
            />
        </TitleDescriptionStyledDiv>
    );
};

export default TitleDescription;
