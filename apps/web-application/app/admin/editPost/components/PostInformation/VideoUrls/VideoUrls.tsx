'use client';

import { FC } from 'react';
import { useState } from 'react'; // Import useState if you plan to manage state locally

interface PropType {
  rendering: boolean;
}

const VideoUrls: FC<PropType> = (props) => {
  const [videoUrl, setVideoUrl] = useState(''); // Example state management for the input value

  if (props.rendering) {
    return (
      <div className="post-information-section">
        <div className="title">
          <p>Video URL</p>
        </div>
        <div className="editor">
          <input
            className="textInput"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default VideoUrls;

// import { FC } from 'react';
//
// interface PropType {
//     rendering: boolean;
// }
//
// const VideoUrls: FC<PropType> = props => {
//     if (props.rendering) {
//         return (
//             <div className="post-information-section">
//                 <div className="title">
//                     <p>Video URL</p>
//                 </div>
//                 <div className="editor">
//                     <input className="textInput" />
//                 </div>
//             </div>
//         );
//     } else return null;
// };
// export default VideoUrls;
