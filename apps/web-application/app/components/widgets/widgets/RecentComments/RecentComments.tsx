'use client';
//@ts-ignore



import Link from "next/link";
import styled from "styled-components";

let RecentCommentsStyledDiv = styled.div`
  padding: 10px;
  max-width: 100vw;

  .recent-comments-item {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;

    .recent-comments-item-author {
      color: #FF3565;
      margin: 0 5px;
    }

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`
const RecentComments = props => {

    const renderComments = props.comments.map(comment => {
        return (
            <div key={props.comments.indexOf(comment)} className='recent-comments-item'>

                <Link href={`/post/${comment?.onDocumentTitle}?id=${comment.onDocumentId}`}>
                        <strong className='recent-comments-item-author'>{comment?.onDocumentTitle}</strong>
                </Link>

                <strong className='recent-comments-item-author'>{comment.author}:</strong>

                <p>{comment.body}</p>
            </div>
        )
    })
    return (
        <RecentCommentsStyledDiv className='recent-comments'>
            {renderComments}
        </RecentCommentsStyledDiv>
    );
};
export default RecentComments;
