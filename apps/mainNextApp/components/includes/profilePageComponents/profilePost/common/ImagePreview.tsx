import React, {FC} from "react";
import SvgRenderer from "../../../../global/commonComponents/SvgRenderer/SvgRenderer";
import styled from "styled-components";
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
            <SvgRenderer svgUrl={'/public/asset/images/icons/trash-can-solid.svg'}
                         size={20}
                         customClassName={'delete-image'}
                         color={'var(--main-active-color,#000)'}
            />
            <img src={isUploaded ? imageSource : URL.createObjectURL(imageSource)}/>
        </Style>
    )

};
export default ImagePreview
