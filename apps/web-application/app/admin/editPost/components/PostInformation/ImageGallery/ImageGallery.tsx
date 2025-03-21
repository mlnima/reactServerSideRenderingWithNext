// @ts-nocheck
'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { uploadFileAction } from '@storeDashboard/reducers/fileManagerReducer';
import { useAppDispatch } from '@storeDashboard/hooks';
import { faXmark, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ImageGallary.scss';


interface ImageGalleryPropTypes {
  onChangeHandler: any;
  rendering: boolean;
}

const ImageGallery: React.FC<ImageGalleryPropTypes> = ({ onChangeHandler, rendering }) => {
  const dispatch = useAppDispatch();
  const uploadInputElement = useRef(null);
  const post = useSelector((state) => state.posts.post);
  const [state, setState] = useState({ images: [], imageFromUrl: '' });

  useEffect(() => {
    setState({
      ...state,
      images: post.images || [],
      imageFromUrl: ''
    });
  }, []);

  const renderImagesPreview = (post.images || []).map(image => {
    const onRemoveImageHandler = () => {
      const e = { target: { name: 'images', value: post.images.filter(i => i !== image) } };
      onChangeHandler(e);
    };

    return (
      <div className='product-information-image-preview' key={image + Date.now()}>
        <img src={image} />
        <button className='image-remove-btn' onClick={() => onRemoveImageHandler()}>
          <FontAwesomeIcon icon={faXmark} className={'image-remove-btn-icon'} />
        </button>
      </div>
    );
  });

  const onAddImageFromUrlHandler = () => {
    const e = { target: { name: 'images', value: [...post.images, state.imageFromUrl] } };
    onChangeHandler(e);
  };

  const onUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesData = new FormData();
    filesData.append('uploadingFile', e.target.files[0]);
    filesData.append('type', 'gallery');
    dispatch(uploadFileAction({ file: filesData, useType: 'postImageGallery', postData: post }));
  };


  if(!rendering){
    return null
  }

  return (
    <>
      <p>Add Image From Url Or Upload a Image :</p>
      <div className='product-information-section product-information-add-image'>
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
      <div className='post-information-section'>
        <div className='product-information-images-preview'>
          {renderImagesPreview}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
