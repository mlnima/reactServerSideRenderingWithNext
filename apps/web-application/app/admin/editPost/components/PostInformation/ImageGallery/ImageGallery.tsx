'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch } from '@store/hooks';
import { faXmark, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ImageGallary.scss';
import { IPost } from '@repo/typescript-types';
import { loading } from '@store/reducers/globalStateReducer';
// import { dashboardAPIRequestUploadFile } from '@repo/api-requests';
// import { AxiosResponse } from 'axios';


interface ImageGalleryPropTypes {
  onChangeHandler: any;
  post: IPost;
}

const ImageGallery: React.FC<ImageGalleryPropTypes> = ({ onChangeHandler, post }) => {
  const dispatch = useAppDispatch();
  const uploadInputElement = useRef(null);
  const [state, setState] = useState({ images: [], imageFromUrl: '' });

  useEffect(() => {
    setState({
      ...state,
      images: post.images || [],
      imageFromUrl: '',
    });
  }, []);

  const renderImagesPreview = (post.images || []).map(image => {
    const onRemoveImageHandler = () => {
      const e = { target: { name: 'images', value: post.images.filter(i => i !== image) } };
      onChangeHandler(e);
    };

    return (
      <div className="product-information-image-preview" key={image + performance.now()}>
        <img src={image} />
        <button className="image-remove-btn" onClick={() => onRemoveImageHandler()}>
          <FontAwesomeIcon icon={faXmark} className={'image-remove-btn-icon'} />
        </button>
      </div>
    );
  });

  const onAddImageFromUrlHandler = () => {
    const e = { target: { name: 'images', value: [...post.images, state.imageFromUrl] } };
    onChangeHandler(e);
  };

  const onUploadHandler =async (e: React.ChangeEvent<HTMLInputElement>) => {

    try {
      dispatch(loading(true));
      const filesData = new FormData();
      filesData.append('uploadingFile', e.target.files?.[0]);
      filesData.append('type', 'gallery');
      // const uploadedFile = await dashboardAPIRequestUploadFile(filesData) as AxiosResponse<{ path: string }>;

      // setState(prevState => ({
      //   ...prevState,
      //   images: [...(post?.images || []), uploadedFile.data.path.replace('./', '/')],
      // }));

      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false));
    }




  };

  return (
    <>
      <p>Add Image From Url Or Upload a Image :</p>
      <div className="product-information-section product-information-add-image">
        <input
          value={state.imageFromUrl}
          onChange={(e) => setState({ ...state, imageFromUrl: e.target.value })}
        />
        <button onClick={() => onAddImageFromUrlHandler()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <input
          ref={uploadInputElement}
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => onUploadHandler(e)}
        />
        <button onClick={() => uploadInputElement.current?.click()}>
          <FontAwesomeIcon icon={faUpload} className={'show-password'} />
        </button>
      </div>
      <div className="post-information-section">
        <div className="product-information-images-preview">
          {renderImagesPreview}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
