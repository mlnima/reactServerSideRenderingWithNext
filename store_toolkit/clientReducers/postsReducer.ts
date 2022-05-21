import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "@store_toolkit/store";
import Axios from "@_variables/util/Axios";
import _metaPageQueryGenerator from "@_variables/clientVariables/_metaPageQueryGenerator";
import _postPageQueryGenerator from "@_variables/clientVariables/_postPageQueryGenerator";
import isValidObjectId from "@_variables/util/mongoIdValidator";
import {loading, setAlert, setHeadData, setNotFoundPage} from "@store_toolkit/clientReducers/globalStateReducer";
import _clientGetPostsQueryGenerator from "@_variables/clientVariables/_clientGetPostsQueryGenerator";
import {
    convertMetasTypeToSingular,
    getTextDataWithTranslation,
    reduceArrayOfDataToIds,
    textContentReplacer
} from "@_variables/_variables";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import {NextRouter} from "next/router";
// import {createEditPostByUser} from "@store_toolkit/clientActions/postsAction";

interface PostsState {
    posts: [],
    pageData: {},
    actorData: {},
    categoryData: {},
    tagData: {},
    totalCount: 0,
    post: {
        comments: [],
        likes: 0,
        disLikes: 0,
        views: 0
    },
    relatedPosts: {
        actorsRelatedPosts: [],
        categoriesRelatedPosts: [],
        tagsRelatedPosts: [],
    },
    editingPost: {},
    comments: {
        _id: string
    }[],
    categoriesMetas: [],
    tagsMetas: [],
    actorsMetas: [],
}

interface FetchPost {
    identifier: string,
    options: {
        page: string
        setHeadData?: boolean
    },
    locale: string
}

interface FetchPosts {
    context: any,
    metaId: string,
    metaType: string,
    options: {
        page: string,
        setHeadData?: boolean
    },

}

const initialState: PostsState = {
    posts: [],
    pageData: {},
    actorData: {},
    categoryData: {},
    tagData: {},
    totalCount: 0,
    post: {
        comments: [],
        likes: 0,
        disLikes: 0,
        views: 0
    },
    relatedPosts: {
        actorsRelatedPosts: [],
        categoriesRelatedPosts: [],
        tagsRelatedPosts: [],
    },
    editingPost: {},
    comments: [],
    categoriesMetas: [],
    tagsMetas: [],
    actorsMetas: [],
}


export const fetchMetas = createAsyncThunk(
    'posts/fetchMetas',
    async ({data, metaType}: { data: {}, metaType: string }, thunkAPI) => {
        try {
            const queries = _metaPageQueryGenerator(data, metaType)
            const apiData = await Axios.get(`/api/v1/posts/getMetas${queries}`)
            return {
                [`${metaType}Metas`]: apiData?.data?.metas || [],
                totalCount: apiData?.data?.totalCount || 0,
            }
        } catch (err) {

        }
    }
)

export const fetchPost = createAsyncThunk(
    'posts/fetchPost',
    async ({locale, identifier}: FetchPost, thunkAPI) => {

        const queryGeneratorData = isValidObjectId(identifier) ? {_id: identifier} : {title: identifier}
        const apiData = await Axios.get(`/api/v1/posts/clientGetPost${_postPageQueryGenerator(queryGeneratorData)}`)

        const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL;
        const postTitle = isDefaultLocale ?
            apiData.data.post?.title || '' :
            apiData.data.post?.translations?.[locale]?.title || apiData.data.post?.title || '';
        const postDescription = isDefaultLocale ?
            apiData.data.post?.description || '' :
            apiData.data.post?.translations?.[locale]?.description || apiData.data.post || '';

        const keywords = [
            ...(apiData.data.post?.tags || []),
            ...(apiData.data.post?.categories || []),
            ...(apiData.data.post?.actors || [])
        ].map(meta => meta?.name)

        thunkAPI.dispatch(
            setHeadData({
                    title: postTitle,
                    description: postDescription?.substring(0, 155) || null,
                    keywords,
                    canonicalUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/${apiData.data.post?.postType || 'article'}/${apiData.data.post?._id}`,
                    ogTitle: postTitle,
                    // ogType: postData?.postType === 'video' ? 'video.other' : postData?.postType || '',
                    ogType: 'website',
                    ogDescription: postDescription?.substring(0, 155),
                    ogUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/${apiData.data.post?.postType || 'article'}/${apiData.data.post?._id}`,
                    ogImage: apiData.data.post?.mainThumbnail || null,

                    twitterCard: true,
                    twitterUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/${apiData.data.post?.postType || 'article'}/${apiData.data.post?._id}`,
                    twitterTitle: postTitle,
                    twitterDescription: postDescription?.substring(0, 155),
                    twitterImage: apiData.data.post?.mainThumbnail || null,
                }
            )
        )
        return ({
            post: apiData.data.post,
            relatedPosts: apiData.data.relatedPosts
        })
    }
)


export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({context, metaId, metaType, options}: FetchPosts, thunkAPI) => {
        //@ts-ignore
        const {settings} = await thunkAPI.getState()
        const singularMetaForm = convertMetasTypeToSingular(metaType);
        const gettingPostsQueries = _clientGetPostsQueryGenerator(context.query, metaId)
        const apiData = await Axios.get(`/api/v1/posts/clientGetPosts${gettingPostsQueries}`)
        const dataForm = metaType && singularMetaForm ? `${singularMetaForm}Data` : '';
        const meta = apiData?.data?.meta
        const metaData = dataForm && meta ? {[dataForm]: meta} : {}

        if (options.setHeadData) {
            const title = textContentReplacer(
                getTextDataWithTranslation(
                    context.locale,
                    `${options.page}PageTitle`,
                    settings?.identity
                ),
                {name: apiData.data?.meta?.name, siteName: settings?.identity?.siteName || ''}
            )

            const description = textContentReplacer(
                getTextDataWithTranslation(
                    context.locale,
                    `${options.page}PageDescription`,
                    settings?.identity
                ), {name: apiData.data?.meta?.name}
            )

            const canonicalUrl = options?.page?.match('category|tag|actor') ?
                {canonicalUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${singularMetaForm}/${metaId}`} : {}


            thunkAPI.dispatch(
                setHeadData(
                    {
                        title: title || null,
                        description: description?.substring(0, 155) || null,
                        keywords: apiData?.data?.meta?.name ? [apiData?.data?.meta?.name] : null,
                        ogTitle: title || null,
                        ogType: 'website',
                        ogDescription: description?.substring(0, 155) || null,
                        ...canonicalUrl,
                        ogUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${singularMetaForm}/${metaId}`,
                        ogImage: meta?.mainThumbnail || null,
                        twitterCard: true,
                        twitterUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${singularMetaForm}/${metaId}`,
                        twitterTitle: meta?.name || null,
                        twitterDescription: meta?.description?.substring(0, 155) || null,
                        twitterImage: meta?.imageUrl || null,
                    }
                )
            )
        }

        return {
            posts: apiData.data?.posts || [],
            totalCount: apiData?.data?.totalCount || 0,
            ...metaData
        }

    }
)


export const fetchNewComment = createAsyncThunk(
    'posts/fetchNewComment',
    async (commentData: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            ...commentData,
        };
        await Axios.post(`/api/v1/posts/newComment`, body).catch(() => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'error',
                message: 'Something Went Wrong'
            }))
        }).finally(() => thunkAPI.dispatch(loading(false)))

    }
)

export const fetchPostComments = createAsyncThunk(
    'posts/fetchPostComments',
    async (_id: string, thunkAPI) => {
        return await Axios.get(`/api/v1/posts/getComments?onDocument=${_id}`).then(res => {
            return res.data?.comments
        }).catch(err => {
            return []
        })
    }
)
export const fetchDeleteCommentByAdminInPostPage = createAsyncThunk(
    'posts/fetchDeleteCommentByAdminInPostPage',
    async (commentsListToDelete: string[], thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await Axios.post(`/api/admin/posts/deleteComments`, {
            commentsIds: commentsListToDelete,
            token: localStorage.wt
        }).then((res) => {
            thunkAPI.dispatch(setAlert({
                message: res.data.message || 'Comment Deleted',
                type: 'success'
            }))
            return commentsListToDelete

        }).catch(err => {
            thunkAPI.dispatch(setAlert({
                message: 'Error While Deleting Comment',
                type: 'error',
                err
            }))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchPageData = createAsyncThunk(
    'posts/fetchPageData',
    async (pageName: string | string[], thunkAPI) => {
        return await Axios.get(`/api/v1/pages/getPageData?pageName=${pageName}`).then(res => {

            if (res.data?.pageData && res.data?.pageData?.status === 'published') {

                thunkAPI.dispatch(setHeadData({
                    title: res.data?.pageData?.title || pageName,
                    description: res.data?.pageData?.description?.substring(0, 155) || null,
                    keywords: res.data?.pageData?.keywords || null,
                    ogTitle: res.data?.pageData?.title || pageName,
                    canonicalUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${pageName}`,
                    ogType: 'website',
                    ogDescription: res.data?.pageData?.description?.substring(0, 155) || null,
                    ogUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${pageName}`,
                    ogImage: res.data?.pageData?.imageUrl || null,
                    twitterCard: true,
                    twitterUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${pageName}`,
                    twitterTitle: res.data?.pageData?.title || pageName,
                    twitterDescription: res.data?.pageData?.description?.substring(0, 155) || null,
                    twitterImage: res.data?.pageData?.imageUrl || null,
                }))

                thunkAPI.dispatch(setNotFoundPage(false))

                return res.data?.pageData || null
            } else {
                thunkAPI.dispatch(setNotFoundPage(true))
                return  null
            }

        })
    }
)


export const fetchLikePost = createAsyncThunk(
    'posts/fetchLikePost',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const ratingData = localStorage?.ratingData ? JSON.parse(localStorage.ratingData) : {likes: [], disLikes: []};
        ratingData.likes = [...new Set([...ratingData.likes, id])]
        ratingData.disLikes = ratingData.disLikes.filter(disLiked => disLiked !== id)
        localStorage.setItem('ratingData', JSON.stringify(ratingData))

        const body = {
            id,
            type: 'likes'
        };

        return await Axios.post('/api/v1/posts/likeDislikeView', body).then(res => {
            return
        }).finally(() => thunkAPI.dispatch(loading(false)))

    }
)

export const fetchDisLikePost = createAsyncThunk(
    'posts/fetchDisLikePost',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const ratingData = localStorage?.ratingData ? JSON.parse(localStorage.ratingData) : {likes: [], disLikes: []};
        ratingData.disLikes = [...new Set([...ratingData.disLikes, id])]
        ratingData.likes = ratingData.likes.filter(liked => liked !== id)
        localStorage.setItem('ratingData', JSON.stringify(ratingData))

        const body = {
            id,
            type: 'disLikes'
        };

        return await Axios.post('/api/v1/posts/likeDislikeView', body).then(res => {
            return
        }).finally(() => thunkAPI.dispatch(loading(false)))

    }
)
export const fetchViewPost = createAsyncThunk(
    'posts/fetchViewPost',
    async (id: string, thunkAPI) => {
        const body = {
            id,
            type: 'views'
        };
        return await Axios.post('/api/v1/posts/likeDislikeView', body).then(res => {
            return
        })
    }
)

export const fetchCreateEditPostByUser = createAsyncThunk(
    'posts/fetchCreateEditPostByUser',
    async (id: string, thunkAPI) => {
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
)

export const fetchUserEditingPost = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await Axios.get(`/api/v1/posts/clientGetPost${_postPageQueryGenerator({_id})}`).then(res => {
            return res.data.post
        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchUserCreateNewPost = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async ({data, router}: { data: PostTypes, router: NextRouter }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
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

                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'success',
                    message: res.data.message
                }))

                if (res.data?.post?._id) {
                    router.push(`/profile/post?id=${res.data.post._id}`)
                }
                // return res.data.post
            }
        )}
)

export const fetchUserEditingPostUpdate = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async (data: PostTypes, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const comments = data.comments ? {comments: reduceArrayOfDataToIds(data.comments)} : {}
        const categories = data.categories ? {categories: reduceArrayOfDataToIds(data.categories)} : {}
        const tags = data.tags ? {tags: reduceArrayOfDataToIds(data.tags)} : {}
        const actors = data.actors ? {actors: reduceArrayOfDataToIds(data.actors)} : {}
        //@ts-ignore
        const author = data.author ? {author: data.author?._id} : {}

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
                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'success',
                    message: res.data.message
                }))

            }
            thunkAPI.dispatch(fetchUserEditingPost(res.data.post._id))

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)




export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPostsData: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        getPosts: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
                // post:{
                //     ...state.post,
                //     ...action.payload.post
                // },
                // relatedPosts:{
                //     ...action.payload
                // }
            }
        },
        initialPosts: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null
            }
        },
        setPost: (state, action: PayloadAction<any>) => {
            state.post = action.payload?.postData
            state.relatedPosts = action.payload?.relatedPosts
            // return {
            //     ...state,
            //     ...action.payload
            //
            // }
        },
        getEditingPost: (state, action: PayloadAction<any>) => {
            state.editingPost = action.payload
        },
        editPostField: (state, action: PayloadAction<any>) => {
            state.editingPost = {
                ...state.editingPost,
                ...action.payload
            }
        },

        newComment: (state, action: PayloadAction<any>) => {
           console.log(action.payload)
            state.post.comments = action.payload
        },
        deleteComment: (state, action: PayloadAction<any>) => {
            //@ts-ignore
            state.post.comments = state.post.comments.filter(comment => !action.payload.includes(comment._id))
        },
        likePost: (state, action: PayloadAction<any>) => {
            state.post.likes += 1
        },
        disLikePost: (state, action: PayloadAction<any>) => {
            state.post.likes -= 1
        },
        viewPost: (state, action: PayloadAction<any>) => {
            state.post.views += 1
        },
        getPageData: (state, action: PayloadAction<any>) => {
            state.pageData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMetas.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(fetchPost.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(fetchPostComments.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    post: {
                        ...state.post,
                        comments: action.payload || []
                    }
                }
            })
            .addCase(fetchLikePost.fulfilled, (state, action: PayloadAction<any>) => {
                state.post.likes += 1
            })
            .addCase(fetchDisLikePost.fulfilled, (state, action: PayloadAction<any>) => {
                state.post.likes -= 1
            })
            .addCase(fetchUserEditingPost.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    editingPost: action.payload
                }
            })
            .addCase(fetchPageData.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    pageData:action.payload
                }
            })


    }
})

export const {
    setPostsData,
    getPosts,
    initialPosts,
    setPost,
    getEditingPost,
    editPostField,
    // getComments,
    newComment,
    deleteComment,
    // setPost,
    // setMetas,
    likePost,
    disLikePost,
    viewPost,
    getPageData
} = postsSlice.actions

export const postsReducer = (state: RootState) => state?.posts || null

export default postsSlice.reducer