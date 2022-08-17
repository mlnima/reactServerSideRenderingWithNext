import React, {FC, useRef, useState} from "react";
import styled from "styled-components";
import {useAppDispatch} from "@store_toolkit/hooks";
import {fetchUserPostImageUpload} from "@store_toolkit/clientReducers/userReducer";
import {setEditingPostImagesToUpload} from "@store_toolkit/clientReducers/postsReducer";
//import {fetchFileManagerUploadFile} from "@store_toolkit/adminReducers/adminPanelFileManagerReducer";

const ThumbnailUploaderStyledDiv = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  
  .uploader-area{
    width: 160px;
    height: 91px;
    border: var(--main-text-color, #ccc) dashed 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  img{
    padding: 5px;
    object-fit: contain;
    width: 160px;
    height: 91px;
  }
`

interface ThumbnailUploaderPropTypes {
    mainThumbnail: string,
    editingPostImagesToUpload: {},
    images: [string],
    postId: string,

}

const ThumbnailUploader: FC<ThumbnailUploaderPropTypes> = ({mainThumbnail,postId,images,editingPostImagesToUpload}) => {
    const dispatch = useAppDispatch()
    const uploadInputElement = useRef<HTMLInputElement>(null)



    const uploadeImages = (images) =>{
        if (images.length){
            dispatch(fetchUserPostImageUpload({images,postId}))
        }
    }

    const onSelectImagesHandler = (images)=>{
        dispatch(setEditingPostImagesToUpload(images))
    }


   const PreviewUnUploadedImages = ()=>{
        if (Object.keys(editingPostImagesToUpload)?.length){
           return Object.keys(editingPostImagesToUpload).map((imageToUpload,index)=>{
                console.log(editingPostImagesToUpload[imageToUpload])
                return (
                    <img src={URL.createObjectURL(editingPostImagesToUpload[imageToUpload])} alt={`image${index}`} key={index}/>
                )
            })
        }else return null
   }



    return (
        <ThumbnailUploaderStyledDiv onClick={() => uploadInputElement.current.click()}
                                    onDrop={e => onSelectImagesHandler(e.dataTransfer.files)}
                                    onDragOver={e => e.preventDefault()}
        >
            <div className={'uploader-area'}>
                <input className={'form-control-input'} ref={uploadInputElement} type="file" multiple style={{display: 'none'}}
                       onChange={e => onSelectImagesHandler(e.target.files)}/>
                <p>Click To Upload The Images</p>
            </div>

            {!!mainThumbnail && <img src={mainThumbnail} alt="mainThumbnail"/>}
            {!!images?.length && images.map((image,index)=>{
                return (
                    <div className={'image-preview'}>
                        <img src={image} alt={`image${index}`} key={index}/>
                    </div>
                )
            })}
            {/*//@ts-ignore*/}
            <PreviewUnUploadedImages/>
        </ThumbnailUploaderStyledDiv>
    )
};
export default ThumbnailUploader
