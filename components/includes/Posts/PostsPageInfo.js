import React from 'react';

const PostsPageInfo = props => {
    return (
        <div className='posts-page-info'>
            <h1>{props.metaType} : {decodeURI(props.metaName)}</h1>
        </div>
    );
};
export default PostsPageInfo;
