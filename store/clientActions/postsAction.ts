import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
import _postPageQueryGenerator from "@_variables/clientVariables/_postPageQueryGenerator";
import Axios from "@_variables/util/Axios";
import {
    DELETE_COMMENT,
    GET_COMMENTS,
    GET_METAS,
    GET_PAGE_DATA,
    GET_POST,
    GET_POSTS,
    INITIAL_POSTS,
    LOADING,
    NEW_COMMENT,
    GET_EDITING_POST,
    SET_ALERT,
    SET_POSTS_DATA,
    EDIT_POST_FIELD
} from "@store/types";
import _metaPageQueryGenerator from "@_variables/clientVariables/_metaPageQueryGenerator";
import axios from "axios";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";

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

export const getEditingPost = (_id: string) => async dispatch => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await Axios.get(`/api/v1/posts/clientGetPost${_postPageQueryGenerator({_id})}`).then(res => {
        dispatch({
            type: GET_EDITING_POST,
            payload: res.data.post
        })

    }).catch(err => {

    }).finally(()=>{
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}




export const userCreateNewPost = (data: PostTypes,router) => async dispatch => {

    dispatch({
        type: LOADING,
        payload: true
    })

    const comments = data.comments ? {comments: data.comments.map(comment => comment._id)}:{}
    const categories = data.categories? {categories:data.categories.map(category=>category._id)}:{}
    const tags = data.tags? {tags:data.tags.map(tag=>tag._id)}:{}
    const actors = data.actors? {actors:data.actors.map(actor=>actor._id)}:{}

    const postData = {
        ...data,
        ...comments,
        ...categories,
        ...tags,
        ...actors
    }
    const body = {
        postData,
        token: localStorage.wt
    };
    await Axios.post(  `/api/v1/posts/userCreateNewPost`, body).then(res => {
        console.log(res.data)
        dispatch({
            type: GET_EDITING_POST,
            payload: res.data.post
        })
        if (res.data?.message){
            dispatch({
                type:SET_ALERT,
                payload:{
                    active:true,
                    type:'success',
                    message:res.data.message
                }
            })
        }

        if(res.data?.post?._id){
            router.push(`/profile/post?id=${res.data.post._id}`)
        }
    }).catch(err => {

    }).finally(()=>{
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}

export const userUpdatePost = (data: PostTypes) => async dispatch => {
    dispatch({
        type: LOADING,
        payload: true
    })
    const comments = data.comments ? {comments: data.comments.map(comment => comment._id)}:{}
    const categories = data.categories? {categories:data.categories.map(category=>category._id)}:{}
    const tags = data.tags? {tags:data.tags.map(tag=>tag._id)}:{}
    const actors = data.actors? {actors:data.actors.map(actor=>actor._id)}:{}
    const author = data.author? {author:data.author._id}:{}
    const postData = {
        ...data,
        ...comments,
        ...categories,
        ...author,
        ...tags,
        ...actors
    }

    const body = {
        postData,
        token: localStorage.wt
    };

    await Axios.post(  `/api/v1/posts/userUpdatePost`, body).then(res => {
        dispatch({
            type: GET_EDITING_POST,
            payload: res.data.post
        })
        if (res.data?.message){
            dispatch({
                type:SET_ALERT,
                payload:{
                    active:true,
                    type:'success',
                    message:res.data.message
                }
            })
        }
    }).catch(err => {

    }).finally(()=>{
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}

export const editPostField = (key: string,value:any) =>  dispatch => {
    dispatch({
        type: EDIT_POST_FIELD,
        payload: {
            [key]: value
        }
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


export const getPageData = (pageName) => async dispatch => {
    const body = {
        pageName
    }
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/pages/getPageData', body).then(res=>{
        dispatch({
            type: GET_PAGE_DATA,
            payload: res.data?.pageData || {}
        })
    })
}



export const createEditPostByUser = (pageName) => async dispatch => {
    // const body = {
    //     pageName
    // }
    // await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/pages/getPageData', body).then(res=>{
    //     dispatch({
    //         type: GET_PAGE_DATA,
    //         payload: res.data?.pageData || {}
    //     })
    // })
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