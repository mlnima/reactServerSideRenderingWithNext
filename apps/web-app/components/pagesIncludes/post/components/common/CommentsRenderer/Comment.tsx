import Link from "next/link";
import {formatDistance} from 'date-fns'
import faIR from "date-fns/locale/fa-IR";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {FC} from "react";
import deleteCommentByAdminInPostPage
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksDeleteCommentByAdminInPostPage";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store, Comment} from "typescript-types";

const CommentStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  border-bottom: var(--default-border);

  width: 100%;
  padding: 10px 0;

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
      color: var(--main-active-color, #f90);
      margin: 4px 10px;
      font-weight: bold;
    }

    .comment-date {
      color: var(--main-text-color, #fff);
      font-size: 14px;
      margin: 4px 5px;
    }
  }

  .comment-body {
    color: var(--main-text-color, #fff);
    overflow-wrap: break-word;
  }
`

interface CommentPropTypes {
    commentData: Comment
}

const Comment: FC<CommentPropTypes> = ({commentData}) => {
    const {locale} = useRouter()
    const userData = useSelector(({user}: Store) => user?.userData)
    const dispatch = useAppDispatch()
    const localeData = locale === 'fa' ? {locale: faIR} : {}

    const onDeleteHandler = (id) => {
        dispatch(deleteCommentByAdminInPostPage([id]))
    }

    if (commentData?.author?._id && commentData?.createdAt) {
        return (
            <CommentStyledDiv className='comment'>

                <div className='comment-header'>

                    <img className='comment-author-image'
                         src={commentData?.author?.profileImage || '/asset/images/icons/profile-image.jpg'}
                    />

                    <Link href={`/user/${commentData?.author?.username}`} className='comment-author'>
                        {commentData?.author?.username || ''}
                    </Link>

                    <span className='comment-date'>
                    {formatDistance(new Date(commentData?.createdAt), new Date(), {addSuffix: true, ...localeData})}
                </span>
                    {userData.role === 'administrator' ?
                        <div className='comments-admin-action-btns'>
                            <button onClick={() => onDeleteHandler(commentData?._id)}
                                    className={'btn btn-danger'}>Delete
                            </button>
                        </div>
                        : null
                    }
                </div>
                <div className='comment-body'>
                    {commentData.body}
                </div>
            </CommentStyledDiv>
        );
    } else return null

};

export default Comment;
