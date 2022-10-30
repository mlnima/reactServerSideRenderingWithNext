import React, { useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import PostsCardsRenderer from "../../cards/CardsRenderer/PostsCardsRenderer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const MyProfilePosts = props => {
    const userData = useSelector(({user}:Store) => user.userData)

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
                    author: userData._id || 'all',
                    actor: props.router.query.actor || 'all',
                    status: props.router.query.status|| 'published',
                    tag: props.router.query.tag || 'all',
                    category: props.router.query.category || 'all',
                    sort: props.router.query.sort || 'latest',
                }

               // getPosts(getPostsData,  window.location.origin,true,window.location.href).then(res=>{
               //     setState({
               //         ...state,
               //         posts:res.data.posts,
               //         totalCount: res.data.totalCount
               //     })
               // })

            }
        }
    }, []);
    return (
        <div className='my-profile-posts'>
          <h1>MyProfilePosts</h1>
            <PostsCardsRenderer posts={ state.posts || [] }/>
        </div>
    );
};
export default MyProfilePosts;
