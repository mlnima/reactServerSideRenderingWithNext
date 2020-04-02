import React, { useEffect, useState, useContext, useRef } from 'react';

const CommentsRenderer = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
        console.log( props)
    }, [props]);

    const renderComments= props.comments.map(comment=>{
        return(
            <div className='comments-item'>
                <p className='comment-author'>{comment.author} says:</p>
                <p className='comment-date'>{comment.postedDate}</p>
                <p className='comment-body'>{comment.body}</p>
            </div>
        )
    })

    return (
        <div className='comments'>
            {renderComments}
        </div>
    );
};
export default CommentsRenderer;
