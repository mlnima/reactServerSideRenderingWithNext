// @ts-nocheck
import React, {FC, useRef,} from "react";
import styled from "styled-components";
import {useAppDispatch} from "@store_toolkit/hooks";
import ThumbnailUploadArea from "./ThumbnailUploadArea";
import {_ugcUploadPostImages}
    from "@store_toolkit/clientReducers/postsReducer/_ugcUploadPostImages";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";

//experimental doc for dev

const ThumbnailsUploaderStyledDiv = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  //height: 300px;

  .add-new-image {
    width: 160px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    position: relative;
    .plus{
      position: absolute;
      top:60%;
      left:60%;
    }
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
    postId: string,
    images: {
        imageIndex:number,
        imagePath:string
    }[],
}

const ThumbnailsUploader: FC<ThumbnailUploaderPropTypes> =
    ({
         mainThumbnail,
         postId,
         images,
     }) => {
        const inputRef = useRef(null)
        const dispatch = useAppDispatch()


        const onUploadHandler = async (images, imageIndex) => {
            const imagesFormData = new FormData()
            imagesFormData.append('imageIndex', imageIndex)
            for (let i = 0; i < images.length; i++) {
                imagesFormData.append(images[i].name, images[i])
            }
            imagesFormData.append('_id', postId)
            imagesFormData.append('token', localStorage.wt)
            dispatch(_ugcUploadPostImages(imagesFormData))
        }


        return (
            <ThumbnailsUploaderStyledDiv>
                {!!images?.length && images.map((image, index) => {
                    if (image){
                        return (
                            <ThumbnailUploadArea key={image.imageIndex}
                                                 postId={postId}
                                                 image={image}
                                                 onUploadHandler={onUploadHandler}/>
                        )
                    }

                })}

                {images?.length < 6 &&
                <div className={'add-new-image'}
                                             onClick={() => inputRef.current.click()}
                                             onDrop={e => onUploadHandler(e.dataTransfer.files, images.length + 1)}>
                    <input className={'form-control-input'}
                           type="file"
                           ref={inputRef}
                           accept="image/x-png,image/gif,image/jpeg,image/webp"
                           style={{display: 'none'}}
                           onChange={e => onUploadHandler(e.target.files, images.length + 1)}/>
                    <FontAwesomeIcon className={'camera'} icon={faCamera} style={{width:70,height:70}}/>
                    <FontAwesomeIcon className={'plus'} icon={faCirclePlus} style={{width:20,height:20}}/>
                </div>}

            </ThumbnailsUploaderStyledDiv>
        )
    };
export default ThumbnailsUploader

