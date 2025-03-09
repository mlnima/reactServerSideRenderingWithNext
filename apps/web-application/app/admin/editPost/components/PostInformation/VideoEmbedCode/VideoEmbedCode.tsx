'use client';

import React, { FC } from 'react';
import { IPost } from "@repo/typescript-types";

interface PropType {
  postData: IPost;
  rendering: boolean;
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const VideoEmbedCode: FC<PropType> = (props) => {
  if (props.rendering) {
    return (
      <div className='post-information-section'>
        <div className="title">
          <p>Video Embed Code</p>
        </div>
        <div className="editor">
          <textarea
            className='textareaInput'
            name='videoEmbedCode'
            value={props.postData.videoEmbedCode}
            onChange={(e) => props.onChangeHandler(e)}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default VideoEmbedCode;


// import React, {FC} from 'react';
// import {Post} from "@repo/typescript-types";
//
// interface PropType{
//     postData:Post,
//     rendering:boolean,
//     onChangeHandler:any
// }
//
// const VideoEmbedCode:FC<PropType> = props => {
//     if (props.rendering){
//         return (
//             <div className='post-information-section'>
//                 <div className="title">
//                     <p>Video Embed Code</p>
//                 </div>
//                 <div className="editor">
//                     <textarea  className='textareaInput' name='videoEmbedCode' value={props.postData.videoEmbedCode} onChange={e => props.onChangeHandler(e)}/>
//                 </div>
//             </div>
//         );
//     }else return null
//
//
// };
// export default VideoEmbedCode;