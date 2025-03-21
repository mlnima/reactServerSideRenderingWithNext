'use client';
import Link from 'next/link';
import { FC } from 'react';
import { IComment } from '@repo/typescript-types';

interface IProps {
  comments: IComment[];
}

const RecentComments: FC<IProps> = ({ comments }) => {

  const renderComments = comments.map(comment => {
    // @ts-expect-error: widget is not in use and need to get fixed
    const {postType,_id,title} = comment.onDocumentId

    if (!postType || !_id || !title) return null;

    return (
      <div key={comment?._id} className="recent-comments-item">
        <Link href={`/post/${postType}/${_id}`}>
          <strong className="recent-comments-item-author">{title}</strong>
        </Link>
        <strong className="recent-comments-item-author">{comment.author?.username}:</strong>

        <p>{comment.body}</p>
      </div>
    );
  });

  return (
    <div className="recentComments">
      {renderComments}
    </div>
  );
};

export default RecentComments;
