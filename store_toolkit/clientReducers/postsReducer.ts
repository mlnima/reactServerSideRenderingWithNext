import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store_toolkit/store";
import fetchPost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPost";
import fetchMetas
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchMetas";
import fetchPosts
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPosts";
import fetchNewComment
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchNewComment";
import fetchPostComments
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPostComments";
import fetchDeleteCommentByAdminInPostPage
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksDeleteCommentByAdminInPostPage";
import fetchPageData
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPageData";
import likePost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksLikePost";
import disLikePost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksDisLikePost";
import fetchViewPost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchViewPost";
import fetchUserEditingPost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserEditingPost";
import fetchUserCreateNewPost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserCreateNewPost";
import fetchUserEditingPostUpdate
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserEditingPostUpdate";

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
    editingPostImagesToUpload: {},
    comments: {
        _id: string
    }[],
    categoriesMetas: [],
    tagsMetas: [],
    actorsMetas: [],
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
    editingPostImagesToUpload: {},
    comments: [],
    categoriesMetas: [],
    tagsMetas: [],
    actorsMetas: [],
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setEditingPostImagesToUpload: (state, action: PayloadAction<any>) => {
            state.editingPostImagesToUpload = Object.assign(state.editingPostImagesToUpload,action.payload)

            // return {
            //     ...state,
            //     editingPostImagesToUpload: Object.assign(state.editingPostImagesToUpload,action.payload)
            //     // editingPostImagesToUpload: {
            //     //     ...state.editingPostImagesToUpload,
            //     //     ...action.payload
            //     // },
            // }
        },
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
            .addCase(likePost.fulfilled, (state, action: PayloadAction<any>) => {

                return{
                    ...state,
                    post:{
                        ...state.post,
                       likes: (state.post.likes || 0)  + 1
                    }
                }
            })
            .addCase(disLikePost.fulfilled, (state, action: PayloadAction<any>) => {
                return{
                    ...state,
                    post:{
                        ...state.post,
                        disLikes: (state.post.disLikes || 0)  + 1
                    }
                }
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
                    pageData: action.payload
                }
            })


    }
})

export const {
    setEditingPostImagesToUpload,
    setPostsData,
    getPosts,
    initialPosts,
    setPost,
    getEditingPost,
    editPostField,
    newComment,
    deleteComment,
    viewPost,
    getPageData
} = postsSlice.actions

export const postsReducer = (state: RootState) => state?.posts || null

export default postsSlice.reducer