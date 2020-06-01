import React, { useEffect, useState, useContext, useRef } from 'react';
import withRouter from 'next/dist/client/with-router'
import { AppContext } from '../../../../context/AppContext'
import { getPosts } from '../../../../_variables/ajaxPostsVariables'
import Posts from '../../Posts/Posts'
const MyProfilePosts = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        posts:[],
        totalCount:0
    });
    useEffect(() => {
        if (props.router){
            if (props.router.query.username){
                const getPostsData = {
                    size:   parseInt(props.router.query.size) ||  30,
                    pageNo: parseInt(props.router.query.page) || 1,
                    postType: props.router.query.type || 'all',
                    fields: [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration','postType','price' ],
                    keyword: props.router.query.keyword || '',
                    author: contextData.userData._id || 'all',
                    actor: props.router.query.actor || 'all',
                    status: props.router.query.status|| 'published',
                    tag: props.router.query.tag || 'all',
                    category: props.router.query.category || 'all',
                    sort: props.router.query.sort || 'latest',
                }
               getPosts(getPostsData, true, window.location.origin).then(res=>{
                   setState({
                       ...state,
                       posts:res.data.posts,
                       totalCount: res.data.totalCount
                   })
               })

            }
        }



    }, []);
    return (
        <div className='my-profile-posts'>
          <h1>MyProfilePosts</h1>
            <Posts posts={ state.posts || [] }/>
        </div>
    );
};
export default withRouter(MyProfilePosts);
