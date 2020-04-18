import React from 'react';

const RecentComments = props => {

    const renderComments = props.comments.map(comment => {
        return (
            <div key={ props.comments.indexOf(comment) } className='recent-comments-item'>
                <strong className='recent-comments-item-author'>{ comment.author } says:</strong>
                <p>{ comment.body }</p>
            </div>
        )
    })
    return (
        <div className='recent-comments'>
            { renderComments }
        </div>
    );
};
export default RecentComments;
