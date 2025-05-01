'use client';

import React, { FC } from 'react';
import { postTypes } from '@repo/data-structures';
import { IPost } from '@repo/typescript-types';
import './Format.scss';

interface IProps{
  post: IPost;
  setPost:React.Dispatch<React.SetStateAction<IPost | null>>
}
const Format:FC<IProps> = ({post,setPost}) => {

  const onChangeHandlerAndSetPreferPostTypeToLocalStorage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPost((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    localStorage.setItem('preferAdminPostType', e.target.value);
  };

  return (
    <div id={'Format'} className='format-section'>
      <select
        className={'primarySelect'}
        name='postType'
        value={post?.postType || 'standard'}
        onChange={(e) => onChangeHandlerAndSetPreferPostTypeToLocalStorage(e)}
      >
        {postTypes.map((postType: string) => (
          <option value={postType} key={postType}>
            {postType}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Format;

// import React from "react";
// import styled from "styled-components";
// import {useSelector} from "react-redux";
// import { editPostAction} from "@store/reducers/postsReducer";
// import {postTypes} from "@repo/data-structures";

// import {useAppDispatch} from "@store/hooks";
//
// const FormatStyledDiv = styled.div`
//     width: 100%;
//
//     .primarySelect {
//         width: 100%;
//     }
// `
//
// const Format = () => {
//     const dispatch = useAppDispatch()
//     const post = useSelector(({posts}) => posts.post);
//
//     const onChangeHandlerAndSetPreferPostTypeToLocalStorage = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         dispatch(editPostAction({
//             [e.target.name]: e.target.value
//         }))
//         localStorage.setItem('preferAdminPostType', e.target.value)
//     }
//
//     return (
//         <FormatStyledDiv className='format-section'>
//             <select className={'primarySelect'}
//                     name='postType'
//                     value={post?.postType || 'standard'}
//                     onChange={e => onChangeHandlerAndSetPreferPostTypeToLocalStorage(e)}
//             >
//                 {postTypes.map((postType:string) => {
//                     return (
//                         <option value={postType} key={postType}>{postType}</option>
//                     )
//                 })}
//             </select>
//         </FormatStyledDiv>
//     );
// };
//
// export default Format;