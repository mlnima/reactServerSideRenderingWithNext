import styled from "styled-components";
import {FC} from "react";

let PostsPageInfoStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h1{
    color:var(--main-text-color);
    text-align: center;
  }
`

interface PostsPageInfoPropTypes {
    titleToRender:string
}

const PostsPageInfo :FC<PostsPageInfoPropTypes> = ({titleToRender}) => {

    const title = decodeURIComponent(titleToRender || '')

    return (
        <PostsPageInfoStyledDiv className='posts-page-info'>
            <h1> {title.trim()}</h1>
        </PostsPageInfoStyledDiv>
    );
};
export default PostsPageInfo;
