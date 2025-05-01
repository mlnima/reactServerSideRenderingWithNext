'use client';

import React, { FC } from 'react';
import { IPost } from '@repo/typescript-types';

interface IProps{
  post: IPost;
  setPost: React.Dispatch<React.SetStateAction<IPost | null>>,
}
const RatingOption:FC<IProps> = ({post,setPost}) => {

  return (
    <select
      className={'primarySelect'}
      name='rating'
      value={post?.rating || 'enable'}
      onChange={(e) => {
        setPost((prevState)=>({ ...prevState, [e.target.name]: e.target.value }));
      }}
    >
      <option value='enable'>Enable</option>
      <option value='disable'>Disable</option>
    </select>
  );
};

export default RatingOption;