import styled from "styled-components";
import {useSelector} from "react-redux";
import {DashboardStore, Store} from "typescript-types";

let ImagePreviewStyledDiv = styled.div`
  .editor {
    display: flex;
    justify-content: center;

    img {
      margin: auto;
      width: 320px;
      height: 180px;
    }
  }
`

const ImagePreview = () => {

    const mainThumbnail = useSelector(({posts}:DashboardStore) => posts.post?.mainThumbnail);

    if (mainThumbnail) {
        return (
            <ImagePreviewStyledDiv className=''>
                <div className="title">
                    <p>Image Preview</p>
                </div>
                <div className="editor">
                    <img src={mainThumbnail}/>
                </div>
            </ImagePreviewStyledDiv>
        );
    } else return null
};
export default ImagePreview;