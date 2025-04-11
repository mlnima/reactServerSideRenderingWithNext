import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";

const initialState = {
    activeVideoTrailerId:null,
    relatedPosts: [],
    totalCount: 0,
    statusesCount: {},
    posts: [],
    meta: {},
    metas: [],
    activeEditingLanguage: 'default',
}






















export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setActiveVideoTrailerId: (state, action: PayloadAction<any>) => {
            state.activeVideoTrailerId = action.payload
        },

    },
    extraReducers: (builder) => {
        //@ts-ignore
        // builder

            // .addCase(getTagsAction.fulfilled, (state, action: PayloadAction<any>) => {
            //     return {
            //         ...state,
            //         ...action.payload
            //     }
            // })
            // .addCase(getPostAction.fulfilled, (state, action: PayloadAction<any>) => {
            //
            //     return {
            //         ...state,
            //         ...action.payload
            //     }
            // })
            // .addCase(getPostsAction.fulfilled, (state, action: PayloadAction<any>) => {
            //     return {
            //         ...state,
            //         ...action.payload
            //     }
            // })
            // .addCase(getPostCommentsAction.fulfilled, (state, action: PayloadAction<any>) => {
            //     return {
            //         ...state,
            //         post: {
            //             ...state.post,
            //             comments: action.payload || []
            //         }
            //     }
            // })
            // .addCase(likePostAction.fulfilled, (state, action: PayloadAction<any>) => {
            //
            //     return {
            //         ...state,
            //         post: {
            //             ...state.post,
            //             likes: (state.post.likes || 0) + 1
            //         }
            //     }
            // })
            // .addCase(disLikePostAction.fulfilled, (state, action: PayloadAction<any>) => {
            //     return {
            //         ...state,
            //         post: {
            //             ...state.post,
            //             disLikes: (state.post.disLikes || 0) + 1
            //         }
            //     }
            // })
            // .addCase(getEditingPostAction.fulfilled, (state, action: PayloadAction<any>) => {
            //
            //     return {
            //         ...state,
            //         editingPost: action.payload
            //     }
            // })
            // .addCase(getPageDataAction.fulfilled, (state, action: PayloadAction<any>) => {
            //     return {
            //         ...state,
            //         pageData: action.payload
            //     }
            // })
            // .addCase(postNewCommentAction.fulfilled, (state, action: PayloadAction<any>) => {
            //
            //     return {
            //         ...state,
            //         post: {
            //             ...state.post,
            //             comments: [...(state.post?.comments || []), action.payload]
            //         }
            //     }
            // })
            // .addCase(_ugcUploadPostImages.fulfilled, (state, action: PayloadAction<any>) => {
            //
            //     return {
            //         ...state,
            //         editingPost: {
            //             ...state.editingPost,
            //             //images:[...(state.editingPost?.images || []),...action.payload]
            //             images: action.payload
            //         }
            //     }
            // })
            // .addCase(_ugcDeletePostImage.fulfilled, (state, action: PayloadAction<any>) => {
            //
            //     return {
            //         ...state,
            //         editingPost: {
            //             ...state.editingPost,
            //             images: action.payload
            //         }
            //     }
            // })

    }
})

export const {

    setActiveVideoTrailerId,

} = postsSlice.actions

export const postsReducer = (state: RootState) => state?.posts || null

export default postsSlice.reducer