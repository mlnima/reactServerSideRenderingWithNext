import React, { Component, useEffect, useState, useContext } from 'react';

import { AppContext } from "../../../context/AppContext";
import VideoElement from "../VideoElement/VideoElement";

import withRouter from "next/dist/client/with-router";


const Posts = props => {
    const contextData = useContext(AppContext);
    const [ postsData, setPostsData ] = useState({
        pageNo: 1,
        size: 12,
        totalPosts: 0,
        postType: 'all',
        keyword: '',
        status: 'all',
        author: 'all',
        fields: [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration' ],
        checkedPosts: [],
    });
    const [ posts, setPosts ] = useState([]);


    const renderPosts = props.posts.map(post => {
        return (
            <VideoElement key={ post._id } state={ post }/>
        )
    });

    return (
        <div className='Videos'>
            <div className='videoContent'>
                { renderPosts }
            </div>
            {/*<Pagination { ...props } postsData={ postsData } setPostsData={ setPostsData }/>*/ }
        </div>
    );
};

export default withRouter(Posts)