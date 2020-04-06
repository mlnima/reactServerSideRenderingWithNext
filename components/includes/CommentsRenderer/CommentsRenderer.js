import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../context/AppContext'

const CommentsRenderer = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        authorStyle: {},
        dateStyle: {},
        bodyStyle: {},
        style: {}
    });

    useEffect(() => {
        setState({
            ...state,
            authorStyle: {
                color: contextData.siteDesign.commentsAuthorTextColor
            },
            dateStyle: {
                color: contextData.siteDesign.commentsDateTextColor
            },
            bodyStyle: {
                color: contextData.siteDesign.commentsBodyTextColor
            },
            style: {
                backgroundColor: contextData.siteDesign.commentsBackgroundColor
            }
        })
    }, [ props ]);

    const renderComments = props.comments.map(comment => {
        return (
            <div key={comment.postedDate } style={ state.style } className='comments-item'>
                <p style={ state.authorStyle } className='comment-author'>{ comment.author } says:</p>
                <p style={ state.dateStyle } className='comment-date'>{ comment.postedDate }</p>
                <p style={ state.bodyStyle } className='comment-body'>{ comment.body }</p>
            </div>
        )
    })

    return (
        <div className='comments'>
            { renderComments }
        </div>
    );
};
export default CommentsRenderer;
