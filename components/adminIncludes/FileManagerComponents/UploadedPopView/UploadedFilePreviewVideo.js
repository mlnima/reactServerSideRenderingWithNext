//UploadedFilePreviewVideo
import styled from "styled-components";

const UploadedFilePreviewVideoStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .uploaded-pop-view-video-element {
    width: 90%;
    max-width: 450px;
    padding: 5px;
  }
`
const UploadedFilePreviewVideo = ({filePath}) => {
    return (
        <UploadedFilePreviewVideoStyledDiv className='uploaded-pop-view-video'>
            <video className='uploaded-pop-view-video-element' controls>
                <source src={process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + filePath.replace('./', '')}/>
            </video>
        </UploadedFilePreviewVideoStyledDiv>
    );
};
export default UploadedFilePreviewVideo;
