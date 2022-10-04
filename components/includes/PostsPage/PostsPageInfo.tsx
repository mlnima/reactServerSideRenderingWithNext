import styled from "styled-components";
import React, {FC} from "react";
import {Meta} from "@_typeScriptTypes/Meta";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import dynamic from "next/dynamic";

const Soft404 = dynamic(() => import('@components/includes/Soft404/Soft404'));

let PostsPageInfoStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: var(--main-text-color);
    text-align: center;
  }
`

interface PostsPageInfoPropTypes {
    titleEntry?: string,
}

const PostsPageInfo: FC<PostsPageInfoPropTypes> = ({titleEntry}) => {

    const title = capitalizeFirstLetter(titleEntry)

    // if (title) {
    //     return (
    //         <PostsPageInfoStyledDiv className='posts-page-info'>
    //             <h1> {title.trim()}</h1>
    //         </PostsPageInfoStyledDiv>
    //     );
    // } else return <Soft404/>

    return !!title ?
        <PostsPageInfoStyledDiv className='posts-page-info'>
            <h1> {title.trim()}</h1>
        </PostsPageInfoStyledDiv> :
        <Soft404/>

};
export default PostsPageInfo;
