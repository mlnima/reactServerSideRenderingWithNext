'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { videoQualities } from '@repo/data-structures';
import { FC } from 'react';
import { DashboardStore } from '@repo/typescript-types';

interface PropType {
  rendering: boolean;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Quality: FC<PropType> = ({ rendering, onChangeHandler }) => {
  const post = useSelector((state: DashboardStore) => state.posts.post);

  if (rendering) {
    return (
      <div className='post-information-section'>
        <div className="title">
          <p>Quality</p>
        </div>
        <div className="editor">
          <div className="option">
            <select
              className={'primarySelect'}
              value={post?.quality || 'HD'}
              name='quality'
              onChange={onChangeHandler}
            >
              {videoQualities.map((videoQuality: string, index: number) => {
                return (
                  <option key={`${videoQuality}${index}`} value={videoQuality}>
                    {videoQuality}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Quality;

// import {useSelector} from "react-redux";
// import {videoQualities} from "@repo/data-structures";
// import {FC} from "react";
// import {DashboardStore} from "@repo/typescript-types";
//
// interface PropType {
//     rendering: boolean,
//     onChangeHandler: any
// }
//
// const Quality: FC<PropType> = ({rendering, onChangeHandler}) => {
//     const post = useSelector(({posts}: DashboardStore) => posts.post);
//
//     if (rendering) {
//         return (
//             <div className='post-information-section'>
//                 <div className="title">
//                     <p>Quality</p>
//                 </div>
//                 <div className="editor">
//                     <div className="option">
//                         <select className={'primarySelect'} value={post?.quality || 'HD'} name='quality'
//                                 onChange={e => onChangeHandler(e)}>
//                             {videoQualities.map((videoQuality: string,index:number) => {
//                                 return <option value={videoQuality} key={`${videoQuality}${index}`}>{videoQuality}</option>
//                             })}
//                         </select>
//                     </div>
//                 </div>
//             </div>
//         );
//     } else return null
//
// };
// export default Quality;
//
