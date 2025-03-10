'use client';

import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';
import { uploadFileAction } from '@storeDashboard/reducers/fileManagerReducer';
import { useAppDispatch } from '@storeDashboard/hooks';
import { faXmark, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let StyledDiv = styled.div`
  display: flex;
  .product-information-image-preview {
    .image-remove-btn {
      border-radius: 50%;
      border: white .2px solid;
      width: 30px;
      height: 30px;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 20px;
        height: 20px;
      }
      &:hover {
        transform: scale(1.1);
        transition: .5s;
      }
    }
    &:hover {
      transform: scale(1.3);
      transition: .5s;
      z-index: 10;
    }
  }
`;

interface ImageGalleryPropTypes {
  onChangeHandler: any;
  rendering: boolean;
}

const ImageGallery: React.FC<ImageGalleryPropTypes> = ({ onChangeHandler, rendering }) => {
  const dispatch = useAppDispatch();
  const uploadInputElement = useRef(null);
  const post = useSelector((state: DashboardStore) => state.posts.post);
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

  if (rendering) {
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
          <StyledDiv className='product-information-images-preview'>
            {renderImagesPreview}
          </StyledDiv>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default ImageGallery;

// import React, {useEffect, useState, useRef, FC} from 'react';
// import styled from "styled-components";
// import {useSelector} from "react-redux";
// import {DashboardStore} from "@repo/typescript-types";
// import {uploadFileAction} from "@storeDashboard//reducers/fileManagerReducer";
// import {useAppDispatch} from "@storeDashboard/hooks";
// import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
// import {faUpload} from "@fortawesome/free-solid-svg-icons/faUpload";
//
// let StyledDiv = styled.div`
//   display: flex;
//
//   .product-information-image-preview {
//     .image-remove-btn {
//       border-radius: 50%;
//       border: white .2px solid;
//       width: 30px;
//       height: 30px;
//       padding: 0;
//       margin: 0;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//
//       svg {
//         width: 20px;
//         height: 20px;
//
//       }
//
//       &:hover {
//         transform: scale(1.1);
//         transition: .5s;
//       }
//     }
//
//     &:hover {
//       transform: scale(1.3);
//       transition: .5s;
//       z-index: 10;
//     }
//   }
// `
//
// interface ImageGalleryPropTypes {
//     onChangeHandler: any,
//     rendering: boolean
// }
//
// const ImageGallery: FC<ImageGalleryPropTypes> = ({onChangeHandler, rendering}) => {
//     const dispatch = useAppDispatch()
//     const uploadInputElement = useRef(null)
//
//     const post = useSelector(({posts}:DashboardStore) => posts.post);
//
//     const [state, setState] = useState({
//         images: [],
//         imageFromUrl: ''
//     });
//     useEffect(() => {
//         setState({
//             ...state,
//             //@ts-ignore
//             images: post.images || [],
//             imageFromUrl: ''
//         })
//     }, []);
//     //@ts-ignore
//     const renderImagesPreview = (post.images || []).map(image => {
//         const onRemoveImageHandler = () => {
//             const e = {
//                 target: {
//                     name: 'images',
//                     //@ts-ignore
//                     value: post.images.filter(i => i !== image)
//                 }
//             }
//             onChangeHandler(e)
//         }
//
//         return (
//             <div className='product-information-image-preview' key={image + Date.now()}>
//                 <img src={image}/>
//                 <button className='image-remove-btn' onClick={() => onRemoveImageHandler()}>
//
//                     <FontAwesomeIcon icon={faXmark} className={'image-remove-btn-icon'}/>
//                 </button>
//             </div>
//         )
//     });
//
//     const onAddImageFromUrlHandler = () => {
//         const e = {
//             target: {
//                 name: 'images',
//                 //@ts-ignore
//                 value: [...post.images, state.imageFromUrl]
//             }
//         }
//         onChangeHandler(e)
//     }
//
//
//     const onUploadHandler = (e: React.ChangeEvent<any>) => {
//         const filesData = new FormData()
//         filesData.append('uploadingFile', e.target.files[0])
//         filesData.append('type', 'gallery')
//
//         //@ts-ignore
//         dispatch(uploadFileAction({file: filesData, useType: 'postImageGallery', postData: post}))
//     }
//
//     if (rendering) {
//         return (
//             <>
//                 <p>Add Image From Url Or Upload a Image :</p>
//                 <div className=' product-information-section product-information-add-image'>
//                     <input value={state.imageFromUrl}
//                            onChange={e => setState({...state, imageFromUrl: e.target.value})}/>
//                     <button onClick={() => onAddImageFromUrlHandler()}>
//                         <FontAwesomeIcon icon={faPlus}/>
//                     </button>
//                     <input ref={uploadInputElement} type="file" style={{display: 'none'}}
//                            onChange={e => onUploadHandler(e)}/>
//                     {/*//@ts-ignore*/}
//                     <button onClick={() => uploadInputElement.current?.click()}>
//                         <FontAwesomeIcon icon={faUpload} className={'show-password'}/>
//                     </button>
//                 </div>
//                 <div className='post-information-section'>
//                     <StyledDiv className='product-information-images-preview'>
//                         {renderImagesPreview}
//                     </StyledDiv>
//                 </div>
//             </>
//         );
//     } else return null
// };
// export default ImageGallery;
