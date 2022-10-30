import Comment from "./Comment/Comment";
import styled from "styled-components";
import {useSelector} from "react-redux";
import React, {FC} from "react";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const CommentsRendererStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
`

interface CommentsRendererPropTypes{
    showComments:boolean
}
const CommentsRenderer :FC<CommentsRendererPropTypes> = ({showComments}) => {

    const comments = useSelector(({posts}:Store) => posts?.post?.comments || [])


    if (comments?.length){
        return (
            <CommentsRendererStyledDiv className='comments'>
                {showComments && <>
                    {comments.map((comment, index) => {
                        return (<Comment key={index} comment={comment}/>)
                    })}
                </>
                }

            </CommentsRendererStyledDiv>
        );
    }else return null

};
export default CommentsRenderer;
