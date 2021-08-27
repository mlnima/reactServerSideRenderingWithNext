import {useContext} from 'react';
import Link from "next/link";
import moment from "moment";
import {AppContext} from "../../../../../../context/AppContext";
import {deleteComments} from "../../../../../../_variables/ajaxPostsVariables";
import styled from "styled-components";
const CommentStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  .comment-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
    .comment-author-image {
      width: 40px;
      height: 40px;
      border-radius: 50%;

    }
    .comment-author{
      color:var(--comment-author-color);
      margin: 4px 10px;
      font-weight: bold;
    }
    .comment-date{
      color:var(--comment-date-color);
      font-size: 14px;
      margin: 4px 5px;
    }
  }
  .comment-body{
    color:var(--comment-body-color);
  }
`
const Comment = props => {
    const contextData = useContext(AppContext);

    const onDeleteHandler = (id) => {
        deleteComments([id], process.env.REACT_APP_PRODUCTION_URL).then(() => {
            props.reGetComments()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <CommentStyledDiv className='comment'>

            <div className='comment-header'>
                <img className='comment-author-image' src={props.comment?.author?.profileImage || '/public/asset/images/icons/profile-image.jpg'}/>
                <Link href={`/user/${props.comment?.author?.username}`}>
                    <a className='comment-author'>
                        {props.comment.author.username}
                    </a>
                </Link>
                <span className='comment-date'>{moment(new Date(props.comment?.createdAt), "YYYYMMDD").fromNow(false)}</span>
                        {
                             contextData.userData.role === 'administrator' ?
                                <div className='comments-admin-action-btns'>
                                    <button onClick={() => onDeleteHandler(props.comment?._id)}>Delete</button>
                              </div> : null
                       }
            </div>
            <div className='comment-body'>
                {props.comment.body}
            </div>
        </CommentStyledDiv>
    );
};

export default Comment;
