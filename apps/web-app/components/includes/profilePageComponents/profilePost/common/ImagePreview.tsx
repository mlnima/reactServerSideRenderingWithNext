import React, {FC} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";

const Style = styled.div`
  position: relative;
  display: flex;
  .delete-image{
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    justify-content: center;
    &:hover{
      transition: .5s;
      transform: scale(1.2);
    }
  }
`
interface ImagePreviewPropTypes {
    isUploaded: boolean,
    imageSource: any,

}

const ImagePreview: FC<ImagePreviewPropTypes> = ({isUploaded, imageSource}) => {

    return (
        <Style className={'image-preview'}>
            <FontAwesomeIcon color={'red'} icon={faTrashCan} style={{width:25,height:25}}/>
            <img src={isUploaded ? imageSource : URL.createObjectURL(imageSource)}/>
        </Style>
    )

};
export default ImagePreview
