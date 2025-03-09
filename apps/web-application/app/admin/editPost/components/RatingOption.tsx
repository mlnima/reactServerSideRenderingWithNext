'use client';

import { useSelector } from 'react-redux';
import { FC } from 'react';
import { DashboardStore } from '@repo/typescript-types';
import { useAppDispatch } from '@storeDashboard/hooks';
import { editPostAction } from '@storeDashboard/reducers/postsReducer';

const RatingOption: FC = () => {
  const post = useSelector(({ posts }: DashboardStore) => posts.post);
  const dispatch = useAppDispatch();

  return (
    <select
      className={'primarySelect'}
      name='rating'
      value={post?.rating || 'enable'}
      onChange={(e) => {
        dispatch(editPostAction({ [e.target.name]: e.target.value }));
      }}
    >
      <option value='enable'>Enable</option>
      <option value='disable'>Disable</option>
    </select>
  );
};

export default RatingOption;


// import { useSelector} from "react-redux";
// import {FC} from "react";
// import {DashboardStore, } from "@repo/typescript-types";
// import {useAppDispatch} from "@store/hooks";
// import {editPostAction} from "@store/reducers/postsReducer";
//
//
// const RatingOption:FC = () => {
//     const post = useSelector(({posts}:DashboardStore) => posts.post);
//     const dispatch = useAppDispatch()
//
//     return (
//         <select className={'primarySelect'}
//                 name='rating'
//                 value={post?.rating || 'enable'}
//                 onChange={e=>{dispatch(editPostAction({[e.target.name]: e.target.value}))}}>
//             <option value='enable'>Enable</option>
//             <option value='disable'>Disable</option>
//         </select>
//     );
// };
// export default RatingOption;
