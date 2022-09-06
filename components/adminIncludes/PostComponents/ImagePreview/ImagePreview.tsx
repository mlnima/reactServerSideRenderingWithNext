import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

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
    const mainThumbnail = useSelector((store: Store) => store?.adminPanelPosts.post?.mainThumbnail);
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