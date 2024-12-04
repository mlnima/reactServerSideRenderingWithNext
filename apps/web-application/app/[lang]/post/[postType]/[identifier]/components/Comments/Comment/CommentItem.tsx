import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { FC } from 'react';
import { Comment } from '@repo/typescript-types';
import './CommentItem.styles.scss';

interface IProps {
    comment: Comment;
    adminMode: boolean;
    onDeleteCommentHandler: (id: string) => void;
}

const CommentItem: FC<IProps> = ({ comment, adminMode, onDeleteCommentHandler }) => {

    if (!comment || !comment.author?._id || !comment.createdAt) return null;

    return (
        <div className="comment">
            <div className="comment-header">
                <img
                    className="comment-author-image"
                    alt={'comment-author-image'}
                    src={comment.author.profileImage?.filePath || '/asset/images/icons/profile-image.jpg'}
                />
                <Link href={`/user/${comment.author.username}`} className="comment-author">
                    {comment.author.username || ''}
                </Link>
                <span className="comment-date">{formatDistance(new Date(comment.createdAt), new Date())}</span>
                {adminMode ? (
                    <div className="comments-admin-action-btns">
                        <button onClick={() => onDeleteCommentHandler(comment._id)} className={'btn btn-danger'}>
                            Delete
                        </button>
                    </div>
                ) : null}
            </div>
            <div className="comment-body">{comment.body}</div>
        </div>
    );
};

export default CommentItem;


// if (comment?.author?._id && comment?.createdAt) {
//     return (
//         <div className="comment">
//             <div className="comment-header">
//                 <img
//                     className="comment-author-image"
//                     alt={'comment-author-image'}
//                     src={comment?.author?.profileImage?.filePath || '/asset/images/icons/profile-image.jpg'}
//                 />
//
//                 <Link href={`/user/${comment?.author?.username}`} className="comment-author">
//                     {comment?.author?.username || ''}
//                 </Link>
//
//                 <span className="comment-date">
//                         {/*{formatDistance(new Date(commentData?.createdAt), new Date(), {addSuffix: true, ...localeData})}*/}
//                     {formatDistance(new Date(comment?.createdAt), new Date())}
//                     </span>
//                 {adminMode ? (
//                     <div className="comments-admin-action-btns">
//                         <button onClick={() => onDeleteCommentHandler(comment._id)} className={'btn btn-danger'}>
//                             Delete
//                         </button>
//                     </div>
//                 ) : null}
//             </div>
//             <div className="comment-body">{comment.body}</div>
//         </div>
//     );
// } else return null;