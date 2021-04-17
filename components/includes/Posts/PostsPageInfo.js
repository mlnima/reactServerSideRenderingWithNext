import React from 'react';

const PostsPageInfo = props => {
    return (
        <div className='posts-page-info'>
            <h1>{props.contentType} : {decodeURI(props.contentName)}</h1>
        </div>
    );
};
export default PostsPageInfo;
