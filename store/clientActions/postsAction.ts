import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
import _postPageQueryGenerator from "@_variables/clientVariables/_postPageQueryGenerator";
import Axios from "@_variables/util/Axios";
import {
    DELETE_COMMENT,
    GET_COMMENTS, GET_METAS,
    GET_POST,
    GET_POSTS,
    INITIAL_POSTS,
    LOADING,
    NEW_COMMENT, SET_ALERT,
    SET_POSTS_DATA
} from "@store/types";
import _metaPageQueryGenerator from "@_variables/clientVariables/_metaPageQueryGenerator";

export const setPostsData = postsData => async dispatch => {
    dispatch({
        type: SET_POSTS_DATA,
        payload: postsData
    })
}

export const getPosts = (query,metaId,cache,metaType) => async dispatch => {
    const gettingPostsQueries = _getPostsQueryGenerator(query, metaId, cache)
    await Axios.get(`/api/v1/posts/clientGetPosts${gettingPostsQueries}`)
        .then(res=>{
            const metaData = [metaType] && res?.data?.meta ? {[metaType]: res?.data?.meta} : {}
            dispatch({
                type: GET_POSTS,
                payload: {
                    posts:res.data?.posts || [],
                    totalCount: res?.data?.totalCount || 0,
                    ...metaData
                },

            })
        }).catch(err=>{
            dispatch({
                type: GET_POSTS,
                payload:  [],
                totalCount:  0,
            })
        })

}

export const initialPosts = (posts) => async dispatch => {
    dispatch({
        type: INITIAL_POSTS,
        payload: posts
    })
}

export const getPost = (_id: string) => async dispatch => {
    await Axios.get(`/api/v1/posts/clientGetPost${_postPageQueryGenerator({_id})}`).then(res => {
        dispatch({
            type: GET_POST,
            payload: res.data.post
        })
    }).catch(err => {

    })
}

export const getMetas = (data,metaType,cache) => async dispatch =>{
    const typeOfMetaDispatch = metaType === 'categories' ? 'categoriesMetas' :
                               metaType === 'tags' ? 'tagsMetas' :
                               metaType === 'actors' ? 'actorsMetas' : 'categoriesMetas'
    //GET_METAS
    const queries = _metaPageQueryGenerator(data,metaType,cache)
    await Axios.get( `/api/v1/posts/getMultipleMeta${queries}`).then(res=>{
        dispatch({
            type: GET_METAS,
            payload: {
                [typeOfMetaDispatch]: res.data?.metas || [],
                totalCount: res.data?.totalCount || 0,
            }
        })
    }).catch(err => {

    })
}

export const getComments = async (_id: string) => async dispatch => {
    // @ts-ignore
    await Axios.get(`/api/v1/posts/getComments?onDocument=${_id}`).then(res => {
        dispatch({
            type: GET_COMMENTS,
            payload: res.data?.comments
        })
    }).catch(err => {
        dispatch({
            type: GET_COMMENTS,
            payload: []
        })
    })
};

export const addNewComment = (newComment) => async dispatch => {
    dispatch({
        type: NEW_COMMENT,
        payload: newComment
    })
}

export const deleteComments = (commentsListToDelete) => async dispatch => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await Axios.post(`/api/admin/posts/deleteComments`, {
        commentsIds: commentsListToDelete,
        token: localStorage.wt
    }).then((res) => {
        dispatch({
            type: DELETE_COMMENT,
            payload: commentsListToDelete
        })
        dispatch({
            type: SET_ALERT,
            payload: {
                message: res.data.message || 'Comment Deleted',
                type: 'success'
            }
        });
    }).catch(err => {
        dispatch({
            type: SET_ALERT,
            payload: {
                message: 'Error While Deleting Comment',
                type: 'error',
                err
            }
        })
    }).finally(() => {
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}




// const id = _id ? {_id} : {}
// const cacheStatus = cache ? {cache} : {}
// const requestQueries = new URLSearchParams({...id,...cacheStatus}).toString()
// await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/posts/clientGetPost?${ requestQueries}` ).then(res=>{
//     dispatch({
//         type:GET_POST,
//         payload:res.data?.post
//     })
// }).catch(err=>{
//     console.log(err)
// })