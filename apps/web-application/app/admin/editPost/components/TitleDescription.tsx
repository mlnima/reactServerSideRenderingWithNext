'use client';

import React from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';
import TextEditors from '@components/textEditors/TextEditors';


const TitleDescriptionStyledDiv = styled.div`
  box-sizing: border-box;
  margin: auto;
  width: 100%;
  height: 100%;

  .primaryInput {
    box-sizing: border-box;
  }

  .text-editors {
    background-color: var(--primary-background-color, #000);
    color: var(--secondary-text-color, #ccc);

    .text-editors-content {
      .quill {
        .ql-container {
          width: 100%;
          height: 80vh;
          color: var(--secondary-text-color, #ccc);
          background-color: var(--primary-background-color, #000);
        }
      }

      .sun-editor {
        height: 95%;

        .se-container {
          .se-wrapper {
            height: 100%;

            .se-wrapper-inner {
              color: var(--secondary-text-color, #ccc);
              background-color: var(--primary-background-color, #000);
            }
          }
        }
      }
    }
  }
`;

interface TitleDescriptionProps {
  onTranslatedInputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChangeHandler: (data: string) => void;
}

const TitleDescription = ({ onTranslatedInputChangeHandler, onDescriptionChangeHandler }: TitleDescriptionProps) => {
  const post = useSelector(({ posts }: DashboardStore) => posts.post);
  const activeEditingLanguage = useSelector(({ posts }: DashboardStore) => posts.activeEditingLanguage);

  const allowsEditorToUse = post?.postType === 'learn'
    ? ['ReactPage', 'Monaco', 'SunEditor']
    : post?.postType === 'video'
      ? ['Monaco', 'SunEditor', 'ReactQuillEditor']
      : ['Monaco', 'SunEditor', 'ReactQuillEditor', 'ReactPage'];

  const openEditorOnLoad = post?.postType === 'learn'
    ? 'Monaco'
    : post?.postType === 'video'
      ? 'Monaco'
      : 'SunEditor';

  return (
    <TitleDescriptionStyledDiv className='title-description'>
      <input
        type="text"
        name='title'
        value={(activeEditingLanguage === 'default' ? post?.title : post?.translations?.[activeEditingLanguage]?.title) || ''}
        className='primaryInput'
        placeholder='Enter The TextInput Here'
        onChange={onTranslatedInputChangeHandler}
      />
      <TextEditors
        value={activeEditingLanguage === 'default' ? post?.description : post?.translations?.[activeEditingLanguage]?.description || {}}
        use={allowsEditorToUse}
        openWith={openEditorOnLoad}
        language={'html'}
        onChangeHandler={onDescriptionChangeHandler}
        width={'100%'}
        height={'50vh'}
      />
    </TitleDescriptionStyledDiv>
  );
};

export default TitleDescription;

// import React from 'react';
// import styled from "styled-components";
// import {useSelector} from "react-redux";
// import {DashboardStore} from "@repo/typescript-types";
// import TextEditors from '@components/common/TextEditors/TextEditors'
//
// let TitleDescriptionStyledDiv = styled.div`
//   box-sizing: border-box;
//   margin: auto;
//   width: 100%;
//   height: 100%;
//   .primaryInput {
//     box-sizing: border-box;
//   }
//   .text-editors{
//     background-color: var(--primary-background-color,#000);
//     color: var(--secondary-text-color, #ccc);
//     .text-editors-content{
//       .quill{
//         .ql-container{
//           width: 100%;
//           height: 80vh;
//            color: var(--secondary-text-color, #ccc);
//           background-color:var(--primary-background-color,#000);
//         }
//       }
//         .sun-editor {
//           height: 95%;
//           .se-container {
//             .se-wrapper {
//               height: 100%;
//               .se-wrapper-inner {
//                 color: var(--secondary-text-color, #ccc);
//                 background-color: var(--primary-background-color,#000);
//               }
//             }
//           }
//         }
//     }
//   }
// `
//
// const TitleDescription = (props:any) => {
//     const post = useSelector(({posts}:DashboardStore) => posts.post);
//
//     const activeEditingLanguage = useSelector(({posts} : DashboardStore) => posts.activeEditingLanguage);
//
//     const allowsEditorToUse = post?.postType === 'learn' ? ['ReactPage','Monaco','SunEditor'] :
//                               post?.postType === 'video' ? ['Monaco','SunEditor','ReactQuillEditor'] :
//                               ['Monaco','SunEditor','ReactQuillEditor','ReactPage']
//
//     const openEditorOnLoad =  post?.postType === 'learn' ? 'Monaco' :
//                               post?.postType === 'video' ? 'Monaco' :
//                              'SunEditor'
//
//     return (
//         <TitleDescriptionStyledDiv className='title-description'>
//             <input type="text" name='title'
//                    value={(activeEditingLanguage === 'default' ? post?.title : post?.translations?.[activeEditingLanguage]?.title) || ''}
//                    className='primaryInput' placeholder='Enter The TextInput Here'
//                    onChange={e => props.onTranslatedInputChangeHandler(e)}/>
//             <TextEditors value={activeEditingLanguage === 'default' ? post?.description : post?.translations?.[activeEditingLanguage]?.description || {}}
//                          use={allowsEditorToUse}
//                          openWith={openEditorOnLoad}
//                          language={'html'}
//                          onChangeHandler={props.onDescriptionChangeHandler}
//                          width={'100%'}
//                          height={'50vh'}
//             />
//         </TitleDescriptionStyledDiv>
//     );
// };
//
// export default TitleDescription;
