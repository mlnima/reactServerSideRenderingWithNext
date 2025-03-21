'use client';

import { FC } from 'react';
import { useState } from 'react'; // Import useState if you plan to manage state locally

interface PropType {
  rendering: boolean;
}

const VideoUrls: FC<PropType> = ({ rendering }) => {
  const [videoUrl, setVideoUrl] = useState(''); // Example state management for the input value

  if (!rendering) return null;
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
};

export default VideoUrls;
