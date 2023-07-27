import Comment from "./Comment";
import styled from "styled-components";
import React, {FC} from "react";
import {useAppSelector} from "@store_toolkit/hooks";

const CommentsRendererStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  align-items: flex-start;
  justify-content: center;

  box-sizing: border-box;
`

interface CommentsRendererPropTypes {
    showComments: boolean
}

const CommentsRenderer: FC<CommentsRendererPropTypes> = ({showComments}) => {

    const comments = useAppSelector(({posts}) => posts?.post?.comments || [])
    const adminMode = useAppSelector(({globalState}) => globalState?.adminMode);

    if (comments?.length) {
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
    } else return null

};
export default CommentsRenderer;
