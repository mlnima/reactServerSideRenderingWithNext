import * as types from "../types";
import axios from "axios";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
import {getPosts,getPost} from "../../_variables/ajaxPostsVariables";
import _postPageQueryGenerator from "../../_variables/clientVariables/_postPageQueryGenerator";
import {GET_POST, SET_POSTS, SET_POSTS_DATA} from "../types";


export const setPostsData = postsData => async dispatch=>{
    dispatch({
        type:types.SET_POSTS_DATA,
        payload:postsData
    })
}





export const fetchPosts = () => async dispatch=>{
    //test
   const gettingPostsQueries = _getPostsQueryGenerator({},null,true)
   const postsData = await getPosts(gettingPostsQueries)
    dispatch({
        type:types.GET_POSTS,
        payload:postsData.data
    })
}

export const initialPosts = (posts) =>async dispatch=>{
    dispatch({
        type:types.INITIAL_POSTS,
        payload:posts
    })
}

export const fetchPost  = (_id,cache) => async dispatch=>{
    const id = _id ? {_id} : {}
    const cacheStatus = cache ? {cache} : {}
    const requestQueries = new URLSearchParams({...id,...cacheStatus}).toString()
    await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/posts/clientGetPost?${ requestQueries}` ).then(res=>{
        console.log(res.data)
        dispatch({
            type:types.GET_POST,
            payload:res.data?.post
        })
    }).catch(error=>{
        console.log(error)
    })
}