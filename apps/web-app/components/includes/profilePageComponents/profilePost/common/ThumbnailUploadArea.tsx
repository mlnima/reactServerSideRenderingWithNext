// @ts-nocheck
import React, {FC, useEffect, useRef} from "react";
import styled from "styled-components";
import SvgRenderer from "../../../../global/commonComponents/SvgRenderer/SvgRenderer";
import {useAppDispatch} from "../../../../../store_toolkit/hooks";
import {_ugcDeletePostImage} from "@store_toolkit/clientReducers/postsReducer/_ugcUploadPostImages";

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

      &:hover > .change-image-btn {
        display: flex;
      }
    }
  }
`

interface PropTypes {
    onUploadHandler: Function,
    image?: any,
    postId: string,
}

const ThumbnailUploadArea: FC<PropTypes> = ({onUploadHandler, image, postId}) => {

    const inputRef = useRef(null)
    const dispatch = useAppDispatch()

    const onSelectHandler = (files, e) => {
        if (files.length) {
            e.preventDefault()
            onUploadHandler(files, image.imageIndex)
        }
    }

    useEffect(() => {
        inputRef.current.files = null
    }, [image]);

    const onDeleteHandler = (e) => {
        e.preventDefault()
        inputRef?.current?.value ? inputRef.current.value = null : null
        const deletingData = {
            token: localStorage.wt,
            postId: postId,
            image: image.imagePath
        }
        dispatch(_ugcDeletePostImage(deletingData))
    }


    const clickOnRefElement = (e) => {
        inputRef?.current?.value ? inputRef.current.value = null : null
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
                   //@ts-ignore
                   onClick={e=>e.target?.value ? e.target.value = null : null}
                   onChange={e => onSelectHandler(e.target.files, e)}/>
            {(!!image?.imagePath && !!image?.imageIndex) &&
            <>
                <img className={'image-preview'}
                     src={`${image?.imagePath}?lastUpdate=${Date.now()}`}
                     onClick={(e) => clickOnRefElement(e)}
                     onDrop={e => onSelectHandler(e.dataTransfer.files[0], e)}
                     onDragOver={e => e.preventDefault()}/>
                <div className="action-buttons">
                    <button className={'btn  remove-btn'} onClick={e => onDeleteHandler(e)}>
                        <SvgRenderer svgUrl={'/asset/images/icons/times-solid.svg'} size={15}/>
                    </button>
                    <button className={'btn  change-image-btn'} onClick={(e) => clickOnRefElement(e)}>
                        <SvgRenderer svgUrl={'/asset/images/icons/rotate-right-solid.svg'} size={15}/>
                    </button>
                </div>
            </>}
            {/*{!image &&*/}
            {/*<div className={'add-new-image'}*/}
            {/*     onClick={() => inputRef.current.click()}*/}
            {/*     onDrop={e => onUploadHandler(e.dataTransfer.files, imageIndex + 1)}>*/}
            {/*    <SvgRenderer svgUrl={'/public/asset/images/icons/camera-solid.svg'}*/}
            {/*                 size={70}*/}
            {/*                 customClassName={'camera'}*/}
            {/*                 color={'var(--main-text-color, #fff)'}/>*/}
            {/*    <SvgRenderer svgUrl={'/public/asset/images/icons/circle-plus-solid.svg'}*/}
            {/*                 size={20}*/}
            {/*                 customClassName={'plus'}*/}
            {/*                 color={'var(--main-active-color, #f90)'}/>*/}
            {/*</div>}*/}
        </Style>
    )
};

export default ThumbnailUploadArea;
