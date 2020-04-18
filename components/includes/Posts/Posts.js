import React, { Component, useEffect, useState, useContext } from 'react';

import { AppContext } from "../../../context/AppContext";
import PostElement from "../PostElement/PostElement";

import withRouter from "next/dist/client/with-router";

const Posts = props => {
    // const contextData = useContext(AppContext);
    // const [ postsData, setPostsData ] = useState({
    //     pageNo: 1,
    //     size: 12,
    //     totalPosts: 0,
    //     postType: 'all',
    //     keyword: '',
    //     status: 'all',
    //     author: 'all',
    //     fields: [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration' ],
    //     checkedPosts: [],
    // });

    const renderPosts = (props.posts || []).map(post => {
        return (
            <PostElement key={ post._id } state={ post } viewType={ props.viewType }/>
        )
    });

    return (
        <div className='Posts'>
            <div className={ 'postsContent ' + (props.viewType ? props.viewType + 'PostsContent' : 'standard') }>
                { renderPosts }
            </div>
        </div>
    );
};

export default withRouter(Posts)