import React, { Component, useEffect, useState, useContext } from 'react';
import PostElement from "../PostElement/PostElement";
import withRouter from "next/dist/client/with-router";

const Posts = props => {
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