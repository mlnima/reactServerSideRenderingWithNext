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
    EDIT_POST_FIELD, LIKE_POST, DISLIKE_POST, VIEW_POST, SET_HEAD_DATA
} from "@store/types";
import _metaPageQueryGenerator from "@_variables/clientVariables/_metaPageQueryGenerator";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import {convertMetasTypeToSingular, getTextDataWithTranslation, reduceArrayOfDataToIds} from "@_variables/_variables";
import staticDataJson from "../../static/jsons/staticData.json";


export const setPostsData = postsData => async dispatch => {
    dispatch({
        type: SET_POSTS_DATA,
        payload: postsData
    })
}

export const getPosts = (context, metaId, cache, metaType, options) => async dispatch => {
    const gettingPostsQueries = _getPostsQueryGenerator(context.query, metaId, cache)
    await Axios.get(`/api/v1/posts/clientGetPosts${gettingPostsQueries}`)
        .then(res => {
            // const dataForm = metaType === 'actors' ? 'actorData' :
            //     metaType === 'tags' ? 'tagData' :
            //         metaType === 'categories' ? 'categoryData' : null
            const singularMetaForm = convertMetasTypeToSingular(metaType)
            const dataForm = metaType && singularMetaForm ? `${singularMetaForm}Data` : ''
            const meta = res?.data?.meta
            const metaData = dataForm && meta ? {[dataForm]: meta} : {}

            dispatch({
                type: GET_POSTS,
                payload: {
                    posts: res.data?.posts || [],
                    totalCount: res?.data?.totalCount || 0,
                    ...metaData
                }
            })

            if (res?.data?.meta && metaId && options) {
                const staticData = staticDataJson
                const title = `${res?.data?.meta?.name} ` +
                               getTextDataWithTranslation(context.locale, `${options.page}PageTitle`, staticData?.identity) +
                                //@ts-ignore
                               (staticData?.identity?.siteName ? ` | ${staticData?.identity?.siteName}` : '')

                const description = getTextDataWithTranslation(context.locale, `${options.page}PageDescription` , staticData?.identity)+
                                    ` ${res?.data?.meta?.name}`


                dispatch({
                    type: SET_HEAD_DATA,
                    payload: {
                        title: title || null,
                        description: description || null,
                        keywords: [res?.data?.meta?.name] || null,
                        ogTitle: title || null,
                        ogType: 'website',
                        ogDescription: description || null,
                        ogUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${singularMetaForm}/${metaId}`,
                        ogImage: meta?.mainThumbnail || null,
                        twitterCard: true,
                        twitterUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${singularMetaForm}/${metaId}`,
                        twitterTitle: meta?.name || null,
                        twitterDescription: meta?.description || null,
                        twitterImage: meta?.imageUrl || null,
                    }
                })
            }

        }).catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: [],
                totalCount: 0,
            })
        })

}


export const getPost = (_id: string | string[], locale) => async dispatch => {
    const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL
    await Axios.get(`/api/v1/posts/clientGetPost${_postPageQueryGenerator({_id})}`).then(res => {

        // console.log(res.data)
        const postData = res.data.post;
        const postTitle = isDefaultLocale ?
            postData?.title || '' :
            postData?.translations?.[locale]?.title || postData?.title || '';
        const postDescription = isDefaultLocale ?
            postData?.description || '' :
            postData?.translations?.[locale]?.description || postData?.description || ''

        dispatch({
            type: GET_POST,
            payload: {post:postData,relatedPosts:res.data.relatedPosts}
        })


        const keywords =  [
            ...(postData?.tags || []),
            ...(postData?.categories || []),
            ...(postData?.actors || [])
        ].map(meta=>meta?.name)

        dispatch({
            type: SET_HEAD_DATA,
            payload: {
                title: postTitle,
                description: postDescription,
                keywords,

                ogTitle: postTitle,
                // ogType: postData?.postType === 'video' ? 'video.other' : postData?.postType || '',
                ogType: 'website',
                ogDescription: postDescription,
                ogUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/${postData?.postType}/${postData?._id}`,
                ogImage: postData?.mainThumbnail || null,

                twitterCard: true,
                twitterUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/${postData?.postType}/${postData?._id}`,
                twitterTitle: postTitle,
                twitterDescription: postDescription,
                twitterImage: postData?.mainThumbnail || null,
            }
        })
    }).catch(err => {

    })
}

export const getEditingPost = (_id: string) => async dispatch => {
    dispatch({type: LOADING, payload: true})
    await Axios.get(`/api/v1/posts/clientGetPost${_postPageQueryGenerator({_id})}`).then(res => {

        dispatch({
            type: GET_EDITING_POST,
            payload: res.data.post
        })

    }).catch(err => {

    }).finally(() => dispatch({type: LOADING, payload: false}))
}


export const userCreateNewPost = (data: PostTypes, router) => async dispatch => {

    dispatch({type: LOADING, payload: true})


    const comments = data.comments ? {comments: reduceArrayOfDataToIds(data.comments)} : {}
    const categories = data.categories ? {categories: reduceArrayOfDataToIds(data.categories)} : {}
    const tags = data.tags ? {tags: reduceArrayOfDataToIds(data.tags)} : {}
    const actors = data.actors ? {actors: reduceArrayOfDataToIds(data.actors)} : {}

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
    await Axios.post(`/api/v1/posts/userCreateNewPost`, body).then(res => {
        dispatch({
            type: GET_EDITING_POST,
            payload: res.data.post
        })
        if (res.data?.message) {
            dispatch({
                type: SET_ALERT,
                payload: {
                    active: true,
                    type: 'success',
                    message: res.data.message
                }
            })
        }

        if (res.data?.post?._id) {
            router.push(`/profile/post?id=${res.data.post._id}`)
        }
    }).catch(err => {

    }).finally(() => dispatch({type: LOADING, payload: false}))
}

export const userUpdatePost = (data: PostTypes) => async dispatch => {
    dispatch({type: LOADING, payload: true})

    const comments = data.comments ? {comments: reduceArrayOfDataToIds(data.comments)} : {}
    const categories = data.categories ? {categories: reduceArrayOfDataToIds(data.categories)} : {}
    const tags = data.tags ? {tags: reduceArrayOfDataToIds(data.tags)} : {}
    const actors = data.actors ? {actors: reduceArrayOfDataToIds(data.actors)} : {}
    const author = data.author ? {author: data.author._id} : {}

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

    await Axios.post(`/api/v1/posts/userUpdatePost`, body).then(res => {
        if (res.data?.message) {
            dispatch({
                type: SET_ALERT,
                payload: {
                    active: true,
                    type: 'success',
                    message: res.data.message
                }
            })
        }
        getEditingPost(res.data.post._id)
    }).catch(err => {

    }).finally(() => {
        dispatch({type: LOADING, payload: false})
    })
}

export const editPostField = (data) => async dispatch => {
    dispatch({
        type: EDIT_POST_FIELD,
        payload: data
    })
}

export const getMetas = (data, metaType, cache) => async dispatch => {
    const typeOfMetaDispatch = metaType === 'categories' ? 'categoriesMetas' :
        metaType === 'tags' ? 'tagsMetas' :
            metaType === 'actors' ? 'actorsMetas' : 'categoriesMetas'
    const queries = _metaPageQueryGenerator(data, metaType, cache)
    await Axios.get(`/api/v1/posts/getMultipleMeta${queries}`).then(res => {
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

export const getComments = (_id: string) => async dispatch => {
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

export const newComment = (commentData) => async dispatch => {
    dispatch({type: LOADING, payload: true})
    const body = {
        ...commentData,
    };
    await Axios.post(`/api/v1/posts/newComment`, body).catch(() => {
        dispatch({
            type: SET_ALERT,
            payload: {
                active: true,
                type: 'error',
                message: 'Something Went Wrong'
            }
        })

    }).finally(() => dispatch({type: LOADING, payload: false}))
}


export const deleteComments = (commentsListToDelete) => async dispatch => {
    dispatch({type: LOADING, payload: true})
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
    }).finally(() => dispatch({type: LOADING, payload: false}))
}


export const getPageData = (pageName) => async dispatch => {
    const body = {
        pageName
    }
    await Axios.post('/api/v1/pages/getPageData', body).then(res => {
        console.log(res.data?.pageData)
        dispatch({
            type: GET_PAGE_DATA,
            payload: res.data?.pageData || {}
        })
        dispatch({
            type: SET_HEAD_DATA,
            payload: {
                title: res.data?.pageData?.title || pageName ,
                description: res.data?.pageData?.description || null,
                keywords:res.data?.pageData?.keywords|| null,
                ogTitle: res.data?.pageData?.title || pageName,
                ogType: 'website',
                ogDescription: res.data?.pageData?.description || null,
                ogUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${pageName}`,
                ogImage: res.data?.pageData?.imageUrl || null,
                twitterCard: true,
                twitterUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${pageName}`,
                twitterTitle: res.data?.pageData?.title || pageName ,
                twitterDescription: res.data?.pageData?.description || null,
                twitterImage: res.data?.pageData?.imageUrl || null,
            }
        })
    })
}

export const likePost = (id: string) => async dispatch => {
    const ratingData = localStorage?.ratingData ? JSON.parse(localStorage.ratingData) : {likes: [], disLikes: []};
    ratingData.likes = [...new Set([...ratingData.likes, id])]
    ratingData.disLikes = ratingData.disLikes.filter(disLiked => disLiked !== id)
    localStorage.setItem('ratingData', JSON.stringify(ratingData))

    const body = {
        id,
        type: 'likes'
    };

    await Axios.post('/api/v1/posts/likeDislikeView', body).then(res => {
        dispatch({
            type: LIKE_POST,
        })
    })

}

export const disLikePost = (id: string) => async dispatch => {
    const ratingData = localStorage?.ratingData ? JSON.parse(localStorage.ratingData) : {likes: [], disLikes: []};
    ratingData.disLikes = [...new Set([...ratingData.disLikes, id])]
    ratingData.likes = ratingData.likes.filter(liked => liked !== id)
    localStorage.setItem('ratingData', JSON.stringify(ratingData))

    const body = {
        id,
        type: 'disLikes'
    };

    await Axios.post('/api/v1/posts/likeDislikeView', body).then(res => {
        dispatch({
            type: DISLIKE_POST,
        })
    })
}

export const viewPost = (id: string) => async dispatch => {
    const body = {
        id,
        type: 'views'
    };
    await Axios.post('/api/v1/posts/likeDislikeView', body).then(res => {
        dispatch({
            type: VIEW_POST,
            // payload: res.data?.pageData || {}
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