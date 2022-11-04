import React, {FC} from "react";
import styled from "styled-components";

const UploadedFilePreviewTextStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 400px;

  .uploaded-pop-view-text-element {

    width: 100%;
    min-width: 95%;
    height: 400px;
  }
`

interface UploadedFilePreviewTextPropType{
    file:string
}
const UploadedFilePreviewText:FC<UploadedFilePreviewTextPropType> = ({file}) => {
    return (
        <UploadedFilePreviewTextStyledDiv className='uploaded-pop-view-text'>
            <textarea className='uploaded-pop-view-text-element' value={file}/>
        </UploadedFilePreviewTextStyledDiv>
    );
};
export default UploadedFilePreviewText;
