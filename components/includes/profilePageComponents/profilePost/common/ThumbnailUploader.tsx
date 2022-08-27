import React, {FC, useRef, useState} from "react";
import styled from "styled-components";
import {useAppDispatch} from "@store_toolkit/hooks";
import ImagePreview from "@components/includes/profilePageComponents/profilePost/common/ImagePreview";

const ThumbnailUploaderStyledDiv = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;


  .uploader-area {
    width: 160px;
    height: 91px;
    border: var(--main-text-color, #ccc) dashed 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  img {
    padding: 5px;
    object-fit: contain;
    width: 160px;
    height: 91px;
  }
`

interface ThumbnailUploaderPropTypes {
    mainThumbnail: string,
    finalPostDataToSave: any,

    // setEditingPostImagesToUpload: React.Dispatch<SetStateAction<FormData>>,
    images: [string],
    postId: string,
    onSelectImagesHandler: Function

}

// type GreetFunction = (a: string) => void;

const ThumbnailUploader: FC<ThumbnailUploaderPropTypes> = ({
                                                               mainThumbnail,
                                                               postId,
                                                               onSelectImagesHandler,
                                                               images,
                                                               finalPostDataToSave,

                                                           }) => {
    const dispatch = useAppDispatch()
    const uploadInputElement = useRef<HTMLInputElement>(null)
    const [unUploadedImagesForPreview,setUnUploadedImagesForPreview] = useState({})




    const onSelectImages = (files)=>{
        // we need to assign new adding file to added one in case use wanna try to add more images
        onSelectImagesHandler(files)
        setUnUploadedImagesForPreview({
            ...unUploadedImagesForPreview,
            ...files
        })
    }

    return (
        <ThumbnailUploaderStyledDiv onClick={() => uploadInputElement.current.click()}
                                    onDrop={e => onSelectImages(e.dataTransfer.files)}
                                    onDragOver={e => e.preventDefault()}
        >
            <div className={'uploader-area'}>
                <input className={'form-control-input'} ref={uploadInputElement} type="file" multiple
                       style={{display: 'none'}}
                       onChange={e => onSelectImages(e.target.files)}/>
                <p>Click To Upload The Images</p>
            </div>

            {!!mainThumbnail && <img src={mainThumbnail} alt="mainThumbnail"/>}
            {!!images?.length && images.map((image, index) => {
                return (
                    <ImagePreview imageSource={image} isUploaded={true}/>
                )
            })}


            {Object.entries(unUploadedImagesForPreview).map(([key,value])=>{
                return(
                    <ImagePreview imageSource={value} isUploaded={false} key={key}/>
                )
            }) }
        </ThumbnailUploaderStyledDiv>
    )
};
export default ThumbnailUploader


// <div className={'image-preview'}>
//     <SvgRenderer svgUrl={'/public/asset/images/icons/trash-can-solid.svg'}
// size={20}
// customClassName={'delete-image'}
// color={'var(--main-active-color,#000)'}
// />
// <img src={image} alt={`image${index}`} key={index}/>
// </div>