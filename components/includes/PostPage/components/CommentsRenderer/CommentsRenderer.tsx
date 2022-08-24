import Comment from "./Comment/Comment";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {FC} from "react";

const CommentsRendererStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 95%;
  align-items: flex-start;
  justify-content: center;
  max-width: 90%;
  padding: 5px;
`
const CommentsRenderer :FC = () => {

    const comments = useSelector(({posts}:StoreTypes) => posts?.post?.comments || [])

    if (comments?.length){
        return (
            <CommentsRendererStyledDiv className='comments'>
                {comments.map((comment, index) => {
                    return (<Comment key={index} comment={comment}/>)
                })}
            </CommentsRendererStyledDiv>
        );
    }else return null

};
export default CommentsRenderer;
