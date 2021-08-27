import Comment from "./Comment/Comment";
import _ from "lodash";
import styled from "styled-components";

const CommentsRendererStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  max-width: 90%;
  padding: 5px;
`
const CommentsRenderer = props => {

    return (
        <CommentsRendererStyledDiv className='comments'>
            {props.comments.map(comment => {
                return (<Comment key={_.uniqueId(`comment_`)} reGetComments={props.reGetComments} comment={comment}/>)
            })}
        </CommentsRendererStyledDiv>
    );
};
export default CommentsRenderer;
