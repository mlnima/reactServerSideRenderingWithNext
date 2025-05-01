'use client';

import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@store/hooks'; // Updated import path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { loading } from '@store/reducers/globalStateReducer';
import { dashboardAPIRequestUploadFile } from '@repo/api-requests';
import { AxiosResponse } from 'axios';

const UploadFileBtnStyledDiv = styled.div`
    button {
        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

interface PropType {
  name: string;
  type: string;
}




// is not in use, need fixes by modifying the post state
const UploadFileBtn: FC<PropType> = (props) => {
  const uploadInputElement = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const onUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {

    try {
      dispatch(loading(true));
      if (!e.target.files || e.target.files.length === 0) return;

      const filesData = new FormData();
      filesData.append('token', localStorage.wt);
      filesData.append('uploadingFile', e.target.files[0]);
      filesData.append('type', props.type);

      const fileUseType =
        props.name === 'mainThumbnail' ? 'postMainThumbnail' :
          props.name === 'videoUrl' ? 'postVideoUrl' :
            props.name === 'VideoTrailerUrl' ? 'postVideoTrailerUrl' :
              'fileManagerFileUpload';

      const uploadedFile = await dashboardAPIRequestUploadFile(filesData) as AxiosResponse<{ path: string }>;

      //
      // dispatch(uploadFileAction({ file: filesData, useType: fileUseType }));
      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false));
    }

  };

  const onDropFileHandler = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

    const fileData = e.dataTransfer.files[0];
    const droppedHTML = e.dataTransfer.getData('text/html');

    if (droppedHTML) {
      const elem = document.createElement('div');
      elem.innerHTML = droppedHTML;
      const image = elem.getElementsByTagName('img');
      const url = (image[0] || image[1]).currentSrc;
      // You can handle the URL here if needed
    } else if (fileData) {
      const filesData = new FormData();
      filesData.append('token', localStorage.wt);
      filesData.append('uploadingFile', fileData);

      const fileUseType =
        props.name === 'mainThumbnail' ? 'postMainThumbnail' :
          props.name === 'videoUrl' ? 'postVideoUrl' :
            props.name === 'VideoTrailerUrl' ? 'postVideoTrailerUrl' :
              'fileManagerFileUpload';

      // @ts-ignore
      // dispatch(uploadFileAction({ file: filesData, useType: fileUseType }));
    }
  };

  return (
    <UploadFileBtnStyledDiv>
      <input
        className={'primaryInput'}
        ref={uploadInputElement}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => onUploadHandler(e)}
      />
      {/*//@ts-ignore*/}
      <button
        className={'btn btn-success'}
        onClick={() => uploadInputElement.current?.click()}
        onDrop={onDropFileHandler}
        onDragOver={e => e.preventDefault()}
      >
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </UploadFileBtnStyledDiv>
  );
};

export default UploadFileBtn;


// import React, {FC, useRef} from 'react';
// import styled from "styled-components";
// import {uploadFileAction} from "@store/reducers/fileManagerReducer";
// import {useAppDispatch} from "@store/hooks";
// import {
//     FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// import {faUpload} from "@fortawesome/free-solid-svg-icons/faUpload";
//
// const UploadFileBtnStyledDiv = styled.div`
//   button{
//     svg{
//       width: 20px;
//       height: 20px;
//     }
//   }
// `
//
// interface PropType{
//     name:string
//     type:string
// }
//
// const UploadFileBtn:FC<PropType> = props => {
//     const uploadInputElement = useRef(null)
//     const dispatch = useAppDispatch()
//
//     const onUploadHandler = (e:any) => {
//         const filesData = new FormData()
//         filesData.append('token',localStorage.wt)
//         filesData.append('uploadingFile', e.target.files[0])
//         filesData.append('type',props.type)
//
//         const fileUseType = props.name === 'mainThumbnail' ? 'postMainThumbnail' :
//             props.name === 'videoUrl' ? 'postVideoUrl' :
//                 props.name === 'VideoTrailerUrl' ? 'postVideoTrailerUrl' :
//                     'fileManagerFileUpload'
//
//         //@ts-ignore
//         dispatch(uploadFileAction({file: filesData, useType:fileUseType}))
//
//         // uploadFiles(filesData).then(res=>{
//         //     props.setFunction(props.name,res.data.path.replace('./','/'))
//         // }).catch(err=>{
//         //     props.returnElement.current.value  = 'Something went Wrong'
//         // })
//     }
//
//     const onDropFileHandler = (e:any)=>{
//
//         e.preventDefault()
//         const fileData = e.dataTransfer.files[0]
//         const droppedHTML = e?.dataTransfer?.getData("text/html");
//
//         if (droppedHTML){
//             const elem= document.createElement("div");
//             elem.innerHTML = droppedHTML;
//             const image = elem.getElementsByTagName("img");
//             const url= (image[0] || image[1]).currentSrc
//
//         }else if (fileData){
//             const filesData = new FormData()
//             filesData.append('token', localStorage.wt)
//             filesData.append('uploadingFile', fileData)
//             const fileUseType = props.name === 'mainThumbnail' ? 'postMainThumbnail' :
//                                 props.name === 'videoUrl' ? 'postVideoUrl' :
//                                 props.name === 'VideoTrailerUrl' ? 'postVideoTrailerUrl' :
//                                     'fileManagerFileUpload'
// //@ts-ignore
//             dispatch(uploadFileAction({file: filesData, useType:fileUseType}))
//             // fileUpload(filesData).then(res => {
//             //     props.setFunction(props.name,res.data.path.replace('./','/'))
//             // }).catch(err => {
//             // })
//         }
//     }
//
//     return (
//         <UploadFileBtnStyledDiv>
//             <input className={'primaryInput'} ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
//             {/*//@ts-ignore*/}
//             <button  className={'btn btn-success'} onClick={ () => uploadInputElement.current?.click() } onDrop={e=>onDropFileHandler(e)} onDragOver={e=>e.preventDefault()}>
//                 <FontAwesomeIcon icon={faUpload}/>
//             </button>
//         </UploadFileBtnStyledDiv>
//     );
// };
// export default UploadFileBtn;
