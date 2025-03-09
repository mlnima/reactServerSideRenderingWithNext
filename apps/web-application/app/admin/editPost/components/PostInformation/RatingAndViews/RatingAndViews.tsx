'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { convertVariableNameToName } from '@repo/utils';
import { DashboardStore } from '@repo/typescript-types';
import { FC } from 'react';

interface PropTypes {
  name: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rendering: boolean;
}

const RatingAndViews: FC<PropTypes> = ({ name, onChangeHandler, rendering }) => {
  const post = useSelector((state: DashboardStore) => state.posts.post);

  if (rendering) {
    return (
      <div className='post-information-section'>
        <div className="title">
          <p>{convertVariableNameToName(name)}</p>
        </div>
        <div className="editor">
          <input
            type={'number'}
            className='primaryInput'
            name={name}
            value={post?.[name] || 0}
            onChange={onChangeHandler}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default RatingAndViews;

// import {convertVariableNameToName} from "@repo/utils";
// import {useSelector} from "react-redux";
// import {DashboardStore} from "@repo/typescript-types";
// import {FC} from "react";
//
// interface PropTypes{
//     name:string,
//     onChangeHandler:Function,
//     rendering:boolean
// }
//
// const RatingAndViews:FC<PropTypes> = props => {
//     const post = useSelector(({posts}: DashboardStore) => posts.post);
//     if (props.rendering) {
//         return (
//             <div className='post-information-section'>
//                 <div className="title">
//                     <p>{convertVariableNameToName(props.name)}</p>
//                 </div>
//                 <div className="editor">
//                     {/*//@ts-ignore*/}
//                     <input type={'number'} className='primaryInput' name={props.name} value={post?.[props.name] || 0} onChange={e => props.onChangeHandler(e)}/>
//                 </div>
//             </div>
//         );
//     } else return null
//
// };
// export default RatingAndViews;