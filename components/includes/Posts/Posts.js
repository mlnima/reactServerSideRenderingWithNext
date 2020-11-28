import React from 'react';
import PostElement from "../PostElement/PostElement";

const Posts = props => {
    const renderPosts = (props.posts || []).map(post => {
        return (
            <PostElement isMobile={props.isMobile} key={ post._id } state={ post } viewType={ props.viewType }/>
        )
    });

    return (
        <div className='posts-grid'>

            <div className={ 'postsContent ' + (props.viewType ? props.viewType + 'PostsContent' : 'standard') }>
                { renderPosts }
            </div>
        </div>
    );
};

export default Posts