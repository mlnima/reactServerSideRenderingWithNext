import Comment from "./Comment/Comment";
import styled from "styled-components";
import {useSelector} from "react-redux";

const CommentsRendererStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  max-width: 90%;
  padding: 5px;
`
const CommentsRenderer = () => {
    const comments = useSelector(state => state.posts.comments)

    return (
        <CommentsRendererStyledDiv className='comments'>
            {comments.map((comment, index) => {
                return (<Comment key={index} comment={comment}/>)
            })}
        </CommentsRendererStyledDiv>
    );
};
export default CommentsRenderer;
