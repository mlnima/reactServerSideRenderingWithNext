import React,{useEffect} from 'react';
import Link from "next/link";
const RecentComments = props => {

    const renderComments = props.comments.map(comment => {
        return (
            <div key={props.comments.indexOf(comment)} className='recent-comments-item'>

                <Link href={`/post/${comment.onDocumentTitle}?id=${comment.onDocumentId}`}>
                    <a>
                        <strong className='recent-comments-item-author'>{comment.onDocumentTitle}</strong>
                    </a>
                </Link>

                <strong className='recent-comments-item-author'>{comment.author}:</strong>

                <p>{comment.body}</p>
            </div>
        )
    })
    return (
        <div className='recent-comments'>
            {renderComments}
        </div>
    );
};
export default RecentComments;
