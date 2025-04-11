import { FC } from 'react';
import './ImagePreview.scss';

interface IProps {
  mainThumbnail: string;
}

const ImagePreview: FC<IProps> = ({ mainThumbnail }) => {

  if (!mainThumbnail) return null;
  const imageUrl = mainThumbnail.includes('http') ? mainThumbnail : `${process.env.NEXT_PUBLIC_API_SERVER_URL}${mainThumbnail}`;
  return (
    <div className="ThumbnailPreview">
      <div className="title">
        <p>Image Preview</p>
      </div>
      <div className="editor">
        <img src={imageUrl} />
      </div>
    </div>
  );
};

export default ImagePreview;

