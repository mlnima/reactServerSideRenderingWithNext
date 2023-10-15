'use client';
import Link from "next/link";
import {FC} from "react";
import {Comment} from 'typescript-types'

interface IProps{
    comments:Comment[]
}

const RecentComments:FC<IProps> = ({comments}) => {

    const renderComments = comments.map(comment => {
        return (
            <div key={comment?._id} className='recent-comments-item'>

                <Link href={`/post/${comment.onDocumentId?.postType}/${comment.onDocumentId?._id}`}>
                        <strong className='recent-comments-item-author'>{comment.onDocumentId?.title}</strong>
                </Link>

                <strong className='recent-comments-item-author'>{comment.author?.username}:</strong>

                <p>{comment.body}</p>
            </div>
        )
    })
    return (
        <div className='recentComments'>
            {renderComments}
        </div>
    );
};

export default RecentComments;
