import styled from "styled-components";

const UploadedFilePreviewImageStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .uploaded-pop-view-image-element {
    width: 90%;
    max-width: 450px;
    padding: 5px;
  }
`
const UploadedFilePreviewImage = ({filePath}) => {
    return (
        <UploadedFilePreviewImageStyledDiv className='uploaded-pop-view-image'>
            <img className='uploaded-pop-view-image-element' src={process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + filePath.replace('./', '')}/>
        </UploadedFilePreviewImageStyledDiv>
    );
};
export default UploadedFilePreviewImage;
