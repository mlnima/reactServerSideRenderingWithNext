import { FC } from 'react';
import './RenderIframe.scss'

interface IProps {
  videoEmbedCode?: string;
}

const RenderIframe: FC<IProps> = ({ videoEmbedCode }) => {
  return (
    <div className="RenderIframe ">
      <div className="title"> Video Preview</div>
      <div className="iframeWrapper">
        {videoEmbedCode ? <iframe src={videoEmbedCode} /> : null}
      </div>
    </div>
  );
};

export default RenderIframe;
