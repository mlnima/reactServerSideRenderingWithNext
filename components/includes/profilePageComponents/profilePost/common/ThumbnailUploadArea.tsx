import React, {FC, useRef} from "react";
import styled from "styled-components";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
import {useAppDispatch} from "@store_toolkit/hooks";
import {_ugcDeletePostImage} from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_ugcUploadPostImages";

const Style = styled.div`
  width: 160px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  margin: 8px;

  .image-preview {
    width: 100%;
    height: 100%;
  }

  .action-buttons {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;


    button {
      padding: 8px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      background: transparent;
      border: none;
    }

    .remove-btn {
      position: absolute;
      right: 0;
      top: 0;
    }

    .change-image-btn {

    }
  }

  @media only screen and (min-width: 768px) {
    .action-buttons {
   
      .change-image-btn {
        display: none;
      }

      &:hover >.change-image-btn{
        display: flex;
      }
    }
  }
`

interface PropTypes {
    onUploadHandler: Function,
    image?: any,
    postId: string
}

const ThumbnailUploadArea: FC<PropTypes> = ({onUploadHandler, image, postId}) => {

    const inputRef = useRef(null)
    const dispatch = useAppDispatch()

    const onSelectHandler = (files, e) => {
        if (files.length){
            const imageUrlSplit = image.split('/')[image.split('/').length -1]
            e.preventDefault()
            onUploadHandler(files, parseInt(imageUrlSplit))
        }
    }

    const onDeleteHandler = (e) => {
        e.preventDefault()
        const deletingData = {
            token: localStorage.wt,
            postId: postId,
            image: image
        }
        dispatch(_ugcDeletePostImage(deletingData))
    }


    const clickOnRefElement = (e)=>{
        e.preventDefault()
        inputRef.current.click()
    }

    return (
        <Style className={'uploader-area'}>
            <input className={'form-control-input'}
                   type="file"
                   ref={inputRef}
                   accept="image/x-png,image/gif,image/jpeg,image/webp"
                   style={{display: 'none'}}
                   onChange={e => onSelectHandler(e.target.files, e)}/>
            {!!image &&
            <img className={'image-preview'}
                 src={`${image}?lastUpdate=${Date.now()}`}
                 onClick={(e) =>clickOnRefElement(e)}

                 onDrop={e => onSelectHandler(e.dataTransfer.files[0], e)}
                 onDragOver={e => e.preventDefault()}/>}
            <div className="action-buttons">
                <button className={'btn  remove-btn'} onClick={e => onDeleteHandler(e)}>
                    <SvgRenderer svgUrl={'/public/asset/images/icons/times-solid.svg'} size={15}/>
                </button>
                <button className={'btn  change-image-btn'}  onClick={(e) =>clickOnRefElement(e)}>
                    <SvgRenderer svgUrl={'/public/asset/images/icons/rotate-right-solid.svg'} size={15}/>
                </button>
            </div>

        </Style>
    )
};

export default ThumbnailUploadArea;
