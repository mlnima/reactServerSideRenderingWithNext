'use client';
import React, {FC, useEffect, useRef} from "react";
import CommentItem from "../Comment/CommentItem";
import {Comment} from "@repo/typescript-types";
import './CommentsRenderer.styles.scss'

interface IProps {
    comments: Comment[],
    onDeleteCommentHandler: (id: string) => void,
    adminMode: boolean,
    commentsRef: React.RefObject<HTMLDivElement>,
    commentsAllowScrollRef: React.MutableRefObject<boolean>,
}

const CommentsRenderer: FC<IProps> = ({comments, onDeleteCommentHandler, adminMode, commentsRef,commentsAllowScrollRef}) => {
    const isFirstRender = useRef(0);

    useEffect(() => {
        if (isFirstRender.current < 2) {
            isFirstRender.current++;
            return;
        }
        if (
            comments?.length &&
            commentsRef?.current &&
            isFirstRender.current === 2 &&
            commentsAllowScrollRef?.current
        ) {
            commentsRef.current.scroll({
                top: commentsRef.current.scrollHeight, behavior: 'smooth'
            });
        }

    }, [comments]);


    return (
        <div className={'comments custom-scroll'} ref={commentsRef}>


            {comments?.length > 0 ?
                <>
                    {comments.map((comment: Comment) => (
                        <CommentItem key={comment?._id || comment?.author?._id}
                                     onDeleteCommentHandler={onDeleteCommentHandler}
                                     comment={comment}
                                     adminMode={adminMode}/>
                    ))}
                </> :
                <div className={'noComments'}>
                    <span>No Comments Yet...</span>
                </div>
            }
        </div>
    );
};

export default CommentsRenderer;


