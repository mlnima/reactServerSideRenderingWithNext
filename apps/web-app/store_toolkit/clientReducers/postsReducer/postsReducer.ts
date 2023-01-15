import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";
// import fetchPost
//     from "./_clientPostsAsyncThunksFetchPost";
import getPostAction from "./getPostAction";
import getMetasAction from "./getMetasAction";
import likePostAction from "./likePostAction";
import disLikePostAction from "./disLikePostAction";
import postNewCommentAction from "./postNewCommentAction";
import {_ugcDeletePostImage, _ugcUploadPostImages} from "./_ugcUploadPostImages";
//not in package
import getTags from "./getTags";
import clientLikeDislikeView from "api-server/dist/controllers/clientControllers/clientPostsControllers/clientLikeDislikeView";
import attendingToEvent from "@store_toolkit/clientReducers/postsReducer/attendToEvent";
import getPageDataAction from "@store_toolkit/clientReducers/postsReducer/getPageDataAction";
import getPostCommentsAction from "@store_toolkit/clientReducers/postsReducer/getPostCommentsAction";
import getPostsAction from "@store_toolkit/clientReducers/postsReducer/getPostsAction";
import getEditingPostAction from "@store_toolkit/clientReducers/postsReducer/getEditingPostAction";

//**not in package
// import fetchUserCreateNewPost
//     from "../_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserCreateNewPost";
// import fetchUserEditingPostUpdate
//     from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserEditingPostUpdate";
// import fetchViewPost
//     from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchViewPost";
// import fetchDeleteCommentByAdminInPostPage
//     from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksDeleteCommentByAdminInPostPage";

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
    editingPostImagesToUpload: any,
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
            state.editingPostImagesToUpload = action.payload
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
            .addCase(getMetasAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(getTags.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(getPostAction.fulfilled, (state, action: PayloadAction<any>) => {

                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(getPostsAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(getPostCommentsAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    post: {
                        ...state.post,
                        comments: action.payload || []
                    }
                }
            })
            .addCase(likePostAction.fulfilled, (state, action: PayloadAction<any>) => {

                return {
                    ...state,
                    post: {
                        ...state.post,
                        likes: (state.post.likes || 0) + 1
                    }
                }
            })
            .addCase(disLikePostAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    post: {
                        ...state.post,
                        disLikes: (state.post.disLikes || 0) + 1
                    }
                }
            })
            .addCase(getEditingPostAction.fulfilled, (state, action: PayloadAction<any>) => {

                return {
                    ...state,
                    editingPost: action.payload
                }
            })
            .addCase(getPageDataAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    pageData: action.payload
                }
            })
            .addCase(postNewCommentAction.fulfilled, (state, action: PayloadAction<any>) => {

                return {
                    ...state,
                    post: {
                        ...state.post,
                        comments: [...(state.post?.comments || []), action.payload]
                    }
                }
            })
            .addCase(_ugcUploadPostImages.fulfilled, (state, action: PayloadAction<any>) => {

                return {
                    ...state,
                    editingPost: {
                        ...state.editingPost,
                        //images:[...(state.editingPost?.images || []),...action.payload]
                        images: action.payload
                    }
                }
            })
            .addCase(_ugcDeletePostImage.fulfilled, (state, action: PayloadAction<any>) => {

                return {
                    ...state,
                    editingPost: {
                        ...state.editingPost,
                        images: action.payload
                    }
                }
            })
            .addCase(attendingToEvent.fulfilled, (state, action: PayloadAction<any>) => {

                return {
                    ...state,
                    post:{
                        ...state.post,
                        ...action.payload
                    }
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