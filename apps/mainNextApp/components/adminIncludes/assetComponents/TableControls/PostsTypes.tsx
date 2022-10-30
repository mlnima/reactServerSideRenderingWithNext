import {useRouter} from "next/router";
import styled from "styled-components";
import React from "react";
import postTypes from "@_dataStructures/postTypes";
import convertVariableNameToName from "@_variables/util/convertVariableNameToName";

const PostsTypesStyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0 10px;
  }
`
const PostsTypes = () => {
    const {push,pathname,query} = useRouter()
    
    const onFormatChangeHandler = e => {
        push({
            pathname: pathname,
            query: {...query, postType: e.target.value}
        }).finally()
    }

    return (
        <PostsTypesStyledDiv className='post-type asset-page-asset-type-selector'>
            <p>Post Type :</p>
            <select className={'custom-select'} onChange={e => onFormatChangeHandler(e)} value={query?.postType}>
                <option value='' >Select</option>
                <option value='all'>All</option>
                {postTypes.map(postType=><option key={postType} value={postType}>{convertVariableNameToName(postType)}</option>)}
            </select>
        </PostsTypesStyledDiv>
    );
};
export default PostsTypes;
