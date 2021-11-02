import Link from "next/link";
import moment from "moment";

import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {deleteComments} from "../../../../../../store/actions/postAction";

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
      color:var(--comment-author-color,#f90);
      margin: 4px 10px;
      font-weight: bold;
    }
    .comment-date{
      color:var(--comment-date-color, #fff);
      font-size: 14px;
      margin: 4px 5px;
    }
  }
  .comment-body{
    color:var(--comment-body-color,#fff);
  }
`

const Comment = props => {

    const userData = useSelector(store => store?.user?.userData)
    const dispatch = useDispatch()

    const onDeleteHandler = (id) => {
        dispatch(deleteComments([id]))
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
                            userData.role === 'administrator' ?
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
