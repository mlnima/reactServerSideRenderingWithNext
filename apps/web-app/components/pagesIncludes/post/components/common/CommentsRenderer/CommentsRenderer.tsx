import Comment from "./Comment";
import styled from "styled-components";
import {useSelector} from "react-redux";
import React, {FC} from "react";
import {Store} from "typescript-types";

const CommentsRendererStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  align-items: flex-start;
  justify-content: center;

  box-sizing: border-box;
`

interface CommentsRendererPropTypes{
    showComments:boolean
}
const CommentsRenderer :FC<CommentsRendererPropTypes> = ({showComments}) => {

    const comments = useSelector(({posts}:Store) => posts?.post?.comments || [])
    const adminMode = useSelector(({globalState}: Store) => globalState?.adminMode);

    if (comments?.length){
        return (
            <CommentsRendererStyledDiv className='comments sub-content'>
                {showComments && <>
                    {comments.map((commentData, index) => {
                        //@ts-ignore
                        return (<Comment key={index} adminMode={adminMode} commentData={commentData}/>)
                    })}
                </>
                }

            </CommentsRendererStyledDiv>
        );
    }else return null

};
export default CommentsRenderer;
