'use client';

import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';

interface PropTypes {
  rendering: boolean;
}

const RenderIframe = (props: PropTypes) => {
  const videoEmbedCode = useSelector(({ posts }: DashboardStore) => posts.post?.videoEmbedCode);

  if (props.rendering) {
    return (
      <div className="post-information-section">
        <div className="title"> Video Preview</div>
        <div className="editor">
          {videoEmbedCode ? <iframe src={videoEmbedCode} /> : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default RenderIframe;
