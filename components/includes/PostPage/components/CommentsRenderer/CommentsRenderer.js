import Comment from "./Comment/Comment";
import _ from "lodash";

const CommentsRenderer = props => {

    return (
        <div className='comments'>
            <style jsx>{`
              .comments {
                display: flex;
                flex-direction: column;
                width: 100%;
                align-items: flex-start;
                justify-content: center;
                max-width: 90%;
                padding: 5px;
              }
            `}</style>

            {props.comments.map(comment => {
                return (<Comment key={_.uniqueId(`comment_`)} reGetComments={props.reGetComments} comment={comment}/>)
            })}
        </div>
    );
};
export default CommentsRenderer;