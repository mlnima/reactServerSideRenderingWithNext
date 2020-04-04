import React, { useEffect, useState, useContext, useRef } from 'react';

const RecentComments = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const renderComments = props.data.map(comment=>{
        return(
            <div key={props.data.indexOf(comment)} className='recent-comments-item'>
                <strong>{comment.author}</strong>
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
