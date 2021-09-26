import * as types from "../types";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
import {getPosts} from "../../_variables/ajaxPostsVariables";


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