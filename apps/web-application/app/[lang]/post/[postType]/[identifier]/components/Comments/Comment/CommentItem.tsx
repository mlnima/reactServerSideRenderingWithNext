import Link from "next/link";
import {formatDistance} from 'date-fns'
// import faIR from "date-fns/locale/fa-IR";
import {FC} from "react";
import {Comment} from "typescript-types";
import './CommentItem.styles.scss'

interface CommentPropTypes {
    comment: Comment,
    adminMode: boolean,
    onDeleteCommentHandler: (id:string) => void
}

const CommentItem: FC<CommentPropTypes> = ({comment, adminMode,onDeleteCommentHandler}) => {

    // const localeData = locale === 'fa' ? {locale: faIR} : {}

    if (comment?.author?._id && comment?.createdAt) {
        return (
            <div className='comment'>

                <div className='comment-header'>

                    <img className='comment-author-image'
                         alt={'comment-author-image'}
                         src={comment?.author?.profileImage?.filePath || '/asset/images/icons/profile-image.jpg'}/>

                    <Link href={`/user/${comment?.author?.username}`} className='comment-author'>
                        {comment?.author?.username || ''}
                    </Link>

                    <span className='comment-date'>
                    {/*{formatDistance(new Date(commentData?.createdAt), new Date(), {addSuffix: true, ...localeData})}*/}
                    {formatDistance(new Date(comment?.createdAt), new Date() )}
                </span>
                    {adminMode ?
                        <div className='comments-admin-action-btns'>
                            <button onClick={() => onDeleteCommentHandler(comment?._id)}
                                    className={'btn btn-danger'}>Delete
                            </button>
                        </div>
                        : null
                    }
                </div>
                <div className='comment-body'>
                    {comment.body}
                </div>
            </div>
        );
    } else return null

};

export default CommentItem;
