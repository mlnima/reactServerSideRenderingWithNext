import Link from "next/link";
import {formatDistance} from 'date-fns'
import faIR from "date-fns/locale/fa-IR";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {deleteComments} from "@store/clientActions/postsAction";
import {useRouter} from "next/router";
import {FC} from "react";
import {Comment} from '@_variables/TypeScriptTypes/PostTypes'
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

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

    .comment-author {
      color: var(--comment-author-color, #f90);
      margin: 4px 10px;
      font-weight: bold;
    }

    .comment-date {
      color: var(--comment-date-color, #fff);
      font-size: 14px;
      margin: 4px 5px;
    }
  }

  .comment-body {
    color: var(--comment-body-color, #fff);
  }
`

interface CommentPropTypes {
    comment: Comment
}

const Comment: FC<CommentPropTypes> = ({comment}) => {
    const {locale} = useRouter()
    const userData = useSelector(({user}: StoreTypes) => user?.userData)
    const dispatch = useDispatch()
    const localeData = locale === 'fa' ? {locale: faIR} : {}

    const onDeleteHandler = (id) => {
        dispatch(deleteComments([id]))
    }

    return (
        <CommentStyledDiv className='comment'>

            <div className='comment-header'>

                <img className='comment-author-image'
                     src={comment?.author?.profileImage || '/public/asset/images/icons/profile-image.jpg'}
                />

                <Link href={`/user/${comment?.author?.username}`}>
                    <a className='comment-author'>
                        {comment.author.username}
                    </a>
                </Link>

                <span className='comment-date'>
                    {formatDistance(new Date(comment?.createdAt), new Date(), {addSuffix: true, ...localeData})}
                </span>
                {userData.role === 'administrator' ?
                        <div className='comments-admin-action-btns'>
                            <button onClick={() => onDeleteHandler(comment?._id)} className={'btn btn-danger'}>Delete
                            </button>
                        </div>
                    : null
                }
            </div>
            <div className='comment-body'>
                {comment.body}
            </div>
        </CommentStyledDiv>
    );
};

export default Comment;